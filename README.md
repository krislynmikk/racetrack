# Racetrack System

## Overview

This project is a real-time race control system for a racetrack.

It allows employees to manage races and allows spectators to see race information live.

The system is built using Node.js, Express and Socket.IO.

---

## Features

### Employee Interfaces
- Front Desk → create sessions and add drivers
- Race Control → start race and control race modes
- Lap-line Tracker → record laps

### Public Displays
- Leader Board → shows fastest lap times
- Next Race → shows upcoming drivers and cars
- Race Countdown → shows remaining time
- Race Flags → shows current race mode

### System Features
- Real-time updates (Socket.IO)
- No page refresh needed
- Access key protection for employee pages
- Fullscreen mode for display screens
- In-memory data (resets on restart)

---

## Installation

1. Install dependencies (insert in terminal):

    npm install

2. Set access keys (insert in terminal):

    export RECEPTIONIST_KEY=1
    export SAFETY_KEY=2
    export OBSERVER_KEY=3

3. Start the server (insert in terminal):

    npm start

 Development mode (shorter races):
    
    npm run dev

4. Open:

    http://localhost:3000

---

## Routes

### Employee (requires access key)
- /front-desk
- /race-control
- /lap-line-tracker

### Public
- /leader-board
- /next-race
- /race-countdown
- /race-flags

---

## How it works

1. Create a session in Front Desk
2. Add drivers (cars are assigned automatically)
3. Start race in Race Control
4. Record laps in Lap-line Tracker
5. View results in Leader Board

---

## Notes

- No database is used
- All data is stored in memory
- Data is lost when server restarts

---

## Technologies

- Node.js
- Express
- Socket.IO
- HTML / CSS / JavaScript

## Authors

- Egne Krillo
- Karl-Martin Viiberg
- Krislyn Mikk
- Linda Ajaots

_________

Kood/Võru
