// utils/cookies.js
import { setCookie, destroyCookie, getCookie } from 'cookies-next';


export const getViewTypeFromCookie = () => {
    const viewType = getCookie('viewType');
    return viewType ? viewType : 'grid';       //default is grid 
};


export const setViewTypeCookie = (value) => {
    setCookie('viewType', value, { maxAge: 60 * 60 * 24 * 365 }); // Set cookie with expiry of 7 days
};

export const removeViewTypeCookie = () => {
    destroyCookie('viewType');
};


export const formatDuration = (duration) => {
    const minutes = parseInt(duration.replace('m', ''), 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};


export async function fetchVideos(key) {
    // key is also langugae for country videos
    let url = `https://spankbang.party/s/${key.toLowerCase().trim()}/?o=trending`;
    const rawResponse = await fetch('/api/spangbang/getvideos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });
    const content = await rawResponse.json();
    return (shuffle(content.finalDataArray));
}


export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}




export function updateViewChannels_Cookie(channel_obj) {
    // Retrieve existing viewChannels from the cookie or initialize it as an empty array
    let viewChannels = getCookie('viewChannels');

    // If viewChannels is undefined or null, initialize it as an empty array
    if (!viewChannels) {
        viewChannels = [];
    } else if (typeof viewChannels === 'string') {
        // If viewChannels is a string (due to the way cookies are stored), parse it into an array
        viewChannels = JSON.parse(viewChannels);
    }

    // If channel_obj is provided
    if (channel_obj) {
        // Find the index of the channel object with the same channel_name
        const existingIndex = viewChannels.findIndex(ch => ch.channelName === channel_obj.channelName);

        if (existingIndex !== -1) {
            // If the channel already exists, remove it from its current position
            viewChannels.splice(existingIndex, 1);
        }

        // Add the new channel object to the beginning of the array
        viewChannels.unshift(channel_obj);
    }

    // Save the updated viewChannels array back to the cookie
    setCookie('viewChannels', JSON.stringify(viewChannels));
}




export function getViewChannels() {
    // Retrieve viewChannels from the cookie
    let viewChannels = getCookie('viewChannels');

    // If viewChannels is undefined or null, initialize it as an empty array
    if (!viewChannels) {
        viewChannels = [];
    } else if (typeof viewChannels === 'string') {
        // If viewChannels is a string (due to the way cookies are stored), parse it into an array
        viewChannels = JSON.parse(viewChannels);
    }

    return viewChannels
}

export function updateViewCreators_Cookie(creatorData) {
    // Retrieve existing viewChannels from the cookie or initialize it as an empty array
    let viewCreators = getCookie('viewCreators');

    // If viewChannels is undefined or null, initialize it as an empty array
    if (!viewCreators) {
        viewCreators = [];
    } else if (typeof viewCreators === 'string') {
        // If viewChannels is a string (due to the way cookies are stored), parse it into an array
        viewCreators = JSON.parse(viewCreators);
    }

    // If creatorData is provided
    if (creatorData) {
        // Find the index of the channel object with the same channel_name
        const existingIndex = viewCreators.findIndex(ch => ch.creatorName === creatorData.creatorName);

        if (existingIndex !== -1) {
            // If the channel already exists, remove it from its current position
            viewCreators.splice(existingIndex, 1);
        }

        // Add the new channel object to the beginning of the array
        viewCreators.unshift(creatorData);
    }

    // Save the updated viewChannels array back to the cookie
    setCookie('viewCreators', JSON.stringify(viewCreators));
}

export function getViewCreators() {
    // Retrieve viewCreators from the cookie
    let viewCreators = getCookie('viewCreators');

    // If viewCreators is undefined or null, initialize it as an empty array
    if (!viewCreators) {
        viewCreators = [];
    } else if (typeof viewCreators === 'string') {
        // If viewCreators is a string (due to the way cookies are stored), parse it into an array
        viewCreators = JSON.parse(viewCreators);
    }

    return viewCreators
}




export function updateViewPornstars_Cookie(pornstar_obj) {
    // Retrieve existing viewPornstars from the cookie or initialize it as an empty array
    let viewPornstars = getCookie('viewPornstars');

    // If viewPornstars is undefined or null, initialize it as an empty array
    if (!viewPornstars) {
        viewPornstars = [];
    } else if (typeof viewPornstars === 'string') {
        // If viewPornstars is a string (due to the way cookies are stored), parse it into an array
        viewPornstars = JSON.parse(viewPornstars);
    }

    // If pornstar_obj is provided
    if (pornstar_obj) {
        // Find the index of the pornstar object with the same channel_name
        const existingIndex = viewPornstars.findIndex(ch => ch.pornstarName === pornstar_obj.pornstarName);

        if (existingIndex !== -1) {
            // If the channel already exists, remove it from its current position
            viewPornstars.splice(existingIndex, 1);
        }

        // Add the new pornstar object to the beginning of the array
        viewPornstars.unshift(pornstar_obj);
    }

    // Save the updated viewChannels array back to the cookie
    setCookie('viewPornstars', JSON.stringify(viewPornstars));
}


export function getViewPornstars() {
    // Retrieve viewPornstars from the cookie
    let viewPornstars = getCookie('viewPornstars');

    // If viewPornstars is undefined or null, initialize it as an empty array
    if (!viewPornstars) {
        viewPornstars = [];
    } else if (typeof viewPornstars === 'string') {
        // If viewPornstars is a string (due to the way cookies are stored), parse it into an array
        viewPornstars = JSON.parse(viewPornstars);
    }

    return viewPornstars
}
