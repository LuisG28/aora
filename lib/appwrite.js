import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

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
const storage = new Storage(client);

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
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return post.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getLastestPost =async() => {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return post.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPost = async(query) => {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return post.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserPost = async(userId) => {
    try {
        const post = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        )
        return post.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async() => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async(fileId, type) => {
    let fileUrl;

    try {
        if (type === 'video') { 
            fileUrl = await storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = await storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
    
}

export const uploadFile = async(file, type) => {
    if(!file) return;
    const asset = {
        name : 'nane',
        type : file.mimeType,
        size: file.fileSize,
        uri : file.uri,
    };
    
    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        const [
            thumbnailUrl,
            videoUrl,
        ] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title, 
                prompt : form.prompt,
                creator: form.userId,
                video : videoUrl,
                thumbnail : thumbnailUrl,
            }
        )
        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}