import { deleteCookie, getCookie } from "cookies-next";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from "react-country-flag";
import Header from "../components/searchPage/Header";
import Pagination from '../components/Pagination';

import BannerAds from '../components/Ads/BannerAds';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import Category_slider from '../components/category_slider';
import Channels_slider from '../components/channels_slider';
import Pornstar_slider from '../components/pornstar_slider';

import Homepage_Title from '../components/Homepage_Title';
import { getFirstKeyword, getSubscribedChannels, getSubscribedPornstars, updateCountry } from '../config/firebase/lib';
import { getLanguge } from '../config/getLanguge';
import { fetchVideos, getViewChannels, getViewCreators, getViewPornstars, shuffle } from '../config/utils';
import videosContext from '../context/videos/videosContext';
import Link from "next/link";
import Creators_slider from "../components/creators_slider";

export default function Home({ finalDataArray, trendingChannels, tags, trendingPornstars, trendingCreators }) {
  const { currentLocation, setcurrentLocation, viewType, setViewType } = useContext(videosContext);
  const [countryVideos, setcountryVideos] = useState([]);
  const [countryLanguage, setcountryLanguage] = useState('');
  const [lang, setLang] = useState('');
  const [TrendingChannels, setTrendingChannels] = useState(trendingChannels);
  const [TrendingPornstars, setTrendingPornstars] = useState(trendingPornstars);
  const [TrendingCreators, setTrendingCreators] = useState([]);


  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const router = useRouter();




  async function fetchLocation() {
    const location_localstorage = localStorage.getItem("location");
    if (location_localstorage !== null) {
      const parsedLocation = JSON.parse(location_localstorage);
      setcurrentLocation(parsedLocation);
      countryUpdated_DB(parsedLocation.countryName);

      setLang(getLanguge(parsedLocation.countryName));
      setcountryLanguage(lang);
      const countryVideos = await fetchVideos(lang);

      setcountryVideos(countryVideos)
    } else {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        const data = await response.json();
        setcurrentLocation(data);

        setLang(getLanguge(data.countryName));
        setcountryLanguage(lang);
        const countryVideos = await fetchVideos(lang);

        console.log(countryVideos);



        setcountryVideos(countryVideos)
        await countryUpdated_DB(data.countryName);
        localStorage.setItem("location", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function countryUpdated_DB(country) {
    const countryUpdated_DB = getCookie('countryUpdated_DB');
    const email = getCookie('email');
    const accountType = getCookie('account');
    if (typeof countryUpdated_DB !== 'undefined' && typeof email !== 'undefined' && accountType !== 'credential') {
      if (countryUpdated_DB) {
        return;
      }
      await updateCountry(email.trim(), country);
    }
  }

  async function createRecommendedVideos() {
    const keyword = await getFirstKeyword()
    if (keyword) {
      const videos = await fetchVideos(keyword.trim())
      setRecommendedVideos(videos)
    } else {
      const cookiesKeywords = getCookie('keywords');
      if (!cookiesKeywords) {
        return
      }
      const keywordsArray = JSON.parse(cookiesKeywords);

      if (Array.isArray(keywordsArray) && keywordsArray.length > 0) {
        let finalKeyword = keywordsArray[0];
        const videos = await fetchVideos(finalKeyword.trim())
        setRecommendedVideos(videos)

      } else {
        console.log("No keywords available in cookies.");
        finalKeyword = null;
      }
    }

  }

  async function checkSubscribed_Channels_Pornstars_Creators() {



    const viewchannels = getViewChannels();
    const viewPornstars = getViewPornstars();
    const viewCreators = getViewCreators();



    if (viewchannels) {
      const combinedChannels = [...viewchannels, ...trendingChannels];

      const seen = new Set();

      // Filter out duplicates, keeping the first occurrence
      const uniqueChannels = combinedChannels.filter(channel => {
        if (seen.has(channel.channelName)) {
          return false; // Skip this channel if it's already seen
        } else {
          seen.add(channel.channelName); // Add to seen Set
          return true; // Keep this channel
        }
      });

      setTrendingChannels(uniqueChannels);
    }


    if (viewPornstars) {
      const combinedPornstars = [...viewPornstars, ...trendingPornstars];
      const seen = new Set();

      // Filter out duplicates, keeping the first occurrence
      const uniquePornstars = combinedPornstars.filter(pornstar => {
        if (seen.has(pornstar.pornstarName)) {
          return false; // Skip this channel if it's already seen
        } else {
          seen.add(pornstar.pornstarName); // Add to seen Set
          return true; // Keep this channel
        }
      });
      setTrendingPornstars(uniquePornstars);
    }

    if (viewCreators) {
      const combinedCreators = [...viewCreators, ...trendingCreators];
      const seen = new Set();

      // Filter out duplicates, keeping the first occurrence
      const uniqueCreators = combinedCreators.filter(creator => {
        if (seen.has(creator.creatorName)) {
          return false; // Skip this channel if it's already seen
        } else {
          seen.add(creator.creatorName); // Add to seen Set
          return true; // Keep this channel
        }
      });
      setTrendingCreators(uniqueCreators);
    }

  }




  useEffect(() => {
    let videoRoute = getCookie("videoRoute");
    if (typeof videoRoute !== 'undefined') {
      deleteCookie('videoRoute');
      router.push(videoRoute);
    }
    fetchLocation();
    createRecommendedVideos()

    checkSubscribed_Channels_Pornstars_Creators()
  }, []);





  const toggleViewType = () => {
    const newViewType = viewType === 'grid' ? 'horizontal' : 'grid';
    setViewType(newViewType);

  };

  return (
    <div className=" ">
      <Head>
        <title>Watch hot porn videos for free at CumCraze!</title>
        <meta name="description" content="Looking for free porn videos and exclusive XXX movies? Look no further than CumCraze. With instant streaming of over 6 million hardcore sex videos from both professionals and amateurs, our high-quality porn tube has everything you need to satisfy your desires. Whether you're looking for sensual solo scenes or wild group sex, CumCraze has it all. Join us now and start exploring our vast collection of adult content." />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
        <meta property="og:title" content="Watch hot porn videos for free at CumCraze!" />
        <meta property="og:description" content="Looking for free porn videos and exclusive XXX movies? Look no further than CumCraze. With instant streaming of over 6 million hardcore sex videos from both professionals and amateurs, our high-quality porn tube has everything you need to satisfy your desires. Whether you're looking for sensual solo scenes or wild group sex, CumCraze has it all. Join us now and start exploring our vast collection of adult content." />
        <link rel="canonical" href={`https://www.cumcraze.com/`} />

      </Head>



      <div className='flex justify-between items-center my-4 md:hidden basicMargin'>
        <span className='text-[20px]  font-semibold  font-inter '>Trending Channels</span>
        <img
          className='h-[20px] w-[20px] cursor-pointer sm:hidden'
          src={viewType === 'horizontal' ? './grid.png' : './horizontal.png'}
          onClick={toggleViewType}
          alt="Toggle View"
        />
      </div>
      <Channels_slider trendingChannels={TrendingChannels} />


      <div className="w-full overflow-x-auto whitespace-nowrap py-2 scrollbar-hide md:hidden select-none">
        {tags.map((tag, index) => (
          <Link legacyBehavior key={tag.tag} href={`/search/${tag.tag.trim()}`} passHref>
            <a className="bg-gray-200  text-semiblack px-3 py-1.5 rounded-lg m-1 ml-2 text-sm hover:bg-gray-300">
              {tag.tag}
            </a>
          </Link>
        ))}
      </div>

      <main className="flex-row flex  mt-1 md:mt-2 md:space-x-3">
        {/* <Sidebar /> */}
        <div className='w-full overflow-hidden'>
          <Header keyword={"trending"} pageNumber={"1"} />
          <Videos data={finalDataArray} />




          {recommendedVideos.length > 0 &&
            <div>
              <Homepage_Title title="Recommended Videos" />
              <Videos data={recommendedVideos.slice(0, 20)} />
              {/* <a href={`/upcoming`}>
                <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Upcoming Videos" />
              </a> */}
            </div>
          }

          {countryVideos.length !== 0 && (
            <>
              <div className="flex items-center space-x-2  basicMargin ">
                <Homepage_Title title={`Popular Porn Videos in ${currentLocation.countryCode}`} />

                <ReactCountryFlag
                  svg
                  countryCode={currentLocation.countryCode}
                  style={{
                    fontSize: '25px',
                    lineHeight: '25px',
                  }}
                  aria-label={currentLocation.countryCode}
                />
              </div>
              <Videos data={shuffle(countryVideos).slice(0, 12)} />
              <a href={`/search/${lang.toLowerCase().trim()}`}>
                <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-6 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Popular Porn Videos" />
              </a>
            </>
          )}

          <div className='md:hidden'>
            <Homepage_Title title="Trending Categories" />
            <Category_slider />
          </div>

          <div className='md:hidden'>
            <Homepage_Title title="Trending Pornstars" />
            <Pornstar_slider trendingPornstars={TrendingPornstars} />
          </div>



          {TrendingCreators.length != 0 &&
            <div className='md:hidden'>
              <Homepage_Title title="Trending Creators" />
              <Creators_slider trendingCreators={TrendingCreators} />
            </div>
          }

          <Pagination data={{ url: `/`, currentPageNumberURL: "1", pages: ["1", "58"] }} />


        </div>
      </main>



      <footer>
        <a href="https://www.fuckvideo.live/">.</a>
        <a href="https://www.chutlunds.com/">.</a>
        <a href="https://www.desikahaniya.in/">.</a>
        <BannerAds />

      </footer>
    </div>

  );
}

export async function getStaticProps({ req, res }) {
  const parcelData = { href: "https://spankbang.party/" };

  const API_URL = `https://chutlunds-api-usa.vercel.app/api/getHomePageVideos`;

  const rawResponse = await fetch(API_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(parcelData),
  });
  const ress = await rawResponse.json();
  var trendingCreators = []


  return {
    props: {
      finalDataArray: ress.result.finalDataArray,
      trendingChannels: ress.result.trendingChannels,
      trendingCreators: trendingCreators,
      tags: ress.result.tags,
      trendingPornstars: ress.result.trendingPornstars,
    },
  };
}
