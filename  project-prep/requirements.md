# Software Requirements

## Vision
What is the vision of this product?
Node.js Social Media REST API with SQL database , we will  create Node.js Express social media Rest API using SQL. Build a real-world social media app REST API with login, register, and all CRUD operations and learn how to use aql models with Node.js routers .
Also this social app will include Realtime Chat App with React, Node.js, Socket.io .

## What pain point does this project solve?

We will design this site as a tool for communication between the programming community. All people interested in this field will find it a useful application to communicate with each other, increase knowledge and benefit from the experiences of others, "that is, we will build a virtual community for all programming lovers.

## Why should we care about your product?
Kills two birds with one stone -- social app and messaging service.

# Scope (In/Out)

## IN - What will your product do

 Our application will allow its users, whether they are programmers or have a love to get to know this field, by providing an application for social communication among themselves, so they can publish and update also enable them to follow those who find that their content impresses them and also enables them to communicate with each other through nested chat-app

Salespeople can then view, create, update, and delete accounts that are associated with them specifically. They can also add notes and reminders that will show up on their dashboard.

## OUT - What will your product not do
Won't work in a group chats - could be a stretch goal later

# MVP (Minimum Viable Product vs)

## What will your MVP functionality be?

As an MVP, chatter -app will enable users to perform the full suite of CRUD operations on a cloud-based database (sql) accessed via a simple front-end React app.

Socket.io-based chat functionality will be integrated directly into the user's dashboard.

Authentication will be comprised of basicAuth and role-based permissions. When signing up for an account, a user defaults to the minimum number of permissions, and an Admin grants them the CRUD access as they see fit.

## What are your stretch goals?
AWS full-cloud integration (entire tech stack lives on AWS)
Further authentication with Auth0, Bearer, etc.
Session-based notifications
Phone alerts??
Role assignment based on
Functional Requirements

# Functional Requirements
## List the functionality of your product. This will consist of tasks such as the following:

* Creating Express App
* Connecting sql
* Middlewares and First Request
* Creating User Router
* Creating User Model
* Login and Register System
* Node.js Express CRUD
* Follow and Unfollow User
* Creating Post Model
* Node.js MongoDB Post CRUD
* Like and Dislike Post
* Nested Asynchronous Fetch
* Node.js sql Chat App Rest API
* Fetching User Conversations from database
* Fetching Messages from database
* Post New Chat Message

# Data Flow
Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

at first threr will be bage for register or login (creating in API using authentication )
then users after login they will able to create posts , delete, update , also they will be able to like and dislike also they can follow and unfollow other users then they can fetch all time line posts according to the following users .
in this social-app we will crete nested Real-time chat apllication , whrer users can get their previous messages and also send messages and start conversations . 

# Non-Functional Requirements

Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app.

Pick 2 non-functional requirements and describe their functionality in your application.

Testability
Test Driven Development - 80% test coverage or better through unit testing. This will require part of our team to be consistently dedicated to writing tests and and reporting any bugs. Our own QA department.

Security
We are incorporating BasicAuth for security purposes. Admins will determine which permissions are given to new users.