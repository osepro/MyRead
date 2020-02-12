# MyReads Project

MyReads is a personal library application, that shows different shelf with what book you have read, currently reading and book you want to read. Each book can be moved from one shelf to another shelf and the shelf will updated accordingly.

Also you can search for books and moved to the appropriate shelf.

## To run the application locally right away:

- git clone https://github.com/osepro/MyRead.git
- cd MyRead

## Install Dependencies

- install all project dependencies with `yarn install`

## Start Development Server to Run

- start the development server with `yarn start`
- project should open on a browser with the address `http://localhost:3000/`

Please note port number may be different, if port 3000 is already in use.

## What You're Getting

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

## Contributing

This repository is the starter code for Udacity REACT nanodegree program students. Therefore, we most likely will not accept pull requests.

![README Image](https://github.com/osepro/MyRead/blob/master/readmeImg/screenshot.png)
