import { ID, Query } from "appwrite";

import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";
import { account, appwriteConfig, databases, avatars, storage } from "./config";
import { log } from "console";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageURL: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageURL: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    console.log(currentAccount);

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedfile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedfile;
  } catch (error) {
    console.log(error);
  }
}

export async function getFilePreview(fileId: string) {
  try {
    const file = await storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    const file = await storage.deleteFile(appwriteConfig.storageId, fileId);
    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    const uploadedfile = await uploadFile(post.file[0]);

    if (!uploadedfile) throw Error;
    const fileUrl = getFilePreview(uploadedfile.$id);

    if (!fileUrl) {
      deleteFile(uploadedfile.$id);
      throw new Error();
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        userId: post.userId,
        caption: post.caption,
        imageId: uploadedfile.$id,
        imageURL: fileUrl,
        location: post.location,
        tags,
      }
    );

    if (!newPost) {
      deleteFile(uploadedfile.$id);
      throw new Error();
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}
