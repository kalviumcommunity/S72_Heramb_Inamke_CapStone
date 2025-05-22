# Wedding Planner Frontend

A modern, responsive wedding planning application built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure authentication with Firebase
- 📱 Responsive design
- 🎯 Form validation
- 🔄 Real-time updates
- 📊 Data visualization
- 🔍 Search functionality
- 📝 Task management
- 👥 Guest management
- 💼 Vendor management

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Query
- React Router
- Firebase
- Axios
- React Hot Toast
- Vitest (Testing)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with UI

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   ├── api/           # API integration
│   ├── styles/        # Global styles
│   └── assets/        # Static assets
├── public/            # Public assets
├── tests/             # Test files
└── docs/             # Documentation
```

## Testing

The project uses Vitest for testing. Tests are written using React Testing Library and Jest DOM.

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Error Handling

The application includes comprehensive error handling:

- Error boundaries for React components
- API error handling with Axios interceptors
- Form validation
- Toast notifications for user feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@weddingplanner.com or join our Slack channel.
