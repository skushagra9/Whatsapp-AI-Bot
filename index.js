import express from "express";
import twilio from 'twilio';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

let chat; // External variable to store chat session

async function run(message) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        if (!chat) {
            // If chat session doesn't exist, create a new one
            chat = model.startChat({
                generationConfig: {
                    maxOutputTokens: 50,
                },
            });
        }

        if (message.toLowerCase() === 'clear') {
            // Handle "clear" command
            console.log("Chat history cleared.");
            // Send a Twilio message indicating that the history is cleared
            client.messages.create({
                body: "Chat history cleared.",
                from: process.env.MY_TWILIO_NUM,
                to: process.env.MY_PERSONAL_NUM
            });

            // Reset chat session after clearing history
            chat = null;
        } else {
            // Check if the message is not empty
            if (message.trim()) {
                const result = await chat.sendMessage(message);
                const response = await result.response;
                const text = response.text();

                console.log("Message:", message);
                console.log("Google Generative AI Response:", response);

                // Check if text is empty or undefined before sending the Twilio message
                if (text) {
                    console.log("Generated Text:", text);

                    // Send Twilio message
                    client.messages.create({
                        body: text,
                        from: process.env.MY_TWILIO_NUM,
                        to: process.env.MY_PERSONAL_NUM
                    });
                } else {
                    console.error("It gives error for max tokens, you will need to");
                }
            } else {
                console.log("Empty message. Ignoring.");
            }
        }
    } catch (error) {
        console.error("Error in run function:", error);
    }
}

app.post('/', async (req, res) => {
    try {
        const { body } = req;
        const message = body.Body;
        await run(message);
        res.status(200).end();
    } catch (error) {
        console.error("Error in POST handler:", error);
        res.status(500).send("Internal Server Error");
    }
});





app.listen(port, () => console.log(`Express app running on port ${port}!`));
