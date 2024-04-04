# Restaurant Yelp App

This project is designed to help users find restaurants in a specific area using the Yelp API. It's split into two main parts: the client and the server.

## Project Details

This application is designed to provide users with a simple and intuitive interface to explore restaurants in their area, leveraging the Yelp Fusion API for data. The core functionality includes displaying a list of restaurants, implementing infinite scrolling for seamless browsing, and adapting to various screen sizes for a responsive design.

### Requirements

- Node.js and npm installed.
- A Yelp Fusion API key.

## Client

The client is built with React and uses React Hooks for state management. It communicates with a custom server for fetching restaurant data. The UI is styled with SCSS, providing a responsive and user-friendly interface.

### Configuration

1. **Client (.env file)**: Inside the `client` directory, create a `.env` file and set `REACT_APP_YELP_API_KEY` with your Yelp API key.
    ```
    REACT_APP_YELP_API_KEY=yourYelpApiKeyHere
    ```

2. **Server (.env file)**: In the `server` directory, create a `.env` file and set variables for port and Yelp API key (if different from the client).
    ```
    PORT=3001
    YELP_API_KEY=yourYelpApiKeyHere
    ```

### Key Features

- Display a list of restaurants based on location.
- Infinite scrolling for loading more restaurants.
- Responsive design for mobile and desktop viewing.

### Installation

To set up the client side of the project, follow these steps:

1. Navigate to the `client` directory: `cd client`
2. Install the dependencies: `npm install`
3. Start the application: `npm start`

This will launch the application on `http://localhost:3000` by default.

### Components

- **Loader**: Displays a loading animation while fetching data.
- **RatingStars**: Shows the restaurant's rating as stars.
- **Restaurant**: Displays information about a single restaurant.
- **App**: The main component that renders the application and handles data fetching and infinite scrolling logic.

## Server

The server acts as a proxy, handling requests to the Yelp API. It's built with Express and includes CORS support for secure communication with the client.

### Installation

To set up the server side of the project, follow these steps:

1. Navigate to the `server` directory: `cd server` (assuming your server files are in a separate `server` directory within the project)
2. Install the dependencies: `npm install`
3. Start the server: `npm start`

This will launch the server on `http://localhost:3001` by default.

### Endpoints

- **GET /restaurants**: Fetches a list of restaurants based on a predefined location and term ('restaurants').

## How to Use

To use the app, simply start both the client and the server. Navigate to `http://localhost:3000` in your browser to view the app. Scroll down to load more restaurants.

## Documentation

### Server

The server's main functionality is to fetch restaurant data from the Yelp API and forward it to the client. It uses the `axios` library for making HTTP requests and requires a Yelp API key set in the `.env` file.

### Client

The client is responsible for displaying the restaurant data in a user-friendly manner. It fetches data from the server and implements infinite scrolling for a seamless user experience.

For detailed documentation on React components, refer to the official [React documentation](https://reactjs.org/docs/getting-started.html).

## Contributing

Contributions to the project are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
