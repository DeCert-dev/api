# DeCert API Documentation

  

The DeCert API allows users to simply mint non-transferable NFT certificates with a simple single and fast API

#### Install the required library
	npm install axios

#### Data to be sent to the API 
	 {
	 "name": "DeCertificate",
	 "description": "This is a test certificate for testing purposes dedicated to DeCert",
	 "validFrom": 1546300800,
	 "validTo": 1546300800,
	 "image": imageObject,
	 "recieversAddress": "0x...",
	 "type": 1
	}
#### Expected Output
	{
		"message": "Certificate Uploaded Successfully"
	}
## Example Code
    const axios = require('axios');
    const fs = require('fs');
    const image = fs.readFileSync('./3.jpeg');

    const body = {
        "name": "Certificate of Appreciation",
        "image": image,
        "description": "provided as a token of Appreciation",
        "validFrom": Date.now(),
        "validTo": -1,
        "recieversAddress": "0xF8FD64b9E74076FC2833c7de85fac6204390FA4A",
        "type": 2,
    }

    axios.post('https://api.decert.hackspiration.xyz/v1/upload',
        body, 
        {
            headers: {
            "Authorization": "Bearer 62324ec714797e008a8409e6",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    }
    ).then((res) => {
        console.log(res.data);
    }).catch(err => {
        console.log(err.message);
    })