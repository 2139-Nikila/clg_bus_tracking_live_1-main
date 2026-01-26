College Bus Tracking System – Setup & Run Guide
This project is a Node.js + Express web application that serves a live bus tracking website using HTML, CSS, and JavaScript.
Follow the steps below to run the project locally using VS Code.

**Prerequisites**
Make sure the following are installed on your system:
Node.js (v16 or above)
👉 https://nodejs.org
VS Code
👉 https://code.visualstudio.com
Git (optional, for cloning)

**Step 1: Open the Project in VS Code**
Open VS Code
Click File → Open Folder
Select the project folder: clg_bus_tracking_live_1-main

**Step 2: Install Dependencies**
Run the following command in the terminal: npm install
This will install all required Node.js packages listed in package.json.

**Step 3: Start the Server**
Run the server using: node app.js
If the server starts successfully, you will see a message like: Server running on port 3000 (or another port as mentioned in app.js)

**Run the Project Using ngrok**
To make the website accessible over the internet:
Download and install ngrok
👉 https://ngrok.com
Authenticate ngrok (one-time setup): ngrok config add-authtoken YOUR_AUTH_TOKEN
Start ngrok on the same port: ngrok http 3000
Use the generated public URL to access the website online.
