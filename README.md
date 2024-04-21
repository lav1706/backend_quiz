# Quiz Application
This is a simple quiz application built with Node.js, Express.js, and MongoDB, following the MVC (Model-View-Controller) architecture. Users can register, login, create quizzes, and attempt quizzes. Quiz results become available 5 minutes after the quiz's end time

# Features
1.User Registration: Users can register with a unique username and password.
2.User Login: Registered users can log in to their accounts.
3.Quiz Creation: Authenticated users can create quizzes with questions, options, and correct answers.
4.Active Quiz Retrieval: Users can retrieve the currently active quiz within its start and end time.
5.Quiz Result Retrieval: After 5 minutes of the quiz's end time, users can retrieve the quiz result
# Requirements
1.   Node.js (version 16 or later)
2.   MongoDB
3.   npm or yarn package manager
## Installation

Clone the repository: [git](https://github.com/lav1706/backend_quiz.git) 

```bash
git clone https://github.com/lav1706/backend_quiz.git
```
Install dependencies:
```bash
cd quiz-application
npm install

```

Set up environment variables:Create a .env file in the root directory and define the following variables:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/quizDB
JWT_SECRET=your_secret_key


```
Run the application:
```bash

npm start

```

# API Endpoints

## Authentication
```bash
POST /auth/register: Register a new user.
Request body: { "username": "example", "password": "password" }
POST /auth/login: Log in as an existing user.
Request body: { "username": "example", "password": "password" }

```
## Quiz Management
```bash

POST /quizzes: Create a new quiz. (Authentication required)
Request body: { "question": "Question text", "options": ["Option 1", "Option 2", "Option 3", "Option 4"], "rightAnswer": 0, "startDate": "2024-04-30T12:00:00.000Z", "endDate": "2024-04-30T13:00:00.000Z" }
GET /quizzes/active: Get the currently active quiz.
GET /quizzes/:id/result: Get the result of a quiz attempt. (Authentication required)
```

## Contributor

[Lavnish Raghav](https://github.com/lav1706)



## License

[MIT](https://choosealicense.com/licenses/mit/)
