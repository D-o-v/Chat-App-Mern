import Friends from "../modules/friend.modules.js";
import User from "../modules/user.modules.js";


export const getUserFriend = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // const filteredUser = await Friends.find({ user: loggedInUserId }).populate('friends').select('-password');

          // Populate friends and exclude the password field
          const filteredUser = await Friends.find({ user: loggedInUserId })
          .populate({
              path: 'friends',
              select: '-password' // Exclude the password field
          });

        res.status(200).json(filteredUser[0]?.friends);
    } catch (error) {
        console.log('Error in getting friend', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const setUserFriend = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { friends: friendIds } = req.body; // Destructuring friends as friendIds

        if (!Array.isArray(friendIds) || friendIds.length === 0) {
            return res.status(400).json({ message: "Invalid input: friends must be a non-empty array" });
        }

        // Validate that all provided friends exist
        const friendsToAdd = await User.find({ _id: { $in: friendIds } });

        if (friendsToAdd.length !== friendIds.length) {
            return res.status(404).json({ message: "One or more users not found" });
        }

        // Ensure the logged-in user has a Friends document/schema
        let loggedInUserFriends = await Friends.findOne({ user: loggedInUserId });
        if (!loggedInUserFriends) {
            loggedInUserFriends = new Friends({ user: loggedInUserId, friends: [] });
        }

        // Process each friend ID
        const updatedFriendsPromises = friendsToAdd.map(async (friendUser) => {
            // Ensure the friend user has a Friends document
            let friendUserFriends = await Friends.findOne({ user: friendUser._id });
            if (!friendUserFriends) {
                friendUserFriends = new Friends({ user: friendUser._id, friends: [] });
            }

            // Add each user to the other's friend list if not already friends
            if (!loggedInUserFriends.friends.includes(friendUser._id)) {
                loggedInUserFriends.friends.push(friendUser._id);
            }

            if (!friendUserFriends.friends.includes(loggedInUserId)) {
                friendUserFriends.friends.push(loggedInUserId);
            }

            // Save the friend's updated Friends document
            await friendUserFriends.save();
        });

        // Save the logged-in user's updated Friends document
        await Promise.all(updatedFriendsPromises);
        await loggedInUserFriends.save();

        res.status(200).json({ message: "Friends added successfully" });
    } catch (error) {
        console.log('Error in setting friends', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};






