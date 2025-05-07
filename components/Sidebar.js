import React from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import categories from "../JsonData/categoryImages/data.json"

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function  Sidebar() {
    const router = useRouter();



    return (
        <div className='hidden md:flex md:flex-col border-[2.5px] border-[rgba(187, 187, 187, 0.41)] rounded-[12px]  h-fit pb-8 basicMargin_sidebar'>

            <p className='font-inter font-semibold text-[#777777] text-[18px] my-4'>
                CATEGORIES
            </p>


            {categories.map(category => {
                return (

                    <Link key={category.name} href={`/category/${category.name.replaceAll('.png', "").toLowerCase().trim()}`}>
                        <h2 className="w-fit hover:font-semibold hover:text-semiblack border-b-[3px] hover:border-[#FFBB00] border-transparent text-[16px] 2xl:text-[18px] text-[#777777] m-2 cursor-pointer capitalize font-inter whitespace-nowrap">{category.name.replaceAll('.png', "")}</h2>
                    </Link>

                )
            })}

        </div>
    )
}

export default Sidebar