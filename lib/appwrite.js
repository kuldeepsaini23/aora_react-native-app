
import { Account, Client } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform : 'com.kuldeep.aora',
  projectId:'661be4f110544827056c',
  databaseId:'661be81a60461b974d10',
  userCollectionId : '661be83228ca28c48200',
  videoCollectionId : '661be849a0b4c5c9bdc9',
  storageId:'661be972e20c2a7aaa20'
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
export const createUser = () => {
// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}


