import jwt from "jsonwebtoken"
const secret = "RAHASIA"

export default function (token) {
    try{
        var decoded = jwt.verify(token, secret)
        return decoded
    } catch(err) {
        console.log(err)
        if(err.name === "TokenExpiredError") {
            localStorage.removeItem("token")
        }
        return null
    }
}