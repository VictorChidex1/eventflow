# EventFlow

EventFlow is a modern, comprehensive event management platform designed to streamline the experience of organizing and attending events. Built with React and Vite, it offers a seamless interface for users to discover events, purchase tickets, and manage their profiles, while providing organizers with tools to create and manage events.

## Features

- **Event Discovery**: Browse a wide range of events with detailed descriptions and imagery.
- **User Authentication**: Secure login and signup functionality, including password recovery.
- **Ticket Purchase**: Integrated flow for selecting and purchasing event tickets.
- **Payment Processing**: Secure payment verification and order confirmation.
- **User Profiles**: Manage personal information and view ticket history.
- **Event Creation**: Dedicated tools for organizers to publish new events.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Context API (AuthContext)
- **HTTP Client**: Axios

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/eventflow.git
   cd eventflow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables (if any).

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
eventflow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context definitions (e.g., Auth)
│   ├── pages/          # Page components for routes
│   ├── services/       # API services and utilities
│   ├── App.jsx         # Main application component with routing
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json        # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally preview the production build.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
