// const twilio = require("twilio");

// const sendOTP = (req, res, next) => {
//     try {
//         const accountSid = 'AC4f86535f7fe15563d3b6f0339bd0eff8';
//         const authToken = '06e1a1a74f3e014450665b8fe43be2e4';
//         const client = twilio(accountSid, authToken);

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();

//         req.session.otp = otp;

//         client.messages
//             .create({
//                 body: otp,
//                 to: '+919909412186',
//                 from: '+12245325302',
//             })
//             .then(message => next())
//             .catch(error => {
//                 console.log("send otp error", error);
//                 res.status(500).json({ success: false, message: "Failed to send OTP" });
//             });
//     } catch (error) {
//         console.log("send otp error", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// const verifyOTP = (req, res, next) => {
//     try {
//         console.log("verifyOTP", req.session.otp);

//         if (req.session.otp == req.body.otp) {
//             return next();
//         }

//         return res.status(400).json({
//             success: false,
//             message: "OTP invalid..!"
//         });
//     } catch (error) {
//         console.log("verify otp error", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// module.exports = {
//     sendOTP,
//     verifyOTP
// };
