# Calorie Calculator
### calculates nutritional values and calories according to the ingredients of a recipe.

translates the recipe entered in Turkish into English with an intermediate service and extracts the necessary information through the edamam api.
then localization the incoming information into Turkish.



## Features
- svelte
- flowbite ui with tailwindcss
- svelte tabler icon set.
- dark and light mode support
- progressive web app (pwa) activated.
- server side render does not expose your api keys.
- libre translate can host anywhere you want.
- i18n localization.

## Installation

you need to create an .env file in the root folder and specify the keys to be used in the api.

```sh
PRIVATE_EDAMAM_APPID=***************************
PRIVATE_EDAMAM_APKEY=***************************
# if you are using with key
PRIVATE_LIBRE_TRANS_APIKEY=***************************
```

install dependencies:
```sh
npm install
```
start a development server:
```sh
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```
## Building
To create a production version of your app:
```sh
npm run build
```
