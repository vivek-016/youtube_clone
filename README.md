# How to setup and run the app
To run the app you have to follow the below steps in order
1. Open the terminal and change the directory to the project folder.
2. check if you have nodeJs installed or not by using "node -v" command in terminal.
3. If you dont have node, install it.
4. Now, check if npm is installed by using "npm -v" command.
5. If npm is not there try to reinstall nodeJs as it comes with nodeJs.
6. After changing the directory to the project folder, use Command "npm install". It installs all the dependencies required for the project from package.json.
7. To use this app we neead mongoDB and react installed in your device.
8. npm install will install all the dependencies and dev dependencies from the package.json.
9. Now open another terminal and change directory to nodeJs folder to run the backend.
10. Use npm install again to download all the dependencies neccessary for running backend.
11. In backend terminal run the command "npm start" to connect to the backend.
12. Open project directory terminal and run the command "npm run dev" to start the react app.

# The features of the App

1. User registration and sign-In.
2. Watch uploaded Videos.
3. Upload your own Videos.
4. Edit your Video Details.
5. Create your channel to upload videos.
6. Comment to the videos.
7. Edit or Delete your comments
8. Cannot edit or delete other user's comments or videos.
9. Can access data only after Sign-in.

# How to use The app
* When you run the app on your pc on your own database, It is initially empty.
* SO, you have to register with a username, password and email and then Sign-in through that credentials.
* As there is no data in your data base no videos will be shown but that doesn't mean our project is not working we have to just fill the data in database.
* we have a mock data folder in utils use that data to upload videos through your channel.
* As soon as we signIn if we dont have channel, it will show us a button for creating a channel and if we have a channel, there will be a button to navigate to channel page.
* Create a channel and use the add videos button to add videos to the app.
* We can add videos to the database using channel. So, all the videos from different channels is stored in databse now.
* We can use different users to add videos from different channels.
* After uploading some videos we can see them in homepage. We can click on the video cards in homepage to open and play the video.
* The video page has a player playing the video and the list of comments.
* We can add comments to video using add comments button. comments will be added with your userName.
* We can add, delete and edit our comments but other users cannot change our comments.
* We can also modify the video details from channel page. 