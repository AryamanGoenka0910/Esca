import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.Surgo.Esca',
    projectId: '66adc4db0030c240aeb3',
    databseId: '66adc600000b4428ba3c',
    userCollectionId: '66adc6190030233e3522',
    restaurantsCollectionId: '66adc648003896b7f6bc',
    waitlistCollectionId: '66b44c4f0008409fa735',
    storeageId: '66adc7e9002f94e4cc01'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export const createUser = async (email, password, username) => {
   try {

    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )
    // auth new user
    
    if(!newAccount){
        throw Error
    }

    // if everything is good create generic avatar
    const avatarUrl = avatars.getInitials(username) // special appwrite func to get avatar with initials

    //sign them in
    await signIn(email, password)
    

    //create new db instance of the User :))
    const newUser = await databases.createDocument(appwriteConfig.databseId, appwriteConfig.userCollectionId, ID.unique(), {
        acountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
    })

    return newUser

   } catch (error) {
    console.log(error)
    throw new Error(error)
   }

}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
    } catch (error) {
        throw new Error(error)
    }
}

export const getAccount = async () => {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

export const getCurrentUser = async () => {
    try {

      const currentAccount = await getAccount();

      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databseId,
        appwriteConfig.userCollectionId,
        [Query.equal("acountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments( 
            appwriteConfig.databseId, 
            appwriteConfig.restaurantsCollectionId
        )

        return posts.documents

    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments( 
            appwriteConfig.databseId, 
            appwriteConfig.restaurantsCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents

    } catch (error) {

        throw new Error(error);
    }
}

export const getRes = async (resID) => {
  try {
    
    const document = await databases.getDocument(
      appwriteConfig.databseId,
      appwriteConfig.restaurantsCollectionId,
      resID
    )
    console.log(`Status 200: ${document.$id}`)

    return document;
  } catch (error) {
    throw new Error(error);
  }
}

export const addWaitlist = async (price, status, restaurantID, size, user) => {
  try {

    console.log("Awaiting Log")

    const waitlistItem = await databases.createDocument(
      appwriteConfig.databseId,
      appwriteConfig.waitlistCollectionId,
      ID.unique(),
      {
        price: price,
        status: status,
        restaurantID: restaurantID,
        size: size,
        users: user
      }
    )

    console.log(`Status 200: Waitlist item created successfully with ID: ${waitlistItem.$id}`);
    
    const waitlistItemId = waitlistItem.$id;

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databseId,
      appwriteConfig.userCollectionId,
      user,  // ID of the user
      {
        waitlist: waitlistItemId,
      }
    );

    // Step 2: Retrieve the current restaurant document
    const restaurant = await databases.getDocument(
      appwriteConfig.databseId,
      appwriteConfig.restaurantsCollectionId,
      restaurantID
    );

    const updatedWaitlist = [...restaurant.waitlist, waitlistItemId];

    // Step 3: Update the restaurant document with the new waitlist array
    await databases.updateDocument(
      appwriteConfig.databseId,
      appwriteConfig.restaurantsCollectionId,
      restaurantID,
      {
        waitlist: updatedWaitlist
      }
    );
    
    console.log(`Status 200: Waitlist successfully edited for res with ID: ${restaurantID}`);
    return waitlistItem;

  } catch (error) {
    throw new Error(error);
  }
}

export const getWaitListItem = async (waitlistID) => {
  try {
    
    const waitlist = await databases.getDocument(
      appwriteConfig.databseId,
      appwriteConfig.waitlistCollectionId,
      waitlistID
    );

    return waitlist;

  } catch (error) {
    throw new Error(error);
  }
}

export const deleteWaitListItem = async (restaurantID, waitlistID) => {
  try {
    
    const result = await databases.deleteDocument(
      appwriteConfig.databseId, // databaseId
      appwriteConfig.waitlistCollectionId,
      waitlistID
    ); 

    console.log(`Status 200: Waitlist item deleted successfully with ID: ${waitlistID}`);
    
    // Step 2: Retrieve the current restaurant document
    const restaurant = await databases.getDocument(
      appwriteConfig.databseId,
      appwriteConfig.restaurantsCollectionId,
      restaurantID
    );

    const updatedWaitlist = restaurant.waitlist.filter(id => id !== waitlistID);

    // Step 3: Update the restaurant document with the new waitlist array
    await databases.updateDocument(
      appwriteConfig.databseId,
      appwriteConfig.restaurantsCollectionId,
      restaurantID,
      {
        waitlist: updatedWaitlist
      }
    );
    
    console.log(`Status 200: Waitlist successfully edited for res with ID: ${restaurantID}`);
    return;

  } catch (error) {
    throw new Error(error);
  }
}

// Book Mark Functions for Users

export const addToBookMarks = async (userID, restaurantID) => {
  try {

    
    
  } catch (error) {
    throw new Error(error);
  }
}