const { Web3Storage, File } = require('web3.storage');
const { callContract } = require('./contactChain');
const Certificates = require('./../schema/certificates');
require('dotenv').config();

// Created a unique uid for the file name.
function uid() {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substring(2);
    return head + tail;
}

/**
 * 
 * @returns {Promise<string>}
 * @description Returns the web3.storage client.
 */
function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEBSTORAGE });
}

/**
 * 
 * @param {Web3Storage} client 
 * @param {string} rootCid 
 * @param {json} body 
 * @param {Date} now
 * @schema body -> {
 *  name: string,
 *  description: string,
 *  validFrom: number,
 *  validTo: number,
 *  recieversAddress: string
 * }
 * @returns {Promise<void>}
 * @description Creates a json object from the body and calls the smart contract function.
 */
async function uploadJson(client, rootCid, body, now, fileName){
    const jsonToUpload = {
        name: body.name,
        description: body.description,
        validFrom: body.validFrom,
        validTo: body.validTo,
        image: `ipfs://${rootCid}/${fileName}.png`
    };
    const saveCertifiate = new Certificates({
        name: body.name,
        address: body.recieversAddress,
        date: `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`,
        email: body.email
    });
    const files = [new File([JSON.stringify(jsonToUpload)], `${now}.json`)];
    await Promise.all([
        client.put(files, {
            name: `Json ${now}`,
            onRootCidReady: (rootCid) => {
                callContract(rootCid, now, body.type, body.recieversAddress);
            }
        }),
        saveCertifiate.save()
    ]).catch((err) => {
        console.log(err)
    })
    
}

/**
 * 
 * @param {json} body
 * @schema body -> {
 *  name: string,
 *  image: buffer,
 *  description: string,
 *  validFrom: number,
 *  validTo: number,
 *  recieversAddress: string,
 *  type: string
 * }
 * @returns {Promise<void>}
 * @description Uploads a file to the ipfs server in filecoin. (web3.storage)
 */
async function uploadCertificate(body){
    const fileName = uid();
    const now = new Date()
    const client = makeStorageClient();
    const binary = Buffer.from(body.image);
    const files = [new File([binary], `${fileName}.png`)];
    await client.put(files, {
        name: `Image ${now}`,
        onRootCidReady: (rootCid) => {
            uploadJson(client, rootCid, body, now, fileName);
        },
    }).catch((err) => {
        console.log(err);
    })
};

module.exports = {
    uploadCertificate: uploadCertificate
};