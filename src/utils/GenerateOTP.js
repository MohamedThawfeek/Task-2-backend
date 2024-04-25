exports.generateOTP = async () => {
    let OTP = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    return OTP.toString();
};
