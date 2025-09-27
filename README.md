<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# cst438proj1 -->

# Project 01 Retropsective and Overview - Trivia Categories Game

[Github Repo](https://github.com/Wei-HaiMing/cst438proj1)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Overview

Our project was creating a trivia game that makes use of the OpenAI API. 
When the user creates an account and signs in, they will be prompted to choose a category that has been made from the OpenAI API.
They'll be given 8 questions to answer. Once they answer, they can either play again, logout, or return to the homea page. 

## Introduction
Our team communicated through a Slack group chat.
We initially designed 16 issues. 
Right now, we have 27 issues that have been completed. 

## Team Retrospective
### Krishneet Raj
-Krishneet's pull requests are [here](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Apr%20state%3Aclosed%20author%3AkrishneetRAJ)
-Krishneet's issues are [here](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Aissue%20state%3Aopen%20author%3AkrishneetRAJ)
-**Role/Stories Worked on:** 
Krishneet worked on implementing the logout button, ensuring the database worked with persistent storage, and creating the signup page(user creation, password reset, and authentication against the local database). 
-**Biggest challenge:**
Getting persistent storage to work correctly with the signup/login system and getting used to working with Expo. Also writing unit tests was another big challenge I faced. 
-**Why it was a challenge:**
The integration between the database and authentication required debugging across multiple files. I didn't know how to work with React Native and Expo before, so this was a pretty big thing for me to learn quickly and to be able to implement it, which also involved writing the unit test. 
**Favorite / most interesting part:** 
Seeing the signup/login/logout flow work correctly with real stored data.  
**If I could do it over:** 
I would probably try to learn how to set up the unit tests earlier just so I didn't have to worry about it as much and could focus on other parts of the project. 
**Most valuable thing I learned:** 
How to manage state and persistent storage in a React Native and Expo project, and how authentication can be handled locally. This was my first time working with React Native, so it was a big learning experience.



---

## Conclusion
- **Project Success:** We set out to create a trivia categories game with account management, and we achieved that goal with working login, signup, trivia generation, and multiplayer.  
- **Largest Victory:** Integrating the OpenAI API and getting dynamic categories + questions running smoothly in the app. Also setting up the database was another big victory. 
- **Final Assessment:** The project was successful — we completed more issues than planned, and we were able to make a working trivia game with persistent storage and account management.  
