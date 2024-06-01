import User from "../modules/user.modules.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }) //this willretturn all user except the logged in user
        // const filteredUser = await User.find() //this will get all users

        //i do not want the password
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log('Error in getUserForSideBar', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}
