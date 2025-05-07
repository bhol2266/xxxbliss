import { ClockIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from "react";
import { PiTelevisionSimple } from "react-icons/pi";
import { GiFemaleLegs } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";

import videosContext from '../context/videos/videosContext';
import PopunderAds from './Ads/Popunder';
import Link from 'next/link';

function VideoThumbnail({ details, type }) {



    const [videoPage, setVideoPage] = useState(false);
    const [showPoster, setShowPoster] = useState(true);
    const [spinnerLoader, setSpinnerLoader] = useState(false);

    const video = details;
    const key = details.href.substring(details.href.indexOf('video/') + 6);
    const keyTitle = video.href.substring(video.href.indexOf('com/') + 4);
    const keyy = keyTitle.substring(0, keyTitle.indexOf('/video'));
    const title = keyTitle.substring(keyTitle.indexOf('video/') + 6);


    const { viewType, setViewType } = useContext(videosContext);


    useEffect(() => {
        if (window.location.href.includes("/video")) {
            setVideoPage(true);
        }
    }, []);

    const onClickHandler = () => {
        const videoData = {
            Title: video.title,
            duration: video.duration,
            likedPercent: video.likedPercent,
            thumbnail: video.thumbnail,
            views: video.views,
        };
        localStorage.setItem('videoplayer', JSON.stringify(videoData));
    };

    const stopMovie = (e) => {
        e.target.load();
        setShowPoster(true);
        setSpinnerLoader(false);
    };

    const playMovie = (e) => {
        e.target.play();
        setShowPoster(false);
        setSpinnerLoader(true);
    };

    const customiseUrl = (channelHref) => {
        let returnHref = ""
        if (video.refrenceLinkType == "channel") {

            const code = channelHref.substring(1, channelHref.indexOf("/channel"))
            const channelName = channelHref.substring(channelHref.indexOf("/channel/") + 9, channelHref.length - 1)
            returnHref = `/channels/${code}/${channelName}`

        }
        if (video.refrenceLinkType == "search") {

            // const searchkey = channelHref.substring(channelHref.indexOf("/s/") + 4, channelHref.length - 1)
            returnHref = `/search/${video.channelName}` //directly pass the searach key not need to extract from the href

        }
        if (video.refrenceLinkType == "creator") {

            const pornstarCode = channelHref.substring(1, channelHref.indexOf("/pornstar"))
            const pornstarName = channelHref.substring(channelHref.indexOf("/pornstar/") + 10, channelHref.length - 1)
            returnHref = `/pornstar/${pornstarCode}/${pornstarName}`

        }
        if (video.refrenceLinkType == "pornstar") {
            const pornstarCode = channelHref.substring(1, channelHref.indexOf("/pornstar"))
            const pornstarName = channelHref.substring(channelHref.indexOf("/pornstar/") + 10, channelHref.length - 1)
            returnHref = `/pornstar/${pornstarCode}/${pornstarName}`

        }
        returnHref = returnHref.replace("///", "/").replace("//", "/")

        return returnHref
    }

    return (


        <div>
            <a className="block" href={type != "premium" ? `/video/${keyy}*${title}` : `/video/${keyy}*${title}`} onClick={onClickHandler}>

                <div className="animate-fade flex flex-col items-start justify-center cursor-pointer rounded-md overflow-hidden transform transition duration-150 mb-3 2xl:mb-4">
                    <div className={`relative w-full overflow-hidden ${viewType === "grid" ? "aspect-custom md:aspect-video" : "aspect-video"}`}>
                        <img

                            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                            src={video.thumbnail}
                            alt="Video Thumbnail"
                        />

                        <div className="absolute bottom-1.5 right-2 bg-black bg-opacity-60 text-white text-xs md:text-sm lg:text-md 2xl:text-lg px-2 py-1 rounded">
                            <span className="font-sans pr-1 font-black italic scale-125">{video.videoBadge}</span>
                            <span className="font-inter">{video.duration}</span>
                        </div>
                        <video
                            className={`absolute top-0 left-0 w-full h-full object-cover ${showPoster ? 'opacity-0' : 'opacity-100'}`}
                            onMouseOver={playMovie}
                            onMouseLeave={stopMovie}
                            src={video.previewVideo}
                            preload="none"
                            muted
                        />
                    </div>

                    {type === "premium" && (
                        <img src="/crown.png" className="absolute top-0 right-0 h-6 lg:h-8 m-2 bg-white bg-opacity-70 p-0.5 rounded-md" alt="Premium" />
                    )}
                    <span className="font-inter text-[14px] md:text-[16px] xl:text-[18px] px-1 lg:pl-2 py-1 text-semiblack line-clamp-1">
                        {video.title}
                    </span>

                    <div className="flex items-center justify-start w-full pl-0.5 sm:pl-1 md:pb-2 lg:pl-2 font-arial -mt-[6px] lg:-mt-1.5">
                        <div className="flex items-center">
                            <p className="text-[13px] md:text-[15px] xl:text-[16px] text-gray-400 font-inter">{video.views} Views</p>
                        </div>
                        <div className="flex items-center ml-3">
                            <img className="w-[15px] h-[15px] xl:w-[22px] xl:h-[22px]" src="/icons/thumb.png" alt="Likes" />
                            <p className="text-[13px] md:text-[15px] xl:text-[16px] font-inter sm:ml-1 xl:ml-2 text-gray-400">{video.likePercentage}</p>
                        </div>

                        {video.channelName !== "" && (
                            <div className="hidden md:flex items-center ml-2">
                                {video.refrenceLinkType === "channel" && <PiTelevisionSimple className="icon w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] text-blue-600" />}
                                {video.refrenceLinkType === "pornstar" && <GiFemaleLegs className="icon w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] text-pink-600" />}
                                {video.refrenceLinkType === "creator" && <FaUserCheck className="icon w-[16px] h-[16px] text-gray-600" />}

                                <Link href={customiseUrl(video.channelHref)} onClick={onClickHandler} data-title={video.title}>
                                    <span className={`${video.refrenceLinkType === "pornstar" ? "text-pink-600" : video.refrenceLinkType === "channel" ? "text-blue-600" : "text-gray-600"} text-[13px] font-inter underline`}>
                                        {video.refrenceLinkType === "search" ? `#${video.channelName}` : video.channelName}
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {video.channelName !== "" && (
                        <div className="md:hidden flex items-center -mt-[5px]">
                            {video.refrenceLinkType === "channel" && <PiTelevisionSimple className="icon w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] text-blue-600 mt-[1px]" />}
                            {video.refrenceLinkType === "pornstar" && <GiFemaleLegs className="icon w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] text-pink-600" />}
                            {video.refrenceLinkType === "creator" && <FaUserCheck className="icon w-[16px] h-[16px] text-gray-600" />}

                            <Link href={customiseUrl(video.channelHref)} onClick={onClickHandler} data-title={video.title}>
                                <span className={`${video.refrenceLinkType === "pornstar" ? "text-pink-600" : video.refrenceLinkType === "channel" ? "text-blue-600" : "text-gray-600"} text-[13px] font-inter underline`}>
                                    {video.refrenceLinkType === "search" ? `#${video.channelName}` : video.channelName}
                                </span>
                            </Link>
                        </div>
                    )}
                </div>

                <PopunderAds />
            </a>
        </div >
    );
}

export default VideoThumbnail;
