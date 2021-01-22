Welcome to mTaskApp!

This is a readme file, follow the steps carefully to run the project.

Assume that you have installed Expo app in your mobile device.

To run the app locally on your machine: 
0. Open terminal 
1. Cd into mTaskApp directory 
2. Npm install : to install dependencies
3. expo start : to start the app

4. Use your expo app on mobile device to scan the QR code.


To run the backend for the app locally:
1. Cd into mTaskBackend
2. Npm install
3. type 'nodemon app.js' in the terminal.

-------------
To run the app front end and backend locally you must do extra steps: 

4. Cd into mTaskApp directory, navigate src folder, go to Constants and globalVariables folder
5. Open the globalVar.js file, change the urlDomain to your localIP address and add port 19003. 
For example: http://xyz.xxx.x.x:19003/
6. Expo start the project again.
