import { Client, Account, ID, Avatars, Databases} from 'react-native-appwrite';

export const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66e0b522001ced72fab7',
    databaseId: '66e0b6bf003dbe58bc22',
    userCollectionId: '66e0b6ec001bc733ddd3',
    videoCollectionId: '66e0b71600165515abd7',
    storageId: '66e10966002886690c87'
}

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

