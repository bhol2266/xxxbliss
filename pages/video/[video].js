import {
    FilmIcon,
    InformationCircleIcon
} from '@heroicons/react/solid';
import { getCookie } from "cookies-next";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import BannerAds from '../../components/Ads/BannerAds';
import VideoPlayer from '../../components/VideoPlayer';
import Videos from '../../components/Videos';
import { BeatLoader } from 'react-spinners';
import bannedUrls from '../../bannedUrls';
import { useMediaQuery } from 'react-responsive';

const Videoplayer = () => {
    const router = useRouter();
    const { video } = router.query;

    const islargeScreen = useMediaQuery({ minWidth: 1000 }); // Adjust according to your breakpoint

    const [spinnerLoading, setSpinnerLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    const [videolinkQualitiesScreenshots, setVideolinkQualitiesScreenshots] = useState({});
    const [preloadedVideoQuality, setPreloadedVideoQuality] = useState('');
    const [positionsArray, setPositionsArray] = useState('');
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [pornstar, setPornstar] = useState([]);
    const [videoDetails, setVideoDetails] = useState({});
    const [videoTitleBackup, setVideoTitleBackup] = useState('');
    const [noVideo, setNoVideo] = useState(false);

    const [Quality, setQuality] = useState('');
    const [VideoSrc, setVideoSrc] = useState('');
    const [tagString, setTagString] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [tags, setTags] = useState([]);

    const [countryVideo, setCountryVideo] = useState([]);
    const [latestVideo, setLatestVideo] = useState([]);

    const [showNotAvailableMessage, setShowNotAvailableMessage] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        const key = video.substring(video.indexOf("video/"), video.indexOf("*"));
        const title = video.substring(video.indexOf("*") + 1).trim();
        setVideoTitleBackup(title);

        const fetchVideoDetails = async () => {


            let api = `/api/spangbang/videoPlayer`

            // const api = `${process.env.BACKEND_URL}videoPlayer`;

            const rawResponse = await fetch(api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ href: `https://spankbang.party/${key}/video/${title}` })
            });

            const data = await rawResponse.json();

            setVideolinkQualitiesScreenshots(data.videolink_qualities_screenshots);
            setPreloadedVideoQuality(data.preloaded_video_quality);
            setRelatedVideos(data.relatedVideos);
            setPornstar(data.pornstar);
            setVideoDetails(data.video_details);
            setPositionsArray(data.positionsArray);
            setNoVideo(data.noVideo);
            setSpinnerLoading(false);

            setQuality(data.preloaded_video_quality);
        };

        const fetchCountryVideos = async () => {
            const fetchVideos = async (url) => {
                const rawResponse = await fetch('/api/spangbang', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(url)
                });
                return await rawResponse.json();
            };

            const newVideos = await fetchVideos("https://spankbang.party/s/spangbang/?o=new");
            setLatestVideo(newVideos.data.finalDataArray);

            const trendingVideos = await fetchVideos("https://spankbang.party/s/spangbang/?o=trending");
            setCountryVideo(trendingVideos.data.finalDataArray);
        };

        const checkBannedUrls = () => {
            const currentUrl = `${process.env.FRONTEND_URL}${router.asPath.slice(1)}`.trim();
            const isBanned = bannedUrls.some(url => currentUrl === url.trim());
            if (isBanned) {
                setSpinnerLoading(false);
                return true;
            }
            return false;
        };

        const init = async () => {
            if (!checkBannedUrls()) {
                try {
                    await fetchVideoDetails();
                    // fetchCountryVideos();
                } catch (error) {
                    console.error(error);
                    setServerError(true);
                }
            }

            const emailExists = getCookie("email");
            if (emailExists && emailExists.length > 4) {
                setLoggedIn(true);
            }

            const uniqueTags = [...new Set(videolinkQualitiesScreenshots.tagsArray)];
            setTags(uniqueTags);

            setTagString(uniqueTags.join(", "));

            setTimeout(() => {
                setShowNotAvailableMessage(true);
            }, 3000);
        };

        init();
    }, [router.isReady]);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    if (spinnerLoading) {
        return (
            <div className="flex justify-center mx-auto mt-10 h-screen mt-[100px]">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        );
    }

    if (serverError) {
        return (
            <div className='my-72 flex flex-col items-center justify-center'>
                <span className='text-center '> Something went wrong!</span>
                <button onClick={() => { router.push('/') }} className='mx-auto my-4 bg-theme text-white rounded px-8 py-1 hover:bg-red-700'>Go to Home -&gt;</button>
            </div>
        );
    }

    return (
        <div>

            {preloadedVideoQuality.length > 0 && !noVideo ? (
                <>
                    <Head>
                        <title>{`${noVideo ? videoTitleBackup : videoDetails.Title} - ${noVideo ? "720p" : videolinkQualitiesScreenshots.video_qualities_available[videolinkQualitiesScreenshots.video_qualities_available.length - 1].toUpperCase()}`} | CumCraze</title>
                        <meta name="description" content={`Watch  ${capitalizeFirstLetter(noVideo ? videoTitleBackup : videoDetails.Title)} on CumCraze `} />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="keywords" content={tagString} />
                        <meta property="og:title" content={`${noVideo ? videoTitleBackup : videoDetails.Title} - ${noVideo ? "720p" : videolinkQualitiesScreenshots.video_qualities_available[videolinkQualitiesScreenshots.video_qualities_available.length - 1].toUpperCase()}`} />
                        <meta property="og:description" content={`Watch  ${capitalizeFirstLetter(noVideo ? videoTitleBackup : videoDetails.Title)} on CumCraze `} />
                        <meta name="twitter:title" content={`${noVideo ? videoTitleBackup : videoDetails.Title} - ${noVideo ? "720p" : videolinkQualitiesScreenshots.video_qualities_available[videolinkQualitiesScreenshots.video_qualities_available.length - 1].toUpperCase()}`} />
                        <meta name="twitter:description" content={`Watch  ${capitalizeFirstLetter(noVideo ? videoTitleBackup : videoDetails.Title)} on CumCraze `} />
                        <link rel="canonical" href={`https://www.cumcraze.com/video/${video}`} />

                    </Head>

                    <div className='flex text-sm md:text-lg basicMargin'>
                        <div className='flex items-center mt-2 space-x-1 lg:space-x-2'>
                            <FilmIcon className='h-[20px] md:h-9 hover:scale-100 text-red-600' />
                            {videolinkQualitiesScreenshots.video_qualities_available.map(quality => (
                                <p key={quality} className='font-poppins pr-1'>{quality.toUpperCase()}</p>
                            ))}
                        </div>
                    </div>

                    <h1 className='text-md sm:text-lg font-semibold my-1 text-wrap text-gray-700 md:text-2xl font-inter basicMargin'>{videoDetails.Title}</h1>

                    <div className='py-1 rounded overflow-hidden sm:cursor-pointer '>
                        <VideoPlayer
                            video_details={videoDetails}
                            VideoSrc={VideoSrc}
                            Qualitys={Quality}
                            videolink_qualities_screenshots={videolinkQualitiesScreenshots}
                            preloaded_video_quality={preloadedVideoQuality}
                            pornstar={pornstar}
                            positionsArray={positionsArray}
                            loggedIn={loggedIn}
                            relatedVideos={relatedVideos.slice(0, 4)}

                        />
                    </div>

                    <p className='font-bold text-semiblack text-[18px] lg:text-[24px] font-manrope basicMargin mt-3'>More videos like this</p>

                    {islargeScreen && <Videos data={relatedVideos.slice(4, relatedVideos.length)} />}
                    {!islargeScreen && <Videos data={relatedVideos} />}

                    {latestVideo.length !== 0 && <Videos data={latestVideo} />}

                    <BannerAds />
                </>
            ) : (

                <>
                    <Head>
                        <title>{`${videoTitleBackup}`} | CumCraze</title>
                        <meta name="description" content={`Watch ${capitalizeFirstLetter(videoTitleBackup)} on CumCraze `} />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    </Head>
                    <div>
                        {relatedVideos.length !== 0 && (
                            <div className='relative'>
                                <h1 className='my-10 mb-16 font-semibold font-inter lg:text-xl text-center'>{videoTitleBackup.replaceAll("+", " ")}</h1>
                                <span className='font-poppins md:text-lg'>Related videos to {videoTitleBackup.replaceAll("+", " ")}</span>
                                <Videos data={relatedVideos} />
                                {showNotAvailableMessage && (
                                    <div className='flex space-x-4 items-center justify-center absolute top-[35px] mx-auto left-0 right-0'>
                                        <InformationCircleIcon className='h-8 text-black' />
                                        <span className='text-sm font-semibold font-inter lg:text-lg text-theme w-fit'>This Video Is No Longer Available.</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );

    return null;
};

export default Videoplayer;
