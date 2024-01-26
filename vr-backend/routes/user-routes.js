//error
const express = require('express');

const {
    getUsers,
    getUser,
    deleteUser,
    addUser,
    changeInformation,
} = require("../controllers/movie-controller")

const router = express.Router();

router.get('/vr_proj', getUsers)

router.get('/vr_proj/:login/:password', getUser)

router.delete('/vr_proj/:login', deleteUser)

router.post('/vr_proj', addUser)

router.patch('/vr_proj/:login', changeInformation)

module.exports = router;