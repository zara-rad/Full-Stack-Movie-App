
export const isAdmin = (req, res, next) => {
    // clg to see error and id
    console.log(req.user._id.toString(), req.params.id)
    try {
        if (req.user.role === "admin") {
            next()
        }
        //if normal user wants to update or delete his own order check if this id exists or not
        else if (req.user.orders.includes(req.params.id) ||
            req.user._id.toString() === req.params.id
        ) {
            next()
        }
        else {
            throw new Error("you are not authorized!")
        }
    } catch (err) {
        next(err)
    }
}