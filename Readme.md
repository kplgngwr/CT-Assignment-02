# File Management Tool

This project is a simple file management tool built using Node.js core modules such as File System, Path, and HTTP. It provides an HTTP server with endpoints to create, read, delete, and list files.

## Features

- **Create Files**: Create a new file with content.
- **Read Files**: Read the content of an existing file.
- **Delete Files**: Delete an existing file.
- **List Files**: List all files in the `files` directory.

## Endpoints

### POST `/create`
- **Query Parameters**: `filename` (Name of the file to create)
- **Request Body**: Content to write into the file
- **Response**: JSON object with success or error message

### GET `/read`
- **Query Parameters**: `filename` (Name of the file to read)
- **Response**: JSON object with file content or error message

### DELETE `/delete`
- **Query Parameters**: `filename` (Name of the file to delete)
- **Response**: JSON object with success or error message

### GET `/list`
- **Response**: JSON object with a list of all files or error message

## How to Run

1. Ensure Node.js is installed on your system.
2. Clone this repository and navigate to the project directory.
3. Run the following command to start the server:

   ```bash
   npm start
   ```

4. Use tools like Postman or curl to interact with the endpoints.

## Resources

- [Node.js Documentation](https://nodejs.org/api/modules.html)