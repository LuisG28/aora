import { Client, Account, ID, Avatars, Databases, Query} from 'react-native-appwrite';

export const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66e0b522001ced72fab7',
    databaseId: '66e0b6bf003dbe58bc22',
    userCollectionId: '66e0b6ec001bc733ddd3',
    videoCollectionId: '66e0b71600165515abd7',
    storageId: '66e10966002886690c87'
}

const { 
    endPoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endPoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email,
            password,
            username
        )
        if(!newAccount) throw Error;
        
        const avatarUrl = avatars.getInitials(username);
       
        await signIn(email, password)

        const newUser =  databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email,
                username,
                avatar : avatarUrl,
            },
        )

        return newUser;

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if(!currentAccount) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const getAllPost =async() => {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return post.documents;
    } catch (error) {
        throw new Error(error)
    }
}