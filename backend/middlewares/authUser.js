import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return res.json({ success: false, message: "Not authorized Login Again" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!req.body) req.body = {} 
        req.body.userId = token_decode.userId // we use userId as defined in the token payload
        next()
    } catch(err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}
export default authUser;