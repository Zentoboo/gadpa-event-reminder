# Reminder App

A simple full-stack reminder application with React frontend and MySQL backend running locally with the context of GADPA's events.

## Features

- Create, read, update, and delete reminders
- Each reminder has an activity, deadline, and department responsible
- Visual indicators for approaching and past deadlines

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Version Control**: Git

## Prerequisites

- Node.js and npm
- MySQL
- Git

## Project Structure

```
reminder-app/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReminderForm.jsx
│   │   │   ├── ReminderList.jsx
│   │   │   └── ReminderItem.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── routes/
│   │   └── reminders.js    # API routes
│   ├── server.js           # Main server file
│   ├── package.json
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/reminders | Get all reminders |
| GET | /api/reminders/:id | Get a specific reminder |
| POST | /api/reminders | Create a new reminder |
| PUT | /api/reminders/:id | Update a reminder |
| DELETE | /api/reminders/:id | Delete a reminder |

## Possible Future Enhancements

- [ ] Email notifications for approaching deadlines
- [ ] Dark/light theme toggle
- [ ] Make the edits exist on the schedule table itself
- [ ] Make it so that user is able to add a json file or excel file into the web and make additions on the database.
- [ ] Make the web more reactive.
- [x] Enable users proper modification on table columns and other display options.
- idk