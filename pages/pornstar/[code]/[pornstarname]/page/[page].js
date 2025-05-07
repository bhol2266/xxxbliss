import * as cheerio from 'cheerio';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../../../components/Pagination';
import Header from '../../../../../components/Pornstar_Channels/Header';
import Videos from "../../../../../components/Videos";
import { Scrape_Video_Item_Pornstar } from '../../../../../config/Scrape_Video_Item';
import pornstarNameList from "../../../../../JsonData/pornstarlist/alldata.json";
import { PlusIcon } from '@heroicons/react/outline';
import { getCookie } from 'cookies-next';
import { checkSubcribedPornstar, updateSubcribedPornstars } from '../../../../../config/firebase/lib';
import { UserAuth } from "@/context/AuthContext";



function Index({ video_collection, pages, pornstarInformation, collageImages }) {

    const { setLoginModalVisible } = UserAuth();


    const router = useRouter();
    const { code, page, pornstarname, isReady } = router.query
    const currentPageNumberURL = page
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (!pornstarname) return;

        const fetchSubscriptionStatus = async () => {
            const subscribed = await checkSubcribedPornstar(pornstarname);
            setIsSubscribed(subscribed);
        };
        fetchSubscriptionStatus();
    }, [code, pornstarname]);


    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        )
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    async function clickSubscribe() {

        if (!getCookie("email")) {
            setLoginModalVisible(true)
            return
        }
        if (isSubscribed) {
            // Remove subscription
            await updateSubcribedPornstars(code, pornstarname, "remove");
            setIsSubscribed(false); // Update state to reflect removal
        } else {
            // Add subscription
            await updateSubcribedPornstars(code, pornstarname, "add");
            setIsSubscribed(true); // Update state to reflect addition
        }

    }

    return (
        <>

<Head>

<title>{`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - CumCraze | ${currentPageNumberURL}`}</title>

<meta name="description" content={`Find nude ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} porn videos featuring the porn star fucks in XXX scenes, including amateur, anal, blowjob!`} />
<meta name="keywords" content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, Cumcraze" />
<meta property="og:title" content={`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - CumCraze`} />
<meta property="og:description" content={`Find nude ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} porn videos featuring the porn star fucks in XXX scenes, including amateur, anal, blowjob!`} />
<meta name="twitter:title" content={`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - CumCraze`} />
<meta name="twitter:description" content={`Find nude ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} porn videos featuring the porn star fucks in XXX scenes, including amateur, anal, blowjob!`} />
<link rel="canonical" href={`https://www.Cumcraze.com/pornstar/${code}/${pornstarname}/page/${page}`} />





</Head>


            <div>

                <div className="-mt-2 mb-6 relative h-[240px] sm:h-[290px] md:h-[260px] lg:h-[290px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[370px]">
                    <div>

                        <div className="grid grid-cols-6 md:grid-cols-9 ">
                            {collageImages.map((thumbnail, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-auto"
                                >
                                    <img
                                        src={thumbnail}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-auto aspect-video object-contain"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col items-start mt-auto sm:mt-4 ml-[170px] lg:ml-[200px] 2xl:ml-[210px]'>

                            <div className=''>
                                <span className='text-gray-500 font-poppins text-[12px] lg:text-[14px]'>Videos :  </span>
                                <span className='text-black font-poppins text-[12px] lg:text-[14px]'>  {pornstarInformation.videos}</span>
                            </div>

                            <div>
                                <span className='text-gray-500 font-poppins text-[12px] lg:text-[14px]'>Views : </span>
                                <span className='text-black font-poppins text-[12px] lg:text-[14px]'>{pornstarInformation.views}</span>
                            </div>

                            <div>
                                <span className='text-gray-500 font-poppins text-[12px] lg:text-[14px]'>Subscribers : </span>
                                <span className='text-black font-poppins text-[12px] lg:text-[14px]'>{pornstarInformation.subscribers}</span>
                            </div>



                        </div>
                    </div>

                    <div className=" absolute flex top-[60px] sm:top-[130px] md:top-[50px] lg:top-[50px] xl:top-[80px] 2xl:top-[120px] 3xl:top-[120px]  left-[10px] items-b justify-between w-[calc(100%-20px)]">
                        <div>
                            <img
                                className="object-cover w-36 aspect-[9/10] lg:w-44  rounded-[15px] border-[1px] border-gray-200"
                                src={pornstarInformation.pornstarImage}
                                alt={pornstarInformation.name}
                                loading="lazy"
                            />
                            <h2 className="text-lg lg:text-xl 2xl:text-2xl font-poppins text-theme my-1 pl-1">
                                {capitalizeFirstLetter(pornstarInformation.name.replace(/\+/g, " ")).replace(" porn videos", "")}
                            </h2>


                        </div>


                        <div className="mt-auto flex flex-col space-y-4 ">
                            {/* <Link href={pornstarInformation.creatorHref} rel="nofollow">
                                <div className="cursor-pointer h-fit flex items-center justify-center space-x-2 border-[1px] border-gray-300 text-semiblack px-3 lg:px-5 p-1.5 rounded-[20px] hover:bg-semiblack hover:text-white group">
                                    <LinkIcon className="h-4 lg:h-5 text-semiblack group-hover:text-white" />
                                    <p className="text-sm lg:text-md 2xl:text-lg font-poppins">
                                        Visit
                                    </p>
                                </div>
                            </Link> */}


                            <div onClick={() => { clickSubscribe() }} className={` ${isSubscribed ? "bg-green-500  hover:bg-green-600" : "bg-red-500  hover:bg-red-600"} w-36 lg:w-44 mt-auto cursor-pointer h-fit flex items-center justify-center space-x-2 shadow-md text-white  p-1.5 rounded-[20px]`}>
                                {!isSubscribed &&
                                    <PlusIcon className="h-4 lg:h-5 text-white" />
                                }
                                <p className="text-sm lg:text-md 2xl:text-lg font-poppins">
                                    {isSubscribed ? "Subscribed" : "Subscribe"}
                                </p>

                            </div>

                        </div>
                    </div>
                </div>


                <Header keyword={pornstarname.replace("+", " ")} pageNumber={currentPageNumberURL} code={code} />
                <Videos data={video_collection} />
            </div>

            <Pagination data={{ url: `/pornstar/${code}/${pornstarname}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />



        </>
    )
}

export default Index


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: '24y',
                    pornstarname: 'mercedes+ashley',
                    page: '1'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {



    const { code, pornstarname, page } = context.params;


    const parcelData = { url: `https://spankbang.party/${code}/pornstar/${pornstarname}/page/${page}/?o=all` };
    const API_URL = `${process.env.BACKEND_URL}getPornstarVideos`;
    const rawResponse = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
    });

    const { finalDataArray, pages, pornstarData, collageImages } = await rawResponse.json();
    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            pornstarInformation: pornstarData,
            collageImages: collageImages,

        }
    }
}


