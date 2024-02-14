# mern art galary 


# tasks

- [x] login and signup for user using session managment

- [x] create an image upload functionaly with image title and description at frontend using react js
- [x] make an API to uploud to cloud
- [x] fetch api and get the uploded images
- [x] make the api to save number of times an image has been viwed and dsiplayed
- [x] redux using
- [x] host it

# mern stack

## backend (backend-node)

- using
  -node js , express
  - mogodb (database)

## frontend(client-react)

- using
  - reactjs
  - tailwindcss
  - daisyui
  - redux

## npm package that are used in this project

### in backend (important once )

- bycrypt - for passwor encrypthion
- jwt - for jwt token generation and cheeking
- cooki -pareser - for eaisy access the cooki

### in frontend (important once)

- react - query
- axios
- react -form
- yup for form vaildation

## this website is built using vite for frontend

```bash
npm create vite@latest

```

## some features such as admin dashbord and user dashbord are in progress

# how to run this project

- step -1 : clone or dowload the zip

- step - 3 : add cors and config .env for backend and frontend

- step -3 : run following command in the termail of backend and frontend respectivily

```bash
cd ./backend-node
npm i
npm run dev
```

```bash
cd ./client-react
npm i
npm run dev
```

# .env for backend

```txt
PORT =4030
Mongodb_url =
jwt_expire_time=

JWT_SECRET=
Cookie_Expire=

CLOUD_NAME=


API_SECRET=

API_KEY=
```

# .env for fontend 
```txt 
VITE_APP_API_URL="http://localhost:<PORT>/api"

```
