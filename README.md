# Thailand Travel Itinerary System

A full-stack application for managing and recommending travel itineraries for Thailand's Phuket and Krabi regions.

## Features

- Database schema for storing trip itineraries with accommodations, transfers, and activities
- RESTful API endpoints for creating and retrieving itineraries
- MCP server for generating duration-based recommended itineraries
- Beautiful, responsive UI for viewing and creating trip itineraries

## Project Structure

The project consists of two main parts:

1. Frontend (React/TypeScript with Tailwind CSS)
2. Backend (Python with FastAPI and SQLAlchemy)

### Frontend

- React application with TypeScript
- Tailwind CSS for styling
- Responsive design that works on all device sizes
- Detailed itinerary views with day-by-day breakdown

### Backend

- FastAPI for the REST API
- SQLAlchemy for database ORM
- SQLite database (for development purposes)
- MCP server for itinerary recommendations

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- Use Vitual Environment for Python Execution
### Installation

1. Clone the repository

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Set up DataBase and Start the backend server:
```bash
cd backend
In database.py Add your NeonPostgresSql URL 
uvicorn main:app --reload
If it show error then use 
uvicorn main:app --reload --port 8001 || Use any availabe port

```

2. Start the frontend server:
```bash
npm run dev
```


## API Documentation

The API documentation is available at http://localhost:8000/docs when the backend server is running.

## Database Schema

- Accommodations (hotels, resorts)
- Transfers (transportation between locations)
- Activities (tours, excursions)
- Itineraries (complete travel plans)
- Itinerary Days (day-by-day breakdown of itineraries)

## License

This project is licensed under the MIT License.