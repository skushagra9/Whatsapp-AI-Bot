<p align="center" style="margin-top: 120px">

  <h3 align="center">Whatsapp AI Bot</h3>

  <p align="center">
   Chat With Whatsapp Like Gemini
</p>

## About Whatsapp-AI 🏓

Whatsapp-AI-Bot is a chat-bot same like chat-gpt

## Contact me 💌

If you want to learn more about this project or have any questions, send me an email at (mailto:skushagra.sharma@gmail.com)
<br/><br/>

## Built with 🛠️

- [TypeScript]
- [Gemini]
- [Twilio]

## Demo

https://github.com/skushagra9/Whatsapp-AI-Bot/assets/120712705/366f3263-f23e-404f-a9a1-fef6176b17c6


## Getting Started 🚀

### Requirements

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [npm](https://npm.io/) 

### Setup

1. Clone the repository

   ```sh
   git clone https://github.com/skushagra9/Whatsapp-AI-Bot.git
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Set up your .env file

   `cp .env.example .env`

4. Setup the env Variables 
  Create your google gemini key, twillio account sid and auth token.

5. Run the server
   ```sh
    yarn tsc
    node dist/index.js
   ```
6.Install ngork from https://ngrok.com/docs/getting-started/

7. Open another Terminal and run
   `ngrok http 3000`
    copy the link for the locally hosted server and paste in the twilio app 
    Open Your App> Develop > Messaging > Try It Ouy > Send a Whatsapp message > Go to the sandbox settings > paste the link on the demolink space
