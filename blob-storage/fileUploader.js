require('dotenv/config');
const fs = require('fs');
const { BlobServiceClient } = require('@azure/storage-blob');

const uploadFile = async (containerName, fileName) => {
    const file = fs.readFileSync('./files/'+fileName);
    
    if (!file) return;

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    blockBlobClient.upload(file, file.length).then(data => console.log(data)).catch(err => console.log(err));
}
