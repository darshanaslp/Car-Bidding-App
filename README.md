#  React Vehical Bidding App

#  React Frontend

## Project structure

-public

-src

 --component

 --service
 
 --redux

  -app

  -test
  
  -index


## Tech used

- React-strap (Bootstrap) CSS framework for styling
- React
- Redux Toolkit
- Eslint

## How to run locally

Clone or download project go to the Front-end
Inside Front-end open node console

Then type  `npm install`
 Run `npm start` if you have node installed locally.
 
Open your browse to `localhost:3000`


## Rest api structure

### vehecle api

Methods | Urls | Action	
--- | --- | ---
**GET** | `/vehicles` |  List All Vehicles
**GET**| `/vehicles/:id` |  List single Vehicle
**GET** | `/vehicles?details.brand=brand` | filter vehicle



	
vehecle json	
	{
        "id": "3",

        "name": "A3 Saloon",

        "details": {

            "currency": "LKR",

            "price": 8000000,

            "color": "#6EBF8B",

            "brand": "Audi",

            "manufactureYear": "2018",

            "image": "https://cdn.imagin.studio/getImage?angle=01&billingTag=web&customer=carwow&make=audi&modelFamily=a3&modelVariant=saloon&modelYear=2022&paintDescription=solid---ibis-white+F3F1EF&paintId=76076&tailoring=carwow&width=800&zoomLevel=0&zoomType=fullscreen",

            "description": "Premium saloon with the latest tech"
            
        }




## Tests 

Open Project

Open node console run `npm test` to have jest start and watch the tests.