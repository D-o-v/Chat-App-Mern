import User from "../modules/user.modules.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookies from "../utils/generateToken.js"


export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            return res.staus(400).json({ error: 'Invalid password' })
        }
        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: 'username already exists' })
        }
        // Hash password to be save in the db
        // first we need to create the salt for hashing
        const salt = await bcrypt.genSalt(10) //we add 10 to make it secure, if we add 50 it will be more secure but more slower
        const hashedPassword = await bcrypt.hash(password, salt)

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookies(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                password: newUser.password,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({ error: 'Invalid username or password' })
        }

    } catch (error) {
        console.log('error in signup controller: ' + error)
        res.status(500).json({ error: 'Something went wrong in the sigup controller' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const passwordIsCorrect = await bcrypt.compare(password, user?.password || '')
        if (!user || !passwordIsCorrect) {
            return res.status(400).json({ error: 'Ínvalid username or password' })
        }
        generateTokenAndSetCookies(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log('error in login controller: ' + error)
        res.status(500).json({ error: 'Something went wrong in the login controller' })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: 'logout successful' })
    } catch (error) {
        console.log('error in logout controller: ' + error)
        res.status(500).json({ error: 'Something went wrong in the logout controller' })
    }
}

