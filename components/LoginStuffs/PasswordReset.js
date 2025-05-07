import { UserAuth } from "@/context/AuthContext"
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io"
import ClipLoader from "react-spinners/ClipLoader"

export const PasswordReset = () => {
    const router = useRouter();


    const { setPasswordResetVisible, setLoginFormVisible, setLoginModalVisible } = UserAuth();

    const [Email, setEmail] = useState('')
    const [OTP, setOTP] = useState('')
    const [receivedOTP, setreceivedOTP] = useState('')

    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState('');
    const [OTP_Sent, setOTP_Sent] = useState(0);
    const [password, setpassword] = useState('');
    const [retypePassword, setretypePassword] = useState();
    const [passwordUpdated, setpasswordUpdated] = useState(false);




    const resetForm = () => {
        setEmail('');
        setOTP('');
        setloading(false);
        setmessage('');
        setOTP_Sent(0);
        setpassword('');
        setretypePassword('');
        setpasswordUpdated(false);
    };



    const resendOTP = async (e) => {
        e.preventDefault();
        setloading(true);
        setmessage("");

        try {
            const parcelData = { email: Email.trim() };
            const rawResponse = await fetch(`/api/auth/resendOTP`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();

            if (res.message === 'Email not registered') {
                setmessage('Email not registered!');
            } else if (res.message === 'OTP Sent Again!' && OTP_Sent === 0) {
                setOTP_Sent(1);
                setmessage('OTP Sent');
                setreceivedOTP(res.data.otp)

            } else if (res.message === 'OTP Sent Again!' && OTP_Sent === 1) {
                setmessage('OTP Sent Again!');
                setreceivedOTP(res.data.otp)
            } else {
                setmessage('An unexpected error occurred');
            }

        } catch (error) {
            setmessage(`Error: ${error.message}`);
            console.log(error);
            alert(error.message);
        } finally {
            setloading(false);
        }
    }



    const updatePassword = async (e) => {
        e.preventDefault();
        setmessage('')
        setloading(true)

        if (OTP.length !== 4) {
            setmessage('Enter 4 digit OTP')
            setloading(false)
            return
        }
        if (OTP != receivedOTP) {
            setmessage('OTP not matched!')
            setloading(false)
            return
        }

        if (password.length < 6) {
            setmessage('password too small!')
            setloading(false)
            return
        }

        if (password !== retypePassword) {
            setmessage('password not matched!')
            setloading(false)
            return
        }


        const parcelData = { email: Email.trim(), password: password }
        const rawResponse = await fetch(`/api/auth/forgotPassword`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(parcelData),
        });

        const res = await rawResponse.json();
        setloading(false)

        if (res.message === 'Password Updated') {
            setmessage('Password Updated!')
            setOTP_Sent(0)
            setpasswordUpdated(true)

            setTimeout(() => {
                setPasswordResetVisible(false)
                setLoginFormVisible(true)
                resetForm()
            }, 2000);
        }
    }



    return (



        <div className="relative bg-white  rounded-lg  px-6 lg:px-0 py-8">


            <IoIosCloseCircleOutline onClick={() => { setLoginFormVisible(true); setPasswordResetVisible(false); setLoginModalVisible(false); resetForm() }} className="cursor-pointer absolute text-semiblack text-[32px] lg:text-[34px] right-4 top-4" />



            <div className='px-[28px]  w-full'>


                <h2 className='mb-[30px] font-inter text-[18px] text-semiblack'>
                    Reset Password
                </h2>



                <div className='flex flex-col items-center justify-start  rounded-lg shadow-lg p-4'>

                    <h2 className='text-semiblack font-inter text-[14px] xl:text-[16px] w-full h-[26px] mb-2'>
                        Please enter your registered Email
                    </h2>



                    <form onSubmit={resendOTP} className="flex flex-col items-center">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={Email}
                            disabled={OTP_Sent !== 0}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Email'
                            className="w-[250px] text-xs font-inter rounded-lg bg-transparent py-1.5 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm leading-6"
                        />
                        {OTP_Sent !== 0 && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className='mt-4 font-normal text-[14px] text-center mx-auto text-semiblack rounded-md bg-gray-200 px-3 py-1.5 text-xs'
                            >
                                Change Email
                            </button>
                        )}
                        {OTP_Sent === 0 && (
                            <button
                                type='submit'
                                className='mt-4 font-normal text-[14px] text-center w-[154px] h-[33px] mx-auto text-semiblack rounded-md bg-gray-200 px-3 py-1.5 shadow-sm'
                            >
                                Confirm
                            </button>
                        )}
                    </form>




                    <div className=' min-h-[30px] xl:min-h-[40px]'>

                        {OTP_Sent === 0 &&
                            <div className=' mt-[3px]'>
                                <p className={`${message == "Password Updated!" ? "text-theme_red" : "text-red-500"} rounded text-center w-full  text-[14px] xl:text-[16px] text-red-500 px-2 py-1 ${message.length > 0 ? "block" : "hidden"}`}>{message}</p>
                            </div>
                        }
                    </div>


                </div>



                <div className='px-5'>


                    {OTP_Sent > 0 &&

                        <div className='flex flex-col items-center my-2'>

                            <h2 className=' text-left text-semiblack font-inter text-[12px] xl:text-[14px] w-full h-[26px] mt-[21px]'>
                                {`Please enter the 4-digit code we sent to
                        ${Email}.`}
                            </h2>

                            <div className="divOuter my-[20px] mt-[30px]">
                                <div className="divInner">
                                    <input value={OTP.substring(0, 4)} onChange={e => { if (e.target.value.length < 5) { setOTP(e.target.value) } }} className="partitioned bg-transparent text-semiblack" type="number" maxLength="4" />
                                </div>
                            </div>

                            <div className='mb-6 min-h-[30px] xl:min-h-[40px]'>
                                <p className={` rounded text-center w-full  text-[16px] xl:text-[18px] text-theme_red px-1 py-1 ${message.length > 0 ? "visible" : "invisible"}`}>{message}</p>
                            </div>

                            <div className='flex flex-col items-center justify-start w-full space-y-3'>

                                <label className=" text-[14px] xl:text-[16px] w-full  text-semiblack pb-[1px] block  text-left  mt-2">Set New Password</label>

                                <input onChange={e => { setpassword(e.target.value) }} required type="password" id='email' name='email' className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm" placeholder='New Password' />
                                <input onChange={e => { setretypePassword(e.target.value) }} required type="password" id='email' name='email' className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-semiblack border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm" placeholder='Retype New Password' />
                            </div>
                        </div>
                    }
                </div>





                {/* Bottom */}


                <div className='mt-8 h-[75px]'>
                    {!loading &&
                        <div className='flex flex-col space-y-3' >

                            {OTP_Sent === 1 &&
                                <button onClick={resendOTP} className='font-normal text-[14px] text-center w-[154px] h-[33px]  mx-auto  text-semiblack rounded-md bg-gray-200 px-3 py-1.5 shadow-sm'>Re-send OTP</button>
                            }

                            {passwordUpdated &&
                                <button onClick={() => {
                                    setPasswordResetVisible(false)
                                    setLoginFormVisible(true)
                                    resetForm()
                                }} className='font-normal text-[14px] text-center w-[154px] h-[33px]  mx-auto  text-semiblack rounded-md bg-gray-200 px-3 py-1.5 shadow-sm'>Go to login</button>
                            }

                            {OTP_Sent === 1 &&
                                <button onClick={updatePassword} className='font-normal text-[14px] text-center w-[154px] h-[33px]  mx-auto  text-semiblack rounded-md bg-gray-200 px-3 py-1.5 shadow-sm'>Update Password</button>
                            }

                        </div>
                    }

                    {loading &&
                        <div className='block mx-auto w-fit'>
                            <ClipLoader color={"#ffffff"} size={30} />

                        </div>
                    }

                </div>







            </div>


        </div >
    )
}
