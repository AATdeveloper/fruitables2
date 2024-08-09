const twilio = require("twilio");

const sendOTP = (req, res, next) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNTSID_URL;
        const authToken = process.env.TWILIO_AUTHTOKEN_URL;
        const client = twilio(accountSid, authToken);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        req.session.otp = otp;

        client.messages
            .create({
                // body: otp,
                // to: '',
                // from: '',
            })
            .then(message => next())
            .catch(error => {
                console.log("send otp error", error);
                res.status(500).json({ success: false, message: "Failed to send OTP" });
            });
    } catch (error) {
        console.log("send otp error", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const verifyOTP = (req, res, next) => {
    try {
        console.log("verifyOTP", req.session.otp);

        if (req.session.otp == req.body.otp) {
            return next();
        }

        return res.status(400).json({
            success: false,
            message: "OTP invalid..!"
        });
    } catch (error) {
        console.log("verify otp error", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};
