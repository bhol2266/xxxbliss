import Link from 'next/link';

import { useContext } from 'react';
import videosContext from '../context/videos/videosContext';
import { UserAuth } from "../context/AuthContext";


function Footer() {

    //Use Context
    const context = useContext(videosContext);
    const { spinnerLoading } = context;
    const { user, setUser, setLoginModalVisible } = UserAuth();


    return (

        <div className={`xl:px-[150px] 2xl:px-[250px] font-footer p-8 sm:px-[70px] mx-auto bg-semiblack  ${spinnerLoading ? "hidden" : ""}  mt-10 text-white select-none`}>

            <p className='text-white font-bold text-[20px] text-center lg:hidden'>Get Access to Latest Videos  </p>

            <Link href='/membership'>
                <button className=" lg:hidden bg-theme_red text-white rounded-[22px] font-inter text-center mb-8 mt-4 px-[70px] p-3 m-1 text-sm block_popunder hover:scale-105 transition-transform duration-300 mx-auto block">
                    GET MEMBERSHIP
                </button>
            </Link>

            <div className='lg:flex justify-start '>
                <div>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Find your fetish among 40000 videos </p>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Quality you deserve from Full HD - 4k </p>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Discret your secure biling</p>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Cancel your subscription anytime</p>
                </div>

                <div className='lg:ml-[120px] xl:ml-[200px]'>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>CumCraze Originals exclusive content</p>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Unlock 2708 channels in one subscription</p>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Never get bored</p>
                    <p className='text-white font-light text-[16px] text-left my-3 lg:text-[18px]'>Download thousands of videos</p>
                </div>
            </div>



            <Link href='/membership'>
                <button className="text-white lg:block bg-theme_red text-semiblack rounded-[22px] font-inter text-center mb-8 mt-4 px-[70px] p-3 m-1 text-md block_popunder hover:scale-105 transition-transform duration-300 hidden">
                    GET MEMBERSHIP
                </button>
            </Link>


            <hr className="border-t-[1px] border-[#AEABAB] my-4 lg:mb-8" />


            <div className="flex flex-wrap  justify-between my-4">
                <div className="w-1/2 lg:w-1/3  mb-4">
                    <p className='font-semibold text-theme_red text-[17px] text-left mb-2 lg:text-[20px]'>General</p>
                    <Link passHref={true} href={'/membership'}>
                        <p className=' text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Join</p>
                    </Link>
                    <p onClick={() => { setLoginModalVisible(true) }} className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Member Sign in</p>

                    <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Password Recovery</p>

                    <a rel="nofollow" href='https://theporndude.com' >
                        <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>ThePornDude</p>
                    </a>

                </div>

                <div className="w-1/2 lg:w-1/3">
                    <p className='font-semibold text-theme_red text-[17px] text-left mb-2 lg:text-[20px]'>Quick Links</p>
                    <Link passHref={true} href={'/'} legacyBehavior>
                        <a rel="dofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Home</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/category'} legacyBehavior>
                        <a rel="dofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Categories</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/channels'} legacyBehavior>
                        <a rel="dofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Channels</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/membership'} legacyBehavior>
                        <a rel="dofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Join Now</p>
                        </a>
                    </Link>
                </div>

                <div className="w-1/2 lg:w-1/3 mb-4">
                    <p className='font-semibold text-theme_red text-[17px] text-left mb-2 lg:text-[20px]'>Legal</p>
                    <Link passHref={true} href={'/terms'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Terms of use</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/privacy'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Privacy Policy</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/contact'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Cookies Policy</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/parentalcontrol'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Parental Control</p>
                        </a>
                    </Link>
                </div>

                <div className="w-1/2 lg:w-1/3">
                    <p className='font-semibold text-theme_red text-[17px] text-left mb-2 lg:text-[20px]'>Help</p>
                    <Link passHref={true} href={'/faq'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>FAQ</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/contact'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Contact us</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/contact'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Content removal</p>
                        </a>
                    </Link>
                    <Link passHref={true} href={'/parentalcontrol'} legacyBehavior>
                        <a rel="nofollow">
                            <p className='text-white text-[15px] text-left my-3 w-fit border-b-2 border-transparent hover:border-theme_red transition-colors lg:text-[18px]'>Parental Control</p>
                        </a>
                    </Link>
                </div>



            </div>

            <hr className="hidden lg:block border-t-[1px] border-[#AEABAB] mb-4" />


            <Link passHref={true} href={'/privacy'}>

                <p className='text-white underline text-[16px] lg:hidden text-left my-3'>18 U.S.C 2257 Record-Keeping Requirement Compliance Statement</p>
            </Link>


            <p className='text-sm sm:text-md md:text-lg text-[#AEABAB] mt-8'>2021-2025 CumCraze.com</p>

        </div>

    )

}

export default Footer
