import { setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserAuth } from "../context/AuthContext";
import videosContext from '../context/videos/videosContext';
import { LoginForm } from "./LoginStuffs/LoginForm";
import { SignUpForm } from "./LoginStuffs/SignUpForm";
import { SignUpFormOTP } from "./LoginStuffs/SignUpFormOTP";
import { PasswordReset } from "./LoginStuffs/PasswordReset";
export const LoginModal = () => {
    const router = useRouter();
    const { user, LoginModalVisible, setLoginModalVisible, SignUpFormVisible,
        setSignUpFormVisible,
        LoginFormVisible,
        setLoginFormVisible, OTPFormVisible, PasswordResetVisible } = UserAuth();
    const { OTPemail, setOTPemail, loggedIn, setloggedIn } = useContext(videosContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [Country, setCountry] = useState('');

    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('https://api.db-ip.com/v2/free/self');
                const data = await response.json();
                setCountry(data.countryName);
                setCookie('country', data.countryName, { maxAge: 900000 });
            } catch (error) {
                const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0');
                const data = await response.json();
                setCountry(data.country_name);
                setCookie('country', data.country_name, { maxAge: 900000 });
            }
        };

        getLocation();
    }, []);



    return (
        <div className={`fixed inset-0 z-30 ${LoginModalVisible ? "" : "hidden"}`}>
            {/* Background overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${LoginModalVisible ? "opacity-50" : "opacity-0"}`}
                onClick={() => setLoginModalVisible(false)}
            >



            </div>
            {/* Modal content */}
            i


            {SignUpFormVisible &&
                <div className={`rounded-lg absolute flex justify-center items-center inset-0 overflow-hidden w-[405px] sm:w-full mx-auto`}>
                    <SignUpForm />
                </div>
            }

            {LoginFormVisible &&
                <div className={`rounded-lg absolute flex justify-center items-center inset-0 overflow-hidden w-[405px] sm:w-full mx-auto`}>
                    <LoginForm />
                </div>
            }

            {OTPFormVisible &&
                <div className={`rounded-lg absolute flex justify-center items-center inset-0 overflow-hidden w-[405px] sm:w-full mx-auto`}>
                    <SignUpFormOTP />
                </div>
            }

            {PasswordResetVisible &&
                <div className={`rounded-lg absolute flex justify-center items-center inset-0 overflow-hidden w-[405px] sm:w-full mx-auto`}>
                    <PasswordReset />
                </div>
            }




        </div>
    );
};
