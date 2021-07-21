# Tiny Town

## Description
Tiny Town is a web application that allows users to build and name neighborhoods that are placed in a city with the neighborhoods of other users. Neighborhood locations are restricted to areas directly adjacent to neighborhooods that have already been created. There are currently 6 types of structures that users can place in their neighborhood: roads, skyscrapers, commercial buildings, buisness buildings, residential buildings, and parks. Users can also demolish any of the structures they would like to before they save their neighborhood. Users can also select the color that they want their building to be before they place it or they can select the option to have their buildings be a random color when placed. In order for a plot to be placed in the city there must be a road running from each side of the neighborhood to the opther side in order for the city to connect to itself. 

## Installation
### To install codebase on local machine: 
- Go to the [Tiny Town GitHub Repository](https://github.com/Gpphelps/tiny-town)
- Click **Code** and clone repository in gitbash/terminal using command: 
```sh
git clone [https or ssh]
```
- Initialize the application by navigating to the project folder on your local machine, make sure that you have mongod running in the background, and running the command: 
```sh
npm i concurrently && npm install && npm run develop
```
- Once the server is listening, you can access application and all functionality

### To access deployed application on Heroku:
- Go to [Tiny Town Heroku Application](https://tiny-town.herokuapp.com)
- Access application and all functionality

## Usage

To save a neighborhood into the city the user must create and acount or login.

Once the user is logged in, they can create a neighborhood and save it into the larger city. Creating a city is as simple as naimg the neighborhood, and selecting a structure to build and placing on the neighborhood map. 

Once the user has their neighborhood they way that they want it they can hit the save neighborhood button and they are redirected to the homepage where their new neighborhood is waiting for them to explore. 

When the user is done creating, or they need to leave the app they can logout from Tiny Town with our dedicated logout page, but they can still enjoy viewing the city from the homepage.

## Features 
Tiny Town features the use of three.js to render the 3d models created using blender. Tiny Town also features the use of JSON Web Tokens to authenticate user actions and make sure than no request are beign made from users who do not have accounts.

## Credits 

This project was a collaboration between three creators: 
- Zack Hersh

- Gene Phelps

- Liza Ferguson

Below are links to creators respective GitHub profiles:
- [Zack's Github](https://github.com/zackshersh)
- [Gene's Github](https://github.com/Gpphelps)
- [Liza's Github](https://github.com/lizaferguson)