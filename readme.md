# Event Management System

## Overview
This is a full-stack event management system that allows event managers to create and manage events. Users can view the events and register for them. It includes real-time attendance tracking using WebSockets and Cloudinary integration for storing event images. The backend is secured with JWT for authentication and CRUD operations.

## Features
- **Event Manager Authentication**: Secure login for event managers using JWT (JSON Web Tokens).
- **Event Management**: Event managers can create, update, and delete events.
- **Event Registration**: Users can register for events.
- **Real-time Attendance**: WebSocket integration to track real-time event attendance.
- **Cloud Image Storage**: Cloudinary for storing event images.
- **JWT Authentication**: JWT-based authentication for secure access to the backend.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: WebSocket (Socket.io)
- **Cloud Storage**: Cloudinary (for event images)
- **State Management**: React Hooks (useState, useEffect)
- **Libraries**: Axios for HTTP requests, React-Toastify for notifications

## Installation

### Prerequisites
- Node.js installed (v14+ recommended)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image upload)

### Backend Setup
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd event-management-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the backend directory and add the following environment variables:

    ```
    CLOUDINARY_CLOUD_NAME=<your-cloud-name>
    CLOUDINARY_API_KEY=<your-api-key>
    CLOUDINARY_API_SECRET=<your-api-secret>
    JWT_SECRET=<your-jwt-secret>
    MONGO_URI=<your-mongodb-uri>
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

   The server will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd event-management-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend:
    ```bash
    npm run dev
    ```

   The frontend will run on `http://localhost:5173`.

## API Endpoints

### Authentication

- **POST /auth/login**: Event manager login.
  - Request body:
    ```json
    {
      "email": "manager@example.com",
      "password": "password123"
    }
    ```
  - Response: JWT token for authentication.

### Event Management (Requires JWT Authentication)

- **POST /events**: Create a new event (Event manager only).
  - Request body:
    ```json
    {
      "title": "Event Title",
      "description": "Event Description",
      "date": "2025-05-15T10:00:00Z",
      "location": "Event Location",
      "maxAttendees": 100,
      "tags": ["tag1", "tag2"]
    }
    ```

### Real-time Attendance (WebSocket)

- **WebSocket connection**: `ws://localhost:3000/attendance`
  - Listens for attendance updates in real-time when users register for events.

## Cloudinary Integration
Cloudinary is used to store event images. When creating or updating an event, the image is uploaded to Cloudinary. The returned URL is stored in the event data.

## Real-time Attendance with WebSocket
The system uses WebSocket to track attendance in real-time. When a user registers for an event, an event is emitted to all connected clients, updating the attendance count for the event.

## Usage

### Event Manager
- Log in using event manager credentials.
- Create, update, and delete events.
- View event details and manage event images.

### Users
- View the list of available events.
- Register for an event.
- See real-time attendance data for events.

## Testing
You can use **Postman** or **Insomnia** to test the backend API endpoints.

- Test login by POSTing credentials to `/auth/login` and getting a JWT token.
- Test event CRUD operations with the required authentication.
- Use WebSocket client to connect to `ws://localhost:3000/attendance` and receive real-time attendance updates.

