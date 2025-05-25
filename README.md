# Arabella Chen Portfolio

A modern, responsive portfolio website for Arabella Chen built with React.js and Node.js.

## Features

- Modern, responsive design with Tailwind CSS
- Dark/light mode toggle
- Interactive animations with Framer Motion
- Typing animation effects
- Progress bars and interactive components
- Contact form with backend integration
- Downloadable resume

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Other Libraries**: React Icons, React Typed, Axios

## Setup & Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd arabella-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
# For production, add your email credentials
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-email-password
# RECIPIENT_EMAIL=arabella@example.com
```

## Running the Application

### Development Mode

To run both frontend and backend concurrently:

```bash
npm run dev
```

This will start the React app on port 3000 and the Node.js server on port 5000.

### Frontend Only

```bash
npm start
```

### Backend Only

```bash
npm run server
```

## Deployment

The application is set up for easy deployment to platforms like Heroku:

```bash
git push heroku main
```

For other platforms, build the production version:

```bash
npm run build
```

## Project Structure

```
arabella-portfolio/
├── public/               # Static files
│   ├── index.html        # HTML template
│   └── resume.pdf        # Downloadable resume
├── src/                  # React source code
│   ├── App.js            # Main React component
│   ├── Contact.js        # Contact form component
│   ├── index.css         # Global styles
│   └── index.js          # React entry point
├── server.js             # Node.js server
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Customization

- **Colors**: Edit the Tailwind CSS classes in the components
- **Content**: Update the text and information in each section
- **Layout**: Modify the grid and flexbox layouts as needed

## License

MIT License

## Contact

For questions or support, please contact the developer at [your-email@example.com](mailto:your-email@example.com). 