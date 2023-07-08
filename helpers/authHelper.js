import bcrypt from "bcrypt";


//converting normal password in hashpassword
export const hashPassword = async(password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};


//comparing password with database hasedpassword with using bcrypt compare method
export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
};