import User from "../models/User.js"


export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req?.params?.id)
        const { password, isAdmin, ...userDetails } = user._doc
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateUser = async (req, res) => {
    if (req.body?.password) {
        delete req.body?.password
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req?.params?.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params?.id)
        if (deletedUser) {
            res.status(200).json('User has been deleted.')
        } else {
            return res.status(404).json({
                error: 'User not found!'
            })
        }
        res.status(200).json({ deletedUser })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}