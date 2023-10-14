# Install tailwind CSS 

commands to install tailwind CSS 

 - npm install -D tailwindcss
 - npx tailwindcss init


Update the configuration in tailwind config file 

module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

Apply these three lines in main CSS file 

@tailwind base;
@tailwind components;
@tailwind utilities;

# Header
# Sign In Form 
# Sign Up Form

# Routing
  - commands to install react-router-dom 
  - npm i react-router-dom

# Connecting with Firebase 
  - npm i firebase
  - create a config file and paste the code like we have in firebase.js
  - after that from sign-in method in firebase site you can enable the email/passeord verification.

# Authentication 

  - 