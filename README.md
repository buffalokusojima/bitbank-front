# bitflyer-front

## About

This project is Crypto currncy order web site, which uses bitflyer API.
This project is designed for the situation, which you cannot order on the bitflyer web.
By ordering through API, you can order directly to bitflyer order control server.
Even such a bitcoin falling down situation, I hope you can survive.

Actually, this project is yet proto type. This only manages FX_BTC_JPY.
In addition to that, if needed, other currency will be added.

## How to install

- install expo
First of all you need to install Expo with this command `npm install expo`. Then you can use any command of Expo.

- deploy backend project

Refere to here https://github.com/buffalokusojima/bitflyerAPI

`git clone` this project

create files below

- `.env`
    - content of file is like below
    ```
    APP_REGION=resion
    APP_COGNITO_USER_POOL_ID=UserPoolID
    APP_COGNITO_USER_POOL_WEB_CLIENT_ID=UserPoolClient
    APP_APIGATEWAY_ENDPOINT=APIURL
    ```
    
## How to start

`expo start` to start expo console. And then, type web to open web.
With default setting, open your default browser opens up and show the web page of this project.


## How to use it

### Sign in 

Every action needs Authentication so that you have to be authenticated to get idToken.

![Simulator Screen Shot - iPhone 11 - 2021-07-31 at 16 20 20](https://user-images.githubusercontent.com/43209874/127732273-7b19c728-71cf-41f0-848e-b548322bef36.png)


### Status

It's still under constraction!!
I could make status area soon but due to lack of deposit, I coudn't test it yet, which needs me to order first to show orders on the status area.

In this area, you can see your position and order status.
And you can delete the order here.

![Simulator Screen Shot - iPhone 11 - 2021-07-31 at 16 21 47](https://user-images.githubusercontent.com/43209874/127732305-97f2093f-9454-4185-895f-93dc6f56aaa9.png)


### Order

In this area, you can order nomal order and special one and even auto one.

![Simulator Screen Shot - iPhone 11 - 2021-07-31 at 16 23 23](https://user-images.githubusercontent.com/43209874/127732350-fa28d1f1-b537-4085-9197-b9675601a888.png)
a
