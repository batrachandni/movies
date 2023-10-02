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
