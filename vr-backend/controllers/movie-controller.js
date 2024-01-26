const User = require('../Models/user')

const handleError = (res, error) => {
    res.status(500).json({ error });
}

const getUsers = (req, res) => {
    User
        .find()
        .then((users) => {
            res
                .status(200)
                .json(users);
        })
        .catch((err) => handleError(res, err))
}

const getUser = (req, res) => {
    console.log(req.params);
    User
        .findOne({ login: req.params.login })
        .then((movie) => {
            res
                .status(200)
                .json(movie);
        })
        .catch((err) => handleError(res, err))
}
const deleteUser = (req, res) => {
    User
        .deleteOne({ login: req.params.login })
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch((err) => handleError(res, err))
}

const addUser = (req, res) => {
    console.log("запрос отработал");
    User
        .findOne({ login: req.body.login })
        .then((movie) => {
            if (movie == null) {
                const user = new User(req.body);
                user
                    .save()
                    .then((result) => {
                        res
                            .status(201)
                            .json(result);
                    })
                    .catch((err) => handleError(res, err))
            }
            else {
                res
                    .status(200)
                    .json(null);
            }
        })
        .catch((err) => handleError(res, err))
}

const changeInformation = (req, res) => {
    User
        .updateOne({ login: req.params.login }, { $set: req.body })
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch((err) => handleError(res, err))
}
module.exports = {
    getUsers,
    getUser,
    deleteUser,
    addUser,
    changeInformation,
}