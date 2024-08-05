# Log Management API
This project is a simple log management API built with Node.js, Express, and PostgreSQL. The API allows clients to send and query logs, with API key authentication for security.

## Getting Started
Follow these instructions to set up the project and run it locally.

## Prerequisites
Node.js (v14 or higher)
PostgreSQL
npm (Node Package Manager)

Clone the repository
Install the dependencies with:

``` npm install```

Set up your PostgreSQL database:
```
CREATE DATABASE log_management;
\c log_management;
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ,
  service_name VARCHAR(255),
  log_level VARCHAR(50),
  message TEXT
);
```


Create a .env file in the root directory and add the following environment variables or else you can use my example .env included in the repo

## Usage 
To send logs, use the provided sendLog.js script. This script generates random logs and sends them to the API.

Querying Logs
To query logs, send a GET request to the /logs endpoint with optional query parameters.


Usage
Sending Logs
To send logs, use the provided sendLog.js script. This script generates random logs and sends them to the API.

Querying Logs
To query logs, send a GET request to the /logs endpoint with optional query parameters.

# API Endpoints
## POST /logs
Description: Receives and stores log entries.

## Headers:

'Content-Type': application/json

'x-api-key': your_api_key

```
{
  "timestamp": "2024-08-04T12:34:56.789Z",
  "service_name": "Service1",
  "log_level": "info",
  "message": "This is an info message from Service1"
}
```

# GET /logs

Description: Retrieves log entries based on query parameters.

## Headers:

x-api-key: your_api_key
## Query Parameters:

startDate (optional, format: DD-MM-YYYY)
endDate (optional, format: DD-MM-YYYY)
serviceName (optional)

