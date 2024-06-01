import Message from "../modules/message.modules.js";
import Conversation from "../modules/conversation.modules.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        //The commement block of code below is the same as the one used below itself
        // const newMessage = new Message({
        //     message: message,
        //     senderId:senderId,
        //     recieverId:recieverId
        // })

        const newMessage = new Message({
            message,
            senderId,
            recieverId
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //this will run the code one affter the other, but can be optimized to be more efficient by making it simultaneously as below.
        // await conversation.save()
        // await newMessage.save()

        //this will run the code parallel

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)

    } catch (error) {
        console.log('Error occured in sendMessages controller', error)
        return res.status(500).json({ message: "Internal server error occured" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: personToChat } = req.params
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, personToChat] }
        }).populate("messages"); //this wont send a ref to the message but the actual message

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log('Error occurred in getMessages controller', error);
        return res.status(500).json({ message: "Internal server error occurred" });
    }
};
