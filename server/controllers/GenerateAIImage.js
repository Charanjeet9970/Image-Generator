import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateAIImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Step 1: Request image generation
    const generationResponse = await fetch(
      'https://api.lightxeditor.com/external/api/v1/text2image',
      {
        method: 'POST',
        headers: {
          'x-api-key': process.env.LAST_API,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ textPrompt: prompt })
      })

    const generationData = await generationResponse.json();
    console.log("Generation Data:", generationData);
    const payload = {
      "orderId": generationData?.body?.orderId
    };
    //const orderId = generationData?.body?.orderId; 
    console.log("Order ID:", payload);

    // Wait for a few seconds to allow image generation to complete
    await sleep(10000); // Adjust the delay as needed
    
    // Step 2: Check status (order-status requires the field to be exactly `orderId`)
    const statusResponse = await fetch(
      'https://api.lightxeditor.com/external/api/v1/order-status',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.LAST_API
        },
        body: JSON.stringify( payload ), 
      }
    );

    const statusData = await statusResponse.json();
    console.log("Status Data:", statusData);

    const imageUrl = statusData?.body?.output;
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString('base64')}`;
    res.status(200).json({ photo: base64Image });

  } catch (err) {
    console.error('Error generating image:', err);
    res.status(500).json({ message: 'Failed to generate image', error: err.message });
  }
//  const url = 'https://api.lightxeditor.com/external/api/v1/text2image';

// const data = {
//   "textPrompt": req.body // Replace with your specific input prompt
// };

// const options = {
// method: 'POST',
// headers: {
//     'Content-Type': 'application/json',
//     'x-api-key': process.env.LAST_API
// },
// body: JSON.stringify(data)
// };

// fetch(url, options)
// .then(response => {
//     if (!response.ok) {
//         throw new Error(`Request failed with status code ${response.status}`);
//     }
//     orderid = response.json();
//     orderId = orderid.body.orderId
//     console.log(orderId);
// })
// .then(data => {
//     console.log('Request was successful!');
//     console.log(data);
// })
// .catch(error => {
//     console.error('Error:', error);
// });

 
};




