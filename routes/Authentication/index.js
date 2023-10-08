const express = require("express");
const Router = express.Router();
const { sendOtp } = require("../../controllers/Authentication/userRegistrationLogin")
const { veirfyUser } = require("../../controllers/Authentication/userVerification");

Router.post("/authentication/registerLogin",sendOtp)
Router.post("/authentication/verifyUser", veirfyUser)

module.exports = {Router}