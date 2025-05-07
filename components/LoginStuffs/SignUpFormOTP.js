import { getCookie, setCookie } from "cookies-next"
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import videosContext from '../../context/videos/videosContext'
import { IoIosCloseCircleOutline } from "react-icons/io"
import Link from "next/link"
import { UserAuth } from "../../context/AuthContext"


export const SignUpFormOTP = () => {
    const router = useRouter();
    const { email } = router.query

    const { setLoginModalVisible, setLoginFormVisible, setOTPFormVisible, EmailOTP, setSignUpFormVisible,
        receivedOTP, setreceivedOTP } = UserAuth();


    const [OTP, setOTP] = useState('')
    const [loading, setloading] = useState(false);
    const [resentOTP, setresentOTP] = useState(0);
    const [message, setmessage] = useState('');




    const resetStates = () => {
        setOTP('');
        setloading(false);
        setresentOTP(0);
        setmessage('');
    };

    const verifyOTP = async (e) => {

        if (OTP.length !== 4) {
            alert('Enter OTP')
            return
        }
        e.preventDefault()
        setloading(true)



        if (OTP == receivedOTP) {

            // this is just for getting first name from the use data
            const parcelData1 = { email: EmailOTP.trim() }
            const rawResponse1 = await fetch(`/api/auth/getUserByEmail`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData1),
            });

            const res1 = await rawResponse1.json();            

            setCookie('email', EmailOTP.trim(), { maxAge: 900000 });
            setCookie('Firstname', res1.data.firstName.trim().split(' ')[0], { maxAge: 900000 });
            setCookie('membership', false, { maxAge: 900000 });
            setCookie('countryUpdated_DB', false, { maxAge: 900000 });
            setCookie('account', 'credential', { maxAge: 900000 });


            //Update loggedIn in DB
            const parcelData = { email: EmailOTP.trim() }

            await fetch(`/api/auth/updateLoggedIn`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });
            await fetch(`/api/auth/updateVerify`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            window.location.reload()

        } else {
            setmessage('OTP Incorrect')
            setloading(false)

        }

    }

    const resendOTP = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const parcelData = { email: EmailOTP.trim() }
            const rawResponse = await fetch(`/api/auth/resendOTP`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();
            setloading(false)

            if (res.message === 'OTP Sent Again!') {
                setresentOTP(1)
                setreceivedOTP(res.data.otp)
                setmessage('OTP Sent Again!')
            }

        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);

        }
    }

    return (



        <div className="relative bg-white  rounded-lg  px-6 lg:px-0 py-10  ">


            <IoIosCloseCircleOutline onClick={() => { setLoginFormVisible(true); setOTPFormVisible(false); setLoginModalVisible(false); resetStates() }} className="cursor-pointer absolute text-semiblack text-[32px] lg:text-[34px] right-4 top-4" />


            <div className='px-[28px]  w-full'>


                <h2 className='mt-[20px] font-inter text-[18px] text-semiblack'>
                    Enter Verification Code
                </h2>



                <div className='flex flex-col items-center   rounded-lg  shadow-lg mt-8 px-4 pb-4'>
                    <h2 className=' text-center text-semiblack font-inter text-[14px] xl:text-[16px] w-full h-[26px] mt-[21px] text-semiblack font-medium'>
                        {`Please enter the 4-digit code we sent to    ${EmailOTP}.`}
                    </h2>


                    <div className="divOuter mt-[30px]">
                        <div className="divInner">
                            <input value={OTP.substring(0, 4)} onChange={e => { if (e.target.value.length < 5) { setOTP(e.target.value) } }} className="partitioned bg-transparent text-semiblack font-inter font-bold" type="number" maxLength="4" />
                        </div>
                    </div>

                    <div className='mb-6 min-h-[30px] xl:min-h-[40px] mt-3'>
                        <p className={` rounded text-center w-full  text-[14px] xl:text-[16px] ${message == "OTP Sent Again!" ? "text-theme_red" : "text-red-500"}  font-semibold px-1 pb-1 mt-1 ${message.length > 0 ? "visible" : "invisible"}`}>{message}</p>
                    </div>



                    <h2 className='text-center w-full font-inter text-[13px] lg:text-[15px] mt-[14px] text-semiblack'>
                        By continuing, you agree to Chutlunds&apos;s{' '}
                        <Link legacyBehavior href="/terms">
                            <a className="text-theme_red hover:underline"> Terms of Use</a>
                        </Link>{' '}
                        and{' '}
                        <Link legacyBehavior href="/privacy">
                            <a className="text-theme_red hover:underline">Privacy Policy</a>
                        </Link>.
                    </h2>


                </div>





                {/* Bottom */}


                <div className='pt-4 mt-[38px] relative h-[100px]'>

                    {!loading &&
                        <div className=' flex flex-col space-y-2'>

                            {resentOTP === 0 &&
                                <button onClick={resendOTP} className='font-normal text-[14px] text-center w-[154px] py-2  mx-auto  text-semiblack border-[1px] border-gray-200 rounded-lg hover:text-semiblack hover:bg-gray-200 block'>Re-send OTP</button>
                            }


                            <button onClick={verifyOTP} className='font-normal text-[14px] text-center w-[154px] py-2 mt-2  mx-auto  text-semiblack border-[1px] border-gray-200 rounded-lg hover:text-semiblack hover:bg-gray-200 block'>Continue</button>
                        </div>

                    }


                    {loading &&
                        <div className='absolute  inset-0 block mx-auto w-fit '>
                            <ClipLoader color="#ffffff" size={30} />

                        </div>

                    }
                </div>



            </div>
        </div>
    )
}
