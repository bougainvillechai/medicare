import doctorModel from "../models/doctorModel.js"


const changeAvailability = async (req, res) => {
    try {
        const {doctorId} = req.body
        const doctor = await doctorModel.findById(doctorId)
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }
        await doctorModel.findByIdAndUpdate(doctorId, { available: !doctor.available })
        res.json({ success: true, message: "Doctor availability updated successfully" })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { changeAvailability }