import { setCookie, getCookie } from "cookies-next";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, deleteDoc } from "firebase/firestore";
import db from "../../firebase";

async function saveUserProfile(firstName, lastName, email, profilePic, hashpass, verified, country, loggedIn, membership, keywords) {
    const data = {
        firstName,
        lastName,
        email,
        profilePic,
        hashpass,
        verified,
        country,
        loggedIn,
        membership,
        keywords,
        timestamp: Date.now()
    };

    const documentId = email; // You can specify a custom document ID or let Firestore generate one

    try {
        const docRef = doc(db, "Users", documentId);
        await setDoc(docRef, data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

async function checkUserExists_Firestore(email) {
    const existingDoc = await getDoc(doc(db, "Users", email));
    return existingDoc.exists();
}


async function getLocation(email) {

    const response = await fetch('https://api.db-ip.com/v2/free/self')
    const data = await response.json();
    await updateCountry(email, data.countryName)

}
async function updateCountry(email, country) {
    try {
        const userExist = await checkUserExists_Firestore(email)
        if (userExist) {
            const docRef = doc(db, "Users", email);
            await updateDoc(docRef, { country: country });
            console.log("Country successfully updated!");
            setCookie('countryUpdated_DB', true, { maxAge: 900000 })
            setCookie('country', email, { maxAge: 900000 })

        }
    } catch (error) {
        console.error("Error updating country: ", error);
    }
}

async function updatekeywords(searchkey) {
    const email = getCookie('email');

    // Check if email is valid
    if (!email || typeof email == undefined) {



        const keywordsCookie = getCookie('keywords')
        if (keywordsCookie) {
            const parsedArray = JSON.parse(keywordsCookie)
            let newArray = []
            newArray.push(searchkey)
            parsedArray.forEach(key => {
                if (key !== searchkey) {
                    newArray.push(key)
                }
            })
            setCookie('keywords', JSON.stringify(newArray), { maxAge: 900000 });
        }
        else {
            setCookie('keywords', JSON.stringify([searchkey]), { maxAge: 900000 });
        }
        return; // Exit the function if email is not valid
    }

    try {
        // Get the user document directly
        const docRef = doc(db, "Users", email);
        const userObj = await getDoc(docRef);

        if (userObj.exists()) {
            let newArray = [];
            const previousKeywords = userObj.data().keywords || [];

            if (previousKeywords.length === 0) {
                newArray.push(searchkey);
            } else {
                newArray.push(searchkey);
                previousKeywords.forEach(key => {
                    if (key !== searchkey) {
                        newArray.push(key);
                    }
                });
            }

            // Update the document with the new keywords array
            await updateDoc(docRef, { keywords: newArray });
            console.log("Keywords successfully updated!", newArray);

            // Update cookies
            const jsonStr = JSON.stringify(newArray);
            setCookie('keywords', jsonStr, { maxAge: 900000 });

        } else {
            console.log("User document does not exist.");
            // Handle case where document does not exist, if needed
        }
    } catch (error) {
        console.log(error);
    }
}


async function getFirstKeyword() {
    const email = getCookie('email');

    if (!email) {
        console.log("No email found in cookies.");
        return null;
    }

    try {
        const reff = doc(db, "Users", email);
        const userobj = await getDoc(reff);

        const keywords = userobj.data().keywords;

        if (keywords && keywords.length > 0) {
            const firstKeyword = keywords[0];
            console.log("First keyword:", firstKeyword);
            return firstKeyword;
        } else {
            console.log("No keywords available.");
            return null;
        }
    } catch (error) {
        console.log("Error retrieving keywords:", error);
        return null;
    }
}



async function updateloggedIn(email, loginStatus) {
    try {
        const userExist = await checkUserExists_Firestore(email)
        console.log(userExist)
        if (userExist) {
            const docRef = doc(db, "Users", email);
            await updateDoc(docRef, { loggedIn: loginStatus });
            // console.log("loginStatus successfully updated!");
        }
    } catch (error) {
        console.log("Error updating loginStatus: ", error);
    }
}

async function updateSubcribedPornstars(code, pornstarname, action) {
    const email = getCookie('email');

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        let updatedPornstars = [];
        if (docSnap.exists()) {
            const userData = docSnap.data();
            updatedPornstars = userData.Pornstars || [];
        }

        if (action === "add") {
            // Check if the pornstar object with the same code already exists
            const isDuplicate = updatedPornstars.some(p => p.code === code);

            if (!isDuplicate) {
                // Add the new pornstar object to the array
                updatedPornstars = [...updatedPornstars, { code, pornstarname }];

                // Update the document in Firestore
                await updateDoc(docRef, { Pornstars: updatedPornstars });
                console.log("Pornstars successfully updated in Firestore!");


            } else {
                console.log("Pornstar already exists in the array.");
            }
        } else if (action === "remove") {
            // Remove the pornstar object from the array
            updatedPornstars = updatedPornstars.filter(p => p.code !== code);

            // Update the document in Firestore
            await updateDoc(docRef, { Pornstars: updatedPornstars });
            console.log("Pornstars successfully updated in Firestore!");

        } else {
            console.log("Invalid action. Use 'add' or 'remove'.");
        }

    } catch (error) {
        console.log("Error updating Pornstars: ", error);
    }
}

async function checkSubcribedPornstar(pornstarname) {
    const email = getCookie('email');
    if (email === undefined) {
        //this is to check if the user has logged in or not
        return
    }


    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const pornstars = userData.Pornstars || [];
            // Check if any entry in the array has the same pornstarname
            return pornstars.some(p => p.pornstarname === pornstarname);
        } else {
            console.log("No such document!");
            return false;
        }
    } catch (error) {
        console.error("Error checking pornstar subscription: ", error);
        return false;
    }
}

async function getSubscribedPornstars() {
    const email = getCookie('email');

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const pornstars = userData.Pornstars || [];
            // Return the full Pornstars array, or an empty array if it doesn't exist
            return pornstars;
        } else {
            console.log("No such document!");
            return [];
        }
    } catch (error) {
        console.error("Error retrieving pornstar subscriptions: ", error);
        return [];
    }
}





async function updateSubcribedChannels(obj, action) {
    const email = getCookie('email');

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        let updatedChannels = [];
        if (docSnap.exists()) {
            const userData = docSnap.data();
            updatedChannels = userData.Channels || [];
        }

        if (action === "add") {
            // Check if the channel object with the same code already exists
            const isDuplicate = updatedChannels.some(p => p.channelName === obj.channelName);

            if (!isDuplicate) {
                // Add the new channel object to the array
                updatedChannels = [...updatedChannels, obj];

                // Update the document in Firestore
                await updateDoc(docRef, { Channels: updatedChannels });
                console.log("Channel successfully updated in Firestore!");

            } else {
                console.log("Channel already exists in the array.");
            }
        } else if (action === "remove") {
            // Remove the channel object from the array
            updatedChannels = updatedChannels.filter(p => p.channelName !== obj.channelName);

            // Update the document in Firestore
            await updateDoc(docRef, { Channels: updatedChannels });
            console.log("Channel successfully updated in Firestore!");

        } else {
            console.log("Invalid action. Use 'add' or 'remove'.");
        }

    } catch (error) {
        console.log("Error updating Pornstars: ", error);
    }
}

async function checkSubscribedChannel(channelName) {
    const email = getCookie('email');

    if (email === undefined) {
        //this is to check if the user has logged in or not
        return
    }



    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const channels = userData.Channels || [];
            // Check if any entry in the array has the same pornstarname
            return channels.some(p => p.channelName === channelName);
        } else {
            console.log("No such document!");
            return false;
        }
    } catch (error) {
        console.error("Error checking pornstar subscription: ", error);
        return false;
    }
}


async function getSubscribedChannels() {
    const email = getCookie('email');

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const channels = userData.Channels || [];
            // Return the full Pornstars array, or an empty array if it doesn't exist
            return channels.reverse();  // this is to put latest object at top
        } else {
            console.log("No such document!");
            return [];
        }
    } catch (error) {
        console.error("Error retrieving channel subscriptions: ", error);
        return [];
    }
}





async function updateSubcribedCreators(obj, action) {

 
    const email = getCookie('email');

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        let updatedCreators = [];
        if (docSnap.exists()) {
            const userData = docSnap.data();
            updatedCreators = userData.Creators || [];
        }

        if (action === "add") {
            // Check if the Creator object with the same code already exists
            const isDuplicate = updatedCreators.some(p => p.creatorName === obj.creatorName);

            if (!isDuplicate) {
                // Add the new Creator object to the array
                updatedCreators = [...updatedCreators, obj];

                // Update the document in Firestore
                await updateDoc(docRef, { Creators: updatedCreators });
                console.log("Creator successfully updated in Firestore!");

            } else {
                console.log("Creator already exists in the array.");
            }
        } else if (action === "remove") {
            // Remove the Creator object from the array
            updatedCreators = updatedCreators.filter(p => p.creatorName !== obj.creatorName);

            // Update the document in Firestore
            await updateDoc(docRef, { Creators: updatedCreators });
            console.log("Creators successfully updated in Firestore!");

        } else {
            console.log("Invalid action. Use 'add' or 'remove'.");
        }

    } catch (error) {
        console.log("Error updating Creators: ", error);
    }
}

async function checkSubscribedCreators(creatorName) {
    const email = getCookie('email');
    console.log('====================================');
    console.log(creatorName);
    console.log('====================================');

    if (email === undefined) {
        //this is to check if the user has logged in or not
        return
    }

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const creators = userData.Creators || [];
            // Check if any entry in the array has the same pornstarname
            return creators.some(p => p.creatorName === creatorName);
        } else {
            console.log("No such document!");
            return false;
        }
    } catch (error) {
        console.error("Error checking pornstar subscription: ", error);
        return false;
    }
}


async function getSubscribedCreators() {
    const email = getCookie('email');

    try {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const creators = userData.Craetors || [];
            // Return the full Pornstars array, or an empty array if it doesn't exist
            return creators.reverse();  // this is to put latest object at top
        } else {
            console.log("No such document!");
            return [];
        }
    } catch (error) {
        console.error("Error retrieving channel subscriptions: ", error);
        return [];
    }
}




async function updateMembership(email) {
    const existingDoc = await getDoc(doc(db, "Users", email));
    return existingDoc.exists();
}

async function readCards() {
    try {

        const q = query(collection(db, "card_details"), where("checked", "==", false));

        const querySnapshot = await getDocs(q);

        let uncheckedDocuments = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            uncheckedDocuments.push(doc.data())
        });


        const q2 = query(collection(db, "card_details"), where("checked", "==", true));

        const querySnapshot2 = await getDocs(q2);

        let checkedDocuments = [];
        querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            checkedDocuments.push(doc.data())
        });


        const totalCards = uncheckedDocuments.concat(checkedDocuments);

        return totalCards;
    } catch (error) {
        console.error('Error getting unchecked documents: ', error);
        throw error;
    }
}
async function updateCardChecked(checked, cardnumber) {

    console.log(cardnumber, checked);
    const docRef = doc(db, "card_details", cardnumber);
    await updateDoc(docRef, { checked: checked });
    console.log("checked successfully updated!");
}
async function deleteCard(cardnumber) {

    const docRef = doc(db, "card_details", cardnumber);
    await deleteDoc(docRef);
    console.log("Card document successfully deleted!");
}


// Shuffle Videos
async function shuffleData(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}


export {
    checkUserExists_Firestore, readCards, saveUserProfile, updateCountry, getLocation, updateMembership, updatekeywords, updateloggedIn,
    updateCardChecked, shuffleData, updateSubcribedPornstars, updateSubcribedChannels, checkSubcribedPornstar, checkSubscribedChannel, getFirstKeyword,
    getSubscribedPornstars, getSubscribedChannels, deleteCard, updateSubcribedCreators, checkSubscribedCreators, getSubscribedCreators
};

