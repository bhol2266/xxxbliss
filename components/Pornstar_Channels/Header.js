/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/outline'
import { CalendarIcon, ClockIcon, CogIcon, XCircleIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

import Router, { useRouter } from 'next/router'
import { useContext } from 'react'
import videosContext from '../../context/videos/videosContext'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({ keyword, pageNumber, filteredObjsArrayProps, code }) {

    const context = useContext(videosContext);
    const { setSpinner, } = context;
    const { currentLocation, setcurrentLocation, viewType, setViewType } = useContext(videosContext);
    const router = useRouter();


    const toggleViewType = () => {
        const newViewType = viewType === 'grid' ? 'horizontal' : 'grid';
        setViewType(newViewType);

    };



    // This object is to display whats stuffs are filtered 
    const Final_filteredArray = []

    //by default
    var filter_isPresent = 'Trending'
    var quality_isPresent = 'All'
    
    if (filteredObjsArrayProps) {

        for (let index = 0; index < filteredObjsArrayProps.length; index++) {

            if (filteredObjsArrayProps[index].includes("o=")) {

                if (filteredObjsArrayProps[index].includes('new')) {
                    filter_isPresent = 'New'
                }

                if (filteredObjsArrayProps[index].includes('top')) {

                    filter_isPresent = 'Popular'
                }
                if (filteredObjsArrayProps[index].includes('long')) {

                    filter_isPresent = 'Long'
                }
                if (filteredObjsArrayProps[index].includes('trending')) {

                    filter_isPresent = 'Trending'
                }

                if (!filteredObjsArrayProps[index].includes('all')) {
                    Final_filteredArray.push(filter_isPresent)
                }
            }

            if (filteredObjsArrayProps[index].includes("q=")) {
                if (filteredObjsArrayProps[index].includes('hd')) {
                    quality_isPresent = '720p'
                }
                if (filteredObjsArrayProps[index].includes('fhd')) {
                    quality_isPresent = '1080p'
                }
                if (filteredObjsArrayProps[index].includes('uhd')) {
                    quality_isPresent = '4K'
                }
                if (!filteredObjsArrayProps[index].includes('all')) {
                    Final_filteredArray.push(quality_isPresent)
                }
            }


        }
    }

    const filter = [
        { name: 'Trending', query: 'o=all' },
        { name: 'New', query: 'o=new' },
        { name: 'Popular', query: 'o=top' },
        { name: 'Long', query: 'o=long' },
    ]
    const qualtiy = [
        { name: 'All', query: 'q=all' },
        { name: '720p', query: 'q=hd' },
        { name: '1080p', query: 'q=fhd' },
        { name: '4K', query: 'q=uhd' },
    ]

    const clickHandler = (query) => {

      

        if (Router.pathname.includes("/query") && filteredObjsArrayProps.length == 0) {
            //when there is no filter go back to index page instead of query page. 
            if (Router.pathname.includes("/channels/")) {
                router.push(`/channels/${code}/${keyword.toLowerCase()}`)
            } else {
                router.push(`/pornstar/${code}/${keyword.toLowerCase()}`)
            }
            return
        }
        setSpinner(true)

        if (Router.pathname.includes("/channels/")) {
            //this code is just to change channelname: keyword and pornstar: keyword

            var queryObj = {
                channelname: keyword.trim(),
                page: 1,
                code: code
            }
        } else {

            var queryObj = {
                pornstar: keyword.trim(),
                page: 1,
                code: code
            }
        }

        if (filteredObjsArrayProps) {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {

                queryObj[filteredObjsArrayProps[index].substring(0, filteredObjsArrayProps[index].indexOf('='))] = filteredObjsArrayProps[index].substring(filteredObjsArrayProps[index].indexOf('=') + 1, filteredObjsArrayProps[index].length)
            }
        }

        if (query) {
            queryObj[query.substring(0, query.indexOf('='))] = query.substring(query.indexOf('=') + 1, query.length)
        }
        var pathname = ""
        if (Router.pathname.includes("/channels/")) {
            pathname = "/channels/query/"
        } else {
            pathname = "/pornstar/query/"
        }

        Router.push({
            pathname: pathname,
            query: queryObj
        })
    }

    const removefilter = (item) => {



        if (item === 'Long' || item === 'Trending' || item === 'New' || item === 'Popular') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("o=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()
                }

            }
        }

        if (item === '720p' || item === '1080p' || item === '4K') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("q=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }


    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (

        <div className='basicMargin '>

            <div className='flex items-center md:pr-10 pt-2 my-1  md:my-2 '>
                <div className='flex  '>
                    <h1 className='text-xl md:text-2xl   font-semibold text-semiblack font-inter my-1  '>{capitalizeFirstLetter(keyword.replace(/\+/g, " "))} Porn videos</h1>

                </div>
                <p className='text-md md:text-xl  pr-1  flex-grow font-inter  text-right text-gray-900 '>{`Page-${pageNumber}`}</p>
            </div>




            <div className='   md:flex sm:py-1 '>

                {/* This filter applied bar */}
                <div className='flex items-center flex-wrap justify-start mb-2 md:mb-0   '>
                    {Final_filteredArray.map(item => {
                        return (
                            <div key={item} onClick={() => { removefilter(item) }} className='mr-1 md:mr-2 text-xs md:text-sm hover:bg-red-800 cursor-pointer bg-red-500 rounded-lg px-2 py-1 flex items-center space-x-1 '>
                                <p className=' text-white font-inter ' >{item}</p>
                                <XCircleIcon className='h-4 md:h-6 text-white' />
                            </div>
                        )
                    })}
                </div>

                <div className='flex items-center justify-between '>

                    <div className='flex items-center justify-start md:justify-center mb-1    space-x-1 sm:space-x-2'>

                        <Menu as="div" className={` relative  text-left`}>
                            <div className='w-fit'>
                                <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                    Filter
                                    <FilterIcon className="-mr-1 ml-2 h-4 md:h-5  w-4 md:w-5  mt-[1.5px]" aria-hidden="true" />
                                </Menu.Button>

                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className=" z-50 origin-top-right absolute left-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                    {filter.map(item => {
                                        return (
                                            <Menu.Item key={item.name}  >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:text-white hover:bg-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        <span className={`${item.name === filter_isPresent ? "text-green-500" : ""}`}>{item.name}</span>
                                                    </p>
                                                )}
                                            </Menu.Item>



                                        )
                                    })}



                                </Menu.Items>
                            </Transition>
                        </Menu>


                        <Menu as="div" className="relative  text-left">
                            <div className=' w-fit'>
                                <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                    Quality
                                    <CogIcon className="-mr-1 ml-2 h-4 md:h-5  w-4 md:w-5  mt-[1.5px]" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">

                                        {qualtiy.map(item => {
                                            return (
                                                <Menu.Item key={item.name} >
                                                    {({ active }) => (
                                                        <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm font-semibold hover:text-white hover:bg-red-500 cursor-pointer'
                                                        )}
                                                        >
                                                            <span className={`${item.name === quality_isPresent ? "text-green-500" : ""}`}>{item.name}</span>
                                                        </p>
                                                    )}
                                                </Menu.Item>
                                            )
                                        })}



                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                    </div>

                    <img
                        className='h-[20px] w-[20px] cursor-pointer sm:hidden mb-2 '
                        src={viewType === 'horizontal' ? '/grid.png' : '/horizontal.png'}
                        onClick={toggleViewType}
                        alt="Toggle View"
                    />
                </div>


            </div>
        </div>


    )
}

