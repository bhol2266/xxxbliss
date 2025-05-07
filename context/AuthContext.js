import { createContext, useContext, useState } from "react";
const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [LoginModalVisible, setLoginModalVisible] = useState(false);

    const [SignUpFormVisible, setSignUpFormVisible] = useState(true);
    const [LoginFormVisible, setLoginFormVisible] = useState(false);
    const [PasswordResetVisible, setPasswordResetVisible] = useState(false);
    const [OTPFormVisible, setOTPFormVisible] = useState(false);
    const [EmailOTP, setEmailOTP] = useState('');
    const [receivedOTP, setreceivedOTP] = useState('');




    return (
        <AuthContext.Provider value={{
            user, setUser,
            LoginModalVisible, setLoginModalVisible,
            SignUpFormVisible, setSignUpFormVisible,
            LoginFormVisible, setLoginFormVisible,
            PasswordResetVisible, setPasswordResetVisible,
            OTPFormVisible, setOTPFormVisible,
            EmailOTP, setEmailOTP,
            receivedOTP, setreceivedOTP
        }} >
            {children}
        </AuthContext.Provider >
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
