import jwt from 'jsonwebtoken'
import User from '../modules/user.modules.js'

const protectRoute = async (req, res,next) =>{
    try {
        const token = req.cookies.jwt //get the token from the cookie
        
        if(!token){
            return res.status(401).json({ error: 'No token, authorization denied' })
        }
        //verify if the token is valid, usin our secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decodedToken){
            return res.status(401).json({ error: 'Invalid token' })
        }
        // if all this if passes, thenwe will look for the user in the database and remove password
        const user = await User.findById(decodedToken.userId).select(-'password')
        //we are using decodedToken.userId as userId is what we expect as define in the configuration for the generated token file

        //check if the user still exists in the database
        if(!user){
            return res.status(401).json({ error: 'User not found' })
        }

        //this is saying that the user that we currently authenticated(i.e the one in our request) is assigned to the one in our database 
        //then run the next function
        req.user = user
        next()
    } catch (error) {
        console.log('error:',error)
        res.status(500).json({ error: 'Something went wrong at protected route' })
    }
}

export default protectRoute;