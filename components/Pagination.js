import Link from "next/link";
import { useEffect, useState } from "react";



const Pagination = ({ data }) => {


    const url = data.url;
    const currentPageNumberURL = data.currentPageNumberURL;
    const pages = data.pages;



    if (pages.length !== 2) {

        return (
            <div>

            </div>
        )
    }

    return (
        <div className="mt-8">

            <div className={`${parseInt(currentPageNumberURL) === 1 || parseInt(currentPageNumberURL) === parseInt(pages[pages.length - 2]) ? "justify-around" : "justify-between"} flex items-center   md:justify-center`}>

                <Link href={`${url}/page/${parseInt(currentPageNumberURL) - 1}`}>
                    <div className={`${parseInt(currentPageNumberURL) === 1 ? "hidden" : ""}`} >
                        <button className={`scale-90 md:scale-100 font-inter sm:text-med font-bold   sm:mx-4  rounded-lg bg-gray-700 px-6 py-2 text-white hover:button_hover`}>{'<'}</button>
                    </div>
                </Link>


                <div className="flex items-center justify-center  rounded py-[1px]">
                    <p className="font-inter px-4 py-1 rounded text-gray-700  text-md sm:text-lg">{currentPageNumberURL}</p>
                    <span className="mb-1 scale-125 text-red-600">/</span>
                    <p className="font-inter px-4 py-1 rounded text-gray-500  text-md sm:text-lg">{pages[1]}</p>
                </div>


           

                <Link href={`${url}/page/${parseInt(currentPageNumberURL) + 1}`}>
                    <div className={`${parseInt(currentPageNumberURL) === parseInt(pages[1].trim()) ? "hidden" : ""}`} >
                        <button className={`scale-90 md:scale-100 font-inter sm:text-md font-bold   sm:mx-4  rounded-lg bg-gray-700 px-6 py-2 text-white hover:button_hover ml-1`}>{'>'}</button>
                    </div>
                </Link>
            </div>


        </div>

    )
};
export default Pagination;