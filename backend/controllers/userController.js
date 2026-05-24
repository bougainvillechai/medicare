import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

//API to regsiter a user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Please provide name, email and password' });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please provide a valid email' });
        }
        if (!validator.isLength(password, { min: 8 })) {
            return res.json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        //hashing user pw
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //save user to db
        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new User(userData);
        const user = await newUser.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ success: true, message: 'User registered successfully', token });




    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, message: 'User logged in successfully', token });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//API to get user profile data
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await User.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, userData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file;

        if (!name || !phone || !address || !dob) {
            return res.json({ success: false, message: 'Please provide name, phone, address and dob' });
        }
        await User.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob, gender
        })

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url;

            await User.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}


// API to book appointment
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData) {
    return res.json({ success: false, message: "Doctor not found" });
}

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availability
        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })

            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {

            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')
        
        // Convert to plain object and remove slots_booked so it's not saved in Appointment history
        const docInfo = docData.toObject()
        delete docInfo.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docInfo,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment booked successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { registerUser, loginUser, getUserProfile, updateUserProfile, bookAppointment };