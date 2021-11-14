# 📒 [Todolist app](https://todolist-app-drab.vercel.app/)

<img width="1512" alt="Screenshot 2021-11-15 at 00 56 44" src="https://user-images.githubusercontent.com/36339574/141700778-f356359e-0716-461a-8013-70071ce03264.png">

This is a sample todolist app done using Typescript, React, Next.js, Redux, Redux-saga, Prisma, CodeceptJS.

Features:

- *Server Side Rendering*. Powered with Next.js.
- *Session store*. It it not required to authorize with login and password, but your data is still persisted between sessions (with the help of cookies).
- *Optimistic UI*. UI is updated before the server responses.
- *Responsive layout*. Desktop/Mobile support.
- *E2E testing*. The automated tests (CodeceptJS) are integrated into CI pipeline and run on every push.
- *Light & Dark theme*. Preloads based on your system default theme.
- *A11Y*. Important actions are labelled.

Some reasoning regarding the picks of dependencies are to be found below.

## Next.js

Next.js is a core part of the app and, in most cases, is a superior way of building React apps nowadays. It provides  easy SSR out of the box, data fetching and population on the server, and ability to build simple API routes that only run on the server and never reach the client. 

## MUI (Material UI)

Material UI is a powerful set of ready-to-use components that speed up the development.

## Redux & Redux-saga

This was the requirement so I've used these tools in the app. However for the apps of this size I find any state managers aside of React Context to be unnecessary, and for something larger these days I would prefer a state manager that allows multiple stores, which is something Redux can't do. Having multiple stores allows us to separate the business entities and reduce overhead.

## Prisma

Prisma is awesome Typescript ORM that powers our mini-backend and provides handy typings for entities.

## CodeceptJS

CodeceptJS is a great abstraction for E2E testing that uses testing frameworks under the hood. I find E2E tests to be more important for SPA applications than unit tests, since they test the whole applications from the POV of user flows. However, unit tests are still very important and should not be discarded as well (in our case there was not much to unit test, though).

