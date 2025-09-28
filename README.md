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
Our team communicated through a Slack group chat, along with a sms group chat.
We initially designed 16 issues. 
Right now, we have 36 issues that have been completed. 

## Team Retrospective

### Micah Heneveld

- Micah's pull requests are [here](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Apr%20state%3Aclosed%20author%3AMicahHeneveld)

- Micah's issues are [here](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Aissue%20state%3Aclosed%20author%3AMicahHeneveld)

- **Role/Stories Worked on:** 
I first worked on setting up the landing page and getting the OpenAI API implemented into the project.  I then worked with Yegor to put together the gameplay element of the project.  Lastly, I implemented the project's multiplayer functionality.

- **Biggest challenge:**
Working effectively as a team.

- **Why it was a challenge:**
I had a fantastic team, and we all communicated well.  But collaborating on a four man team was still the most challenging part for me.  I am used to working on a one or two man team, so working on a four man team required me to change up my regular work flow.

- **Favorite / most interesting part:** 
Haha playing trivia against myself!  And setting up the multiplayer.  I have never done anything like multiplayer before, so I followed an online tutorial on how to implement Supabase's real time subscription functionality.  The tutorial couldn't be applied exactly to the project, so it required alot of thinking to figure out how data was going to be shared between the two players.

- **If I could do it over:** 
I am not sure... I think I did the best I could so I wouldn't change anything!

- **Most valuable thing I learned:** 
The experience I had working on a team, and how to work with Supabase's real time subscription.


### Krishneet Raj
- Krishneet's pull requests are [here](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Apr%20state%3Aclosed%20author%3AkrishneetRAJ)

- Krishneet's issues are [here](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Aissue%20state%3Aopen%20author%3AkrishneetRAJ)

- **Role/Stories Worked on:** 
Krishneet worked on implementing the logout button, ensuring the database worked with persistent storage, and creating the signup page(user creation, password reset, and authentication against the local database). 

- **Biggest challenge:**
Getting persistent storage to work correctly with the signup/login system and getting used to working with Expo. Also writing unit tests was another big challenge I faced. 

- **Why it was a challenge:**
The integration between the database and authentication required debugging across multiple files. I didn't know how to work with React Native and Expo before, so this was a pretty big thing for me to learn quickly and to be able to implement it, which also involved writing the unit tests. Also, some packages were deprecated, so we had to constantly upgrade them every time. 

- **Favorite / most interesting part:** 
Seeing the signup/login/logout flow work correctly with real stored data.  

- **If I could do it over:** 
I would probably try to learn how to set up the unit tests earlier just so I didn't have to worry about it as much and could focus on other parts of the project. 
- **Most valuable thing I learned:** 
How to manage state and persistent storage in a React Native and Expo project, and how authentication can be handled locally. This was my first time working with React Native, so it was a big learning experience.

### Armando Vega

- [a link to Armando's pull requests](https://github.com/Wei-HaiMing/cst438proj1/pulls?q=is%3Apr+is%3Aclosed+author%3AWei-HaiMing)
- [a link to Armando's issues](https://github.com/Wei-HaiMing/cst438proj1/issues?q=is%3Aissue%20state%3Aclosed%20author%3AWei-HaiMing)

#### What was your role / which stories did you work on
Armando's role was working on the storage and testing components of the project. Armando also worked on having the login component interact with the database as well as authentication into the app.
+ What was the biggest challenge?
  + The biggest challenge was getting all of the dependencies and packages to work together.
+ Why was it a challenge?
  + Every new feature that we implemented after we had figured out how to get one running required version changes. As we upgraded our dependency versions, some things would become deprecated, and we would have to try and find the workaround for that. In order to find a version that would make all of our features from SQLite to AsyncStorage to Jest Expo to work all together, we turned to AI agents to help us find out which version of each package would be optimal to allow for all these features to work together.
+ Favorite / most interesting part of this project
  + My favorite part of the project was learning how the TypeScript and React-Native components work together. 
+ If you could do it over, what would you change?
  + I would start with setting up unit testing first above all else.
+ What is the most valuable thing you learned?
  + I learned how a React-Native project structure is supposed to look like with all the different storage and testing features that we implemented.

---

## Conclusion
- **Project Success:** We set out to create a trivia categories game with account management, and we achieved that goal with working login, signup, trivia generation, and multiplayer.  
- **Largest Victory:** Integrating the OpenAI API and getting dynamic categories + questions running smoothly in the app. Also setting up the database was another big victory. 
- **Final Assessment:** The project was successful — we completed more issues than planned, and we were able to make a working trivia game with persistent storage and account management.  
