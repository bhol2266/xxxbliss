import { Menu, Transition } from '@headlessui/react';
import {
    ClockIcon,
    CogIcon,
    EyeIcon,
    LockClosedIcon,
    MinusIcon,
    PlusIcon,
    ThumbUpIcon
} from '@heroicons/react/solid';
import { useRouter } from "next/router";
import Script from "next/script";
import { Fragment, useEffect, useRef, useState } from "react";
import { BsBadgeHdFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import VideoThumbnail from './VideoThumbnail';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const VideoPlayer = ({ video_details, Qualitys, videolink_qualities_screenshots, preloaded_video_qualityy, pornstar, loggedIn, positionsArray, relatedVideos }) => {

    const is3xl = useMediaQuery({ minWidth: 2000 }); // Adjust according to your breakpoint
    const numberOfSide_VideosToShow = is3xl ? 4 : 3;


    let uniquePornstars = pornstar.filter((element, index) => {
        return pornstar.indexOf(element) === index;
    });


    const { user, setLoginModalVisible } = UserAuth();

    const videoPlayerRef = useRef(null)
    const [videoDuration, setVideoDuration] = useState(0);
    const playBtnRef = useRef(null)
    const router = useRouter()


    const [Quality, setQuality] = useState(Qualitys)
    const [VideoSrc, setVideoSrc] = useState(videolink_qualities_screenshots.default_video_src)
    const [tags, settags] = useState([]);
    const [screenshotlayoutToggle, setscreenshotlayoutToggle] = useState(false)
    const [PlusVisible, setPlusVisible] = useState('flex')
    const [MinusVisible, setMinusVisible] = useState('hidden')
    const [tagString, settagString] = useState('');


    //Quality Changer Onclick
    const menuItemOnClick = (quality) => {
        // if (quality == "1080p" || quality == "4k") {
        //     router.push("/membership")
        //     return
        // }
        if (quality != Quality) {

            const currentTime = videoPlayerRef.current.currentTime;
            setQuality(quality);
            const index = videolink_qualities_screenshots.video_qualities_available.indexOf(quality)
            videoPlayerRef.current.load()
            videoPlayerRef.current.currentTime = currentTime
            videoPlayerRef.current.play();
            setVideoSrc(videolink_qualities_screenshots.video_qualities_available_withURL[index])
        }

    }

    const seekTimeOnclick = (obj) => {
        const time = obj.seekTime;

        const extractMinute = parseInt(time.substring(0, time.indexOf(":")))
        const extractSeconds = parseInt(time.substring(time.indexOf(":") + 1, time.length))

        console.log(`extractMinute:${extractMinute}`);
        console.log(`extractSeconds:${extractSeconds}`);

        //videotime will is set in seconds by default
        videoPlayerRef.current.currentTime = (extractMinute * 60) + extractSeconds
        videoPlayerRef.current.play();
        console.log((extractMinute * 60) + extractSeconds);

    }

    const openScreenShotLayout = () => {
        if (screenshotlayoutToggle) {
            setscreenshotlayoutToggle(false)
            setPlusVisible('flex')
            setMinusVisible('hidden')
        } else {

            setscreenshotlayoutToggle(true)
            setPlusVisible('hidden')
            setMinusVisible('flex')
        }
    }


    const download = () => {

        // router.push(VideoSrc)
        router.push("/membership")


    }

    const switchToScene = (obj) => {

        console.log(obj.positionName);
        console.log(obj.timestamp);


        //videotime will is set in seconds by default
        videoPlayerRef.current.currentTime = obj.timestamp
        videoPlayerRef.current.play();

    }




    useEffect(() => {

        let uniqarray = [...new Set(videolink_qualities_screenshots.tagsArray)];
        settags(uniqarray)

        // Create single string of all tags using comma
        let tagsString = ''
        uniqarray.map((tag, index) => {
            if (index === 0) {
                tagsString = tag
            } else {
                tagsString = tagsString + ", " + tag
            }
        })
        settagString(tagsString);


        video_details.duration

        setVideoDuration(timeStringToSeconds(video_details.duration))

    }, []);

    function timeStringToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':').map(parseFloat);
        return minutes * 60 + seconds;
    }


    const calculateLeftPosition = (timestamp) => {
        return `calc(${(timestamp / videoDuration) * 100}% - 10px)`;
    };


    return (

        <div className='flex items-start space-x-2'>

            <div className='flex-grow basis-3/4 3xl:basis-4/5 w-full'>

                <Script
                    src="//imasdk.googleapis.com/js/sdkloader/ima3.js"
                    onLoad={() => {
                        const script = document.createElement("script");
                        script.src = "/vastAd.js";
                        document.body.appendChild(script);
                    }}
                />

                <div id="mainContainer" className={`max-w-full relative aspect-video object-contain  group  shadow-2xl  lg:ml-4`}>
                    <video className={`rounded w-full h-full cursor-pointer`} id="contentElement" onContextMenu={(e) => e.preventDefault()} ref={videoPlayerRef} poster={video_details.thumbnail} width="852" height="480" controls controlsList="nodownload"
                    >
                        <source src={VideoSrc} type="video/mp4" />
                    </video>
                    <div className={`absolute top-0 left-0 `} id="adContainer"></div>
                    <button className="hidden" id="playButton">Play</button>


                    <div className="absolute bottom-[55px] left-0 right-0 flex justify-between hidden xl:flex ">
                        {/* Scene icons */}
                        {positionsArray.map(obj => (
                            <img
                                key={obj.timestamp}
                                src={`/kamasutra_icons/${obj.positionName.toLowerCase()}.png`}
                                className="scale-50 lg:scale-100 absolute w-[35px] h-[35px] bg-black bg-opacity-50 hover:bg-pink-500 hover:bg-opacity-100 transition-colors rounded-[7px] cursor-pointer"
                                style={{
                                    left: calculateLeftPosition(obj.timestamp),
                                }}
                                alt={obj.positionName}
                                onClick={() => switchToScene(obj)} // Function to seek to timestamp
                            />
                        ))}
                    </div>




                </div>




                <div className='basicMargin'>


                    <div className="flex justify-between lg:pt-2 text-sm md:text-lg   ">
                        <div className="flex justify-around items-center space-x-2 md:space-x-4 md:text-lg ">

                            <div className='flex items-center space-x-1'>
                                <ClockIcon className='h-6 hover:scale-100 text-red-700 md:h-9' />
                                <p className=' font-bold'>{video_details.duration.substring(0, 5)}</p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <EyeIcon className="h-6 text-blue-600  md:h-9" />
                                <p className=' font-bold'>{video_details.views.length > 1 ? video_details.views : "46513"}</p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <ThumbUpIcon className="h-6 text-green-500  md:h-9" />
                                <p className=' font-bold'>{video_details.likedPercent}</p>
                            </div>



                        </div>
                        <div className='flex items-center justify-end space-x-2 lg:space-x-4'>

                            {/* <DownloadIcon className='h-7 text-gray-700' /> */}

                            <button onClick={download} className='font-inter text-[12px] lg:text-lg px-2 lg:px-4 py-1 lg:py-1.5 bg-red-500 rounded-md text-white text-center lg:mt-1 navbar'>Download</button>
                            <Menu as="div" className="relative  text-left">
                                <div className=' w-fit relative '>
                                    <Menu.Button className="flex items-center space-x-1">
                                        <CogIcon className="h-9 text-gray-600 m-1  duration-300" />
                                        <p className={`${Quality === '720p' || Quality === '1080p' || Quality === '4k' ? "" : "hidden"}  text-xs bg-red-500 rounded text-white absolute top-1 right-0`}>HD</p>
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
                                    <Menu.Items className="z-50 origin-top-right absolute right-0 bottom-11 mt-2 w-[80px] rounded-md shadow-lg  bg-gray-200  navbar">
                                        <div className=" rounded">

                                            {videolink_qualities_screenshots.video_qualities_available.map(quality => {
                                                return (
                                                    <Menu.Item key={quality} onClick={() => { menuItemOnClick(quality) }}>
                                                        {({ active }) => (
                                                            <div className='hover:bg-gray-300 hover:shadow-lg hover:rounded'>
                                                                <div className={`${quality === Quality ? "text-red-500" : ""} relative px-4  w-fit flex items-center justify-between`}>

                                                                    <LockClosedIcon className={`${quality === '1080p' || quality === '4k' ? "hidden" : "hidden"} h-3 text-gray-600 absolute top-3 left-0.5`} />
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? ' ' : '',
                                                                            'block   py-2 text-sm font-semibold  text-left '
                                                                        )}
                                                                    >
                                                                        {quality}
                                                                    </a>
                                                                    <p className={`${quality === '720p' || quality === '1080p' || quality === '4k' ? "" : "hidden"} text-[10px] bg-red-500 rounded text-white absolute -right-[1px] bottom-3 px-[2px] scale-75 `}>HD</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                )
                                            })}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>


                        </div>

                    </div>



                    {/* Positions  */}

                    {positionsArray.length != 0 &&

                        <div className='flex  items-center mb-2 '>

                            <span className="font-inter text-sm lg:text-md 2xl:text-xl font-bold whitespace-nowrap">Skip to scene:</span>

                            <div className='flex flex-wrap  ml-2'>
                                {
                                    positionsArray.map(obj => {
                                        return (
                                            <p onClick={() => switchToScene(obj)} key={obj.positionName} className='text-xs md:text-sm mr-1  mt-1 cursor-pointer hover:bg-gray-900 rounded px-[5px] py-[2px]  font-inter text-white bg-pink-600'>{obj.positionName}</p>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    }


                    {/* Tags */}
                    <div className="flex flex-wrap mb-1.5" >
                        {
                            tags.map(key => {
                                if (key.length >= 1) {

                                    return (
                                        <Link key={key} href={`/search/${key.trim()}`} passHref>
                                            <p className="text-xs border-[1px] border-[#9499A8] text-semiblack px-2 py-1 rounded-lg m-1 inline-block lg:text-sm hover:bg-gray-300">
                                                {key}
                                            </p>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </div>

                    <div className='flex items-center justify-between'>

                        {uniquePornstars.length >= 1 && <div className='flex items-center py-2 flex-wrap'>
                            <span className='font-semibold text-md '>Pornstar:</span>
                            {uniquePornstars.map(pornstars => {
                                return (

                                    <a key={pornstars} href={`/search/${pornstars.trim().replace(" ", "+")}`}>
                                        <p className='pl-1 pr-1 text-sm md:text-md ml-1 mt-1 bg-red-500 text-white cursor-pointer font-inter font-semibold rounded px-2 hover:bg-red-700'>
                                            {pornstars}
                                        </p>
                                    </a>


                                )
                            })}
                        </div>
                        }


                    </div>


                    {/* ScreenShots  */}

                    <div onClick={openScreenShotLayout} className='2xl:w-1/4 lg:w-1/3 sm:w-1/2  flex items-center rounded-[15px] hover:bg-gray-300 text-white border-gray-400 border-[1px]  justify-between py-0.5 px-2 pr-3   rounded cursor-pointer    md:space-x-4'>

                        <div className='flex items-center'>

                            <FaImages className='h-[20px] w-[20px] mx-3 text-semiblack' />
                            <p className='font-inter  text-md  text-center py-1 text-semiblack'>Screenshots</p>
                        </div>
                        <PlusIcon className={`icon text-semiblack hover:scale-100 ${PlusVisible}`} />
                        <MinusIcon className={`icon text-semiblack hover:scale-100 ${MinusVisible}`} />

                    </div>


                    <div className={` grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ${screenshotlayoutToggle ? "grid scale-100" : "scale-0 h-0"}  transition-all duration-300 `}>
                        {videolink_qualities_screenshots.screenshotsArray.map(shot => {
                            return (
                                <div onClick={() => { seekTimeOnclick(shot) }} className='p-1 relative' key={shot}>
                                    <img
                                        className='rounded'
                                        alt='loading'
                                        src={shot.url}

                                    ></img>
                                    <strong className='absolute bottom-0 right-0 text-white m-2 bg-black bg-opacity-50 font-inter rounded text-sm px-1'>
                                        {shot.seekTime}
                                    </strong>
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>
            <div className="hidden lg:block flex-grow basis-1/4 3xl:basis-1/5">

                {relatedVideos.slice(0, numberOfSide_VideosToShow).map(video => (
                    <VideoThumbnail key={video.thumbnail} details={video} type={""} />
                ))
                }

            </div>
        </div>


    )
};
export default VideoPlayer;


