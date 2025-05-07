import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import videosContext from '../context/videos/videosContext';
import VideoThumbnail from "./VideoThumbnail";

import {
    LightningBoltIcon,
} from '@heroicons/react/solid';
import InterstitialAds from "./Ads/InterstitialAds";
import PopunderAds from "./Ads/Popunder";

function Videos({ data, type }) {
    

    const { viewType, setViewType } = useContext(videosContext);

    const router = useRouter();

    const [currentPath, setCurrentPath] = useState('');
    const [pageLoaded, setPageLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false); // New state to track if ready to render



    useEffect(() => {
        if (router.asPath === '/' || window.location.href.includes('/video')) {
            setCurrentPath('blocked');
        }
        setPageLoaded(true);
    }, [router.asPath]);



    return (
        <div className="h-fit  basicMargin">
            <div className={`grid py-1 gap-2  3xl:gap-4   ${viewType === 'horizontal' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  3xl:grid-cols-5' : 'grid-cols-2 lg:grid-cols-4  3xl:grid-cols-5'}`}>
                {
                    data.map(video => (
                        <VideoThumbnail key={video.thumbnail} details={video} type={type} />
                    ))
                }
            </div>

            {data.length === 0 &&
                <div className="flex flex-col justify-center items-center space-y-2 w-full my-20">
                    <LightningBoltIcon className="h-8 text-red-500" />
                    <span className="font-inter text-sm md:text-md">We could not find any videos</span>
                    <span className="font-inter md:text-lg font-semibold text-theme text-center">Repeat your search with another keyword or filter</span>
                    <button onClick={() => router.back()} className="bg-button rounded-lg font-inter text-white px-3 py-1 hover:bg-button_hover">Go Back</button>
                </div>
            }

            {pageLoaded &&
                <>
                    {currentPath !== "blocked" &&
                        <>
                            <PopunderAds />
                        </>
                    }
                </>
            }

            <InterstitialAds />
        </div>
    );
}

export default Videos;
