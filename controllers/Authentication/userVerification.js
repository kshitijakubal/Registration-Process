const { otp, temp, registered_user, events_registration } = require("../../db/models/index");
const { encryptDecryptData } = require("../../utility/common");
const { validateOtpVerification } = require("../../utility/validation/authentication.validation") 
const jwt = require("jsonwebtoken");

const fetchUserId = async (emailId) => {
    return await registered_user.findOne({
        attributes: ['id'],
        where: {
            email: emailId 
        }
    })
}
const veirfyUser = async (req, res) => {
    try {
        // Validating req body
        const { error } = validateOtpVerification.validate(req.body);
        if (error) throw new Error()
        const { email, user_otp, isNew } = req.body;
        let userId, token;
        const checkOtp = await otp.findOne({
            limit: 1,
            attributes: ['otp'],
            where:{
                email: email,
            },
            order: [['created_at','DESC']]
        });
        console.log("Otp ", checkOtp.otp);
        const isOtpVerified = await encryptDecryptData(user_otp, "compare", checkOtp.otp)
        console.log(isOtpVerified)
        if (isOtpVerified) {
            // Condition if new user
            if (isNew){
                const userData = await temp.findOne({
                    limit: 1,
                    attributes: ["name","grade","email","phone_no","state","city","school_name"],
                    where: {
                        email: email
                    },
                    order: [['created_at','DESC']]
                })
                console.log(userData.dataValues)
                userId = await registered_user.create(userData.dataValues)
                userId = userId.id
                console.log("newUserId:",userId)
            }
            else{
                console.log("Inside Login")
                // Fetching userId, to register event
                userId = await fetchUserId(email)
                userId = userId.id;
                console.log("userId:",userId)
            }
            // Event creation
            events_registration.create({user_id: userId})
            token = jwt.sign({userId: userId, emailId: email}, process.env.TOKEN_KEY)
        }
        else{
            throw new Error()
        }
            res.status(200).json({
                status: "200",
                message: (isNew === true) ? "User Registered successfully" : "User Logged in successfully",
                Token: token
            })
        
    }
    catch(error){
        res.status(400).json({
            status: "400",
            message: "Error in OTP Verification"
        })
    }
}

module.exports = { veirfyUser }