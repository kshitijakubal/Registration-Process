const { registered_user,  otp, temp } = require("../../db/models/index")   
const { validateRegisteration } = require("../../utility/validation/authentication.validation") 
const { encryptDecryptData } = require("../../utility/common");
const { validate } = require("uuid");

const generateOtp = (otpLength) => {
    let result = "";
    for (let i = 0; i < otpLength; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

const sendOtp = async (req, res) => {
    try {
        console.log("Sending OTP")
        // Validating request body
        const { error } = validateRegisteration.validate(req.body);
        if (error) throw new Error()
        const { email } = req.body;
        let isNew = false;
        // Check if email exists    
        const existingEmail = await registered_user.findAll({
            raw: true,
            attributes: ['email'],
            where: { email: email }, 
            logging: true,
        });
        // console.log("existing: ",existingEmail);
        const checkUserExists = existingEmail.some((existEmail) => {
            // console.log(existEmail)
            return existEmail.email === email;
        })
        console.log(checkUserExists)
        if(checkUserExists !== true){
            // const tempUserData = await temp.findOne({
            //     where: {
            //         email: email
            //     }
            // })
            // console.log("temodata:",tempUserData)
            // if (tempUserData === null)
            temp.create(req.body);
            isNew = true;
        }

        // Generate OTP
        const OTP = generateOtp(6)
        // Encrypting otp 
        const encryptedOtp = await encryptDecryptData(OTP, "hash");
        // Storing Otp
        otp.create({
            email: email,
            otp: encryptedOtp,
            createdAt: new Date()
        })
        // Sending OTP using nodemailer
        // Otp is sent in response just for demo purpose.
        // isNew key checks if it is a new user/existing user
        // it is set to true/false accordingly and sent in response so
        // when verifyUser can get isNew Value and update data accordingly.
        res.status(200).json({
            status: "200",
            message:"OTP sent successfully",
            data: {
                otp: OTP,
                isNew: isNew
            }
        })
    }
    catch(error){
        res.status(400).json({
            status: "400",
            message:"Error in sending otp"
        })
    }
}
module.exports = {sendOtp}