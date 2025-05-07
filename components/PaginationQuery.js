import { useRouter } from "next/router";
import Router from 'next/router'



const PaginationQuery = ({ data }) => {


    const pathname = data.pathname;
    const currentPageNumberURL = data.currentPageNumberURL;
    const filteredObjsArray = data.filteredObjsArray;
    const keyword = data.keyword;
    const pages = data.pages;
    const code = data.code;

    const router = useRouter();


    const clickHandler = (pageNumber) => {
        if (Router.pathname.includes("/channels/")) {

            var queryObj = {
                channelname: keyword,
                code:code,
                page: pageNumber
            }

        } else {
            var queryObj = {
                category: keyword,
                page: pageNumber
            }
        }
        if (filteredObjsArray) {
            for (let index = 0; index < filteredObjsArray.length; index++) {

                queryObj[filteredObjsArray[index].substring(0, filteredObjsArray[index].indexOf('='))] = filteredObjsArray[index].substring(filteredObjsArray[index].indexOf('=') + 1, filteredObjsArray[index].length)
            }
        }
        router.push({
            pathname: pathname,
            query: queryObj
        })
    }

    if (pages.length !== 2) {

        return (
            <div>

            </div>
        )
    }

    return (
        <div className="mt-8">

            <div className={`${parseInt(currentPageNumberURL) === 1 || parseInt(currentPageNumberURL) === parseInt(pages[pages.length - 2]) ? "justify-around" : "justify-between"} flex items-center   md:justify-center`}>

                <button onClick={() => { clickHandler(parseInt(currentPageNumberURL) - 1) }} className={`${parseInt(currentPageNumberURL) === 1 ? "hidden" : ""} scale-90 md:scale-100 font-inter sm:text-med font-bold   sm:mx-4  rounded-lg bg-gray-700 px-6 py-2 text-white hover:bg-button_hover`}>{'<'}</button>

                <div className="flex items-center justify-center  rounded py-[1px]">
                    <p className="font-inter px-4 py-1 rounded text-gray-700  text-md sm:text-lg">{currentPageNumberURL}</p>
                    <span className="mb-1 scale-125 text-red-600">/</span>
                    <p className="font-inter px-4 py-1 rounded text-gray-500  text-md sm:text-lg">{pages[1]}</p>
                </div>



                <button onClick={() => { clickHandler(parseInt(currentPageNumberURL) + 1) }} className={`${parseInt(currentPageNumberURL) === parseInt(pages[pages[1].trim()]) ? "hidden" : ""} scale-90 md:scale-100 font-inter sm:text-med font-bold   sm:mx-4  rounded-lg bg-gray-700 px-6 py-2 text-white hover:bg-button_hover ml-1`}>{'>'}</button>

            </div>

        </div >

    )
};
export default PaginationQuery;