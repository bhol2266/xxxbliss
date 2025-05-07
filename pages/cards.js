import React, { useEffect, useState } from 'react'
import { readCards } from '../config/firebase/lib'

import { updateCardChecked } from '../config/firebase/lib';

const Cards = () => {

    const [cards, setCards] = useState([]);


    async function readCardsFunction() {
        const objs = await readCards()
        setCards(objs)
    }
    async function checkedClick(checked, cardnumber) {

        updateCardChecked(true, cardnumber)
    }


    function copyCardNumberFunctio(cardnumber) {
        navigator.clipboard.writeText(cardnumber.replace(/\s/g, ""))
            .then(() => {
                console.log('Text copied to clipboard');
                // Optionally, you can set a state to show a message indicating successful copy
            })
            .catch(err => {
                console.error('Unable to copy text to clipboard: ', err);
                // Handle any errors here
            });
    }

    useEffect(() => {

        readCardsFunction()

    }, [])



    return (
        <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 m-4 items-center">

            {cards.map(card => {

                return (
                    <div key={card.cardnumber} className="  p-4 rounded-lg bg-theme  shadow-md">

                        <div className='flex items-center justify-start'>
                            <p className="text-white font-poppins my-1 text-[20px]"> {card.nameOnCard}</p>
                            <button onClick={() => { copyCardNumberFunctio(card.cardnumber) }} className='bg-blue-500 text-white ml-8 p-2 px-8 rounded font-semibold text-xs hover:bg-blue-600'>
                                COPY
                            </button>
                        </div>
                        <p className="text-white font-poppins my-1 text-[20px] font-semibold"> {card.cardnumber}</p>
                        <p className="text-white font-poppins my-1 text-[16px]"> {card.month}/{card.year}</p>
                        <p className="text-white font-poppins my-1 text-[16px]"> {card.cvv}</p>
                        <p className="text-white font-poppins my-1 text-[18px]">{card.date}</p>
                        {/* Submit Button */}

                        <div className='flex space-x-3'>

                            <button onClick={() => { checkedClick(card.checked, card.cardnumber) }} type="submit" className={`w-full text-white py-2 px-4 rounded-md ${card.checked ? "bg-green-500" : "bg-red-500"} `}>{card.checked ? "checked" : "not checked"}</button>
                            <button type="submit" className={`w-full text-white py-2 px-4 rounded-md ${card.working ? "bg-green-500" : "bg-red-500"} `}>{card.working ? "working" : "not working"}</button>
                        </div>
                    </div>
                )

            })}



        </div>
    )
}
export default Cards;
