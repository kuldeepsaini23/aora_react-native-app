import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kuldeep.aora",
  projectId: "661be4f110544827056c",
  databaseId: "661be81a60461b974d10",
  userCollectionId: "661be83228ca28c48200",
  videoCollectionId: "661be849a0b4c5c9bdc9",
  storageId: "661be972e20c2a7aaa20",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (username, email, password) => {
  // Register User
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) {
      throw new Error("User not created");
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log("ERROR IN SIGN-UP",error);
    return null
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    console.log(session);
    return session;
  } catch (error) {
    console.log("ERROR IN SIGN-IN",error);
    throw new Error(error);
  }
}
