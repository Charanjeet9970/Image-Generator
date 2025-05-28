import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textPrompt: prompt }),
      }
    );

    const generationData = await generationResponse.json();
    console.log("Generation Data:", generationData);

    const orderId = generationData?.body?.orderId; // Corrected from `orderID`

    if (!orderId) {
      throw new Error('Failed to retrieve order ID from LightX response.');
    }
    await sleep(10000);

    // Step 2: Check status (order-status requires the field to be exactly `orderId`)
    const statusResponse = await fetch(
      'https://api.lightxeditor.com/external/api/v1/order-status',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.LAST_API,
        },
        body: JSON.stringify({ orderId }), // ✅ correct field name
      }
    );

    const statusData = await statusResponse.json();
    console.log("Status Data:", statusData);

    const imageUrl = statusData?.body?.output;
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.buffer();
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    res.status(200).json({ photo: base64Image });

  } catch (err) {
    console.error('Error generating image:', err);
    res.status(500).json({ message: 'Failed to generate image', error: err.message });
  }
};