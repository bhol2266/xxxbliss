import React from 'react';
import Link from 'next/link';
import channelsJSON from "@/JsonData/Channels.json";

function Channels_slider({ trendingChannels, trendingDataType }) {

    // Function to normalize channel names
    const normalizeName = (channelName) => channelName.toLowerCase().replace(/ /g, "_");

    // Get normalized channel names from trendingChannels
    const trendingChannelNames = trendingChannels.map(channel => normalizeName(channel.channelName));

    // Filter channelsJSON based on normalized trendingChannelNames


    const filteredChannels = channelsJSON.filter(channelObj => trendingChannelNames.includes(normalizeName(channelObj.channel_name)))
        .sort((a, b) =>
            trendingChannelNames.indexOf(normalizeName(a.channel_name)) -
            trendingChannelNames.indexOf(normalizeName(b.channel_name))
        );


    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden my-4 '>
            {filteredChannels.map(channelObj => {
                // Extract code and normalized channel name
                const code = channelObj.channel_href.substring(channelObj.channel_href.indexOf('/channel') - 2, channelObj.channel_href.indexOf('/channel')).toLowerCase();
                const normalizedChannelName = normalizeName(channelObj.channel_name);

                return (
                    <Link href={`/channels/${code}/${normalizedChannelName}`} key={channelObj.image_url}>
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img
                                    className='shadow-md rounded-full object-cover aspect-square'
                                    src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${normalizedChannelName}.jpg`}
                                    loading="lazy"
                                    alt={channelObj.channel_name}
                                />
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>
                                {channelObj.channel_name.toUpperCase()}
                            </h2>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Channels_slider;