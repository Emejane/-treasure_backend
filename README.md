# Treasure Caching Backend

This is the backend service for the Treasure Caching application, which includes functionalities for user management, NFT marketplace, and interactive gaming features. This backend interacts with OpenSea API to fetch and store collections and NFTs in our database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Swagger Documentation](#swagger-documentation)
- [Security](#security)

## Features

- **User Management**: Register, login, logout, forget password, and user profile management.
- **NFT Marketplace**: Fetch and store NFT collections and individual NFTs from OpenSea API.
- **Game Modes**: 
  - **Hunter**: Users search for NFTs on a map.
  - **Organizer**: Users place NFTs on the map for others to find.
- **Security**: All endpoints are secured with Bearer tokens.
- **API Documentation**: Swagger for interactive API testing.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/MelinaFeutrier/-treasure_backend.git
    cd rare-caching-backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
OPENSEA_API_KEY=your_opensea_api_key
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password

## Usage

1. **Start the server**:
    ```sh
    npm start
    ```
## Swagger Documentation

Swagger is set up for this project to facilitate testing and exploring the API endpoints. After starting the server, navigate to:
```sh
http://localhost:5000/api-docs
```
Here you will find an interactive documentation interface where you can test API endpoints directly.

## Security

All endpoints are secured with Bearer tokens. Ensure you send the `Authorization` header with each request:

Authorization: Bearer <your_token>




