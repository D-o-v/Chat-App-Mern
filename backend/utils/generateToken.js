import jwt from 'jsonwebtoken'

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY,{
        expiresIn: '15d'
    })

    //the 'jwt ' can be anything, in the below expression, is just a name to save the token
    res.cookie('jwt', token, {
        maxAge: 1000 * 60 * 60 * 24 * 15,
        httpOnly: true, //to prevent XSS attacks, i.e Cant be acceess be javascript, cross-site scripting attacks
        sameSite:'strict', 
        secure: process.env.NODE_ENV!== 'development', 
    })
}
export default generateTokenAndSetCookies;