# Arabella Chen Portfolio

A modern, responsive portfolio website for Arabella Chen built with React.js and Node.js.

## Features

- Modern, responsive design with Tailwind CSS
- Dark/light mode toggle with beautiful animations
- Interactive cursor pet and floating background elements
- Personal interests sections (Music, Nature, Food, Quantitative Finance)
- Photo gallery with modal viewing
- Contact form with backend integration
- Downloadable resume
- Responsive design for all devices

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Other Libraries**: React Icons, Axios, PostCSS, Autoprefixer

## Setup & Installation

1. **Navigate to the project directory**

```bash
cd personal-website-AC
```

2. **Install dependencies**

```bash
npm install --legacy-peer-deps
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

### GitHub Pages (Recommended for Portfolio)

This project is configured for easy deployment to GitHub Pages:

1. **Update the homepage URL** in `package.json` with your GitHub username:
   ```json
   "homepage": "https://your-username.github.io/personal-website-AC"
   ```

2. **Create a GitHub repository** named `personal-website-AC`

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/personal-website-AC.git
   git push -u origin main
   ```

4. **Enable GitHub Pages** in repository settings (select GitHub Actions as source)

5. **Your site will be live at**: `https://your-username.github.io/personal-website-AC`

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Manual Deployment to GitHub Pages

```bash
npm run deploy
```

### Other Platforms

For Heroku or other platforms:
```bash
npm run build
```

## Project Structure

```
personal-website-AC/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── public/                         # Static files
│   ├── 404.html                   # SPA routing for GitHub Pages
│   ├── _redirects                 # Redirect rules
│   ├── index.html                 # HTML template
│   └── resume.pdf                 # Downloadable resume
├── src/                           # React source code
│   ├── components/                # React components
│   │   ├── Background.js          # Animated background elements
│   │   ├── Contact.js             # Contact form component
│   │   ├── CursorPet.js           # Interactive cursor pet
│   │   ├── InteractiveBackground.js # Dynamic background animations
│   │   ├── Interests.js           # Personal interests sections
│   │   ├── MusicNotes.js          # Floating music notes animation
│   │   └── PhotoGallery.js        # Photo gallery with modal
│   ├── App.js                     # Main React component
│   ├── index.css                  # Global styles
│   └── index.js                   # React entry point
├── server.js                      # Node.js backend server
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── DEPLOYMENT.md                  # Detailed deployment guide
└── README.md                      # Project documentation
```

## Features Description

### Interactive Elements
- **Cursor Pet**: Cute animated pet that follows your cursor
- **Background Animations**: Floating leaves (light mode) and stars (dark mode)
- **Music Notes**: Animated musical notes in the interests section

### Personal Sections
- **About**: Professional introduction with typing animation
- **Skills**: Interactive progress bars for technical skills
- **Experience**: Professional work experience with animations
- **Projects**: Showcase of notable projects
- **Education**: Academic background and relevant coursework
- **Interests**: Personal interests including music (杨千嬅), nature spots, food, and quantitative finance

### Technical Features
- **Dark/Light Mode**: Smooth transition between themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Contact Form**: Backend integration for message sending (local development)
- **Resume Download**: Direct PDF download functionality

## Important Notes for GitHub Pages

- **Contact Form**: The backend contact form will not work on GitHub Pages (static hosting only)
- **Alternative Contact Solutions**: Consider using Formspree, EmailJS, or Netlify Forms
- **Automatic Deployment**: GitHub Actions automatically deploys on push to main branch

## Customization

- **Colors**: Edit the Tailwind CSS classes and color schemes
- **Content**: Update personal information in `src/App.js` and component files
- **Animations**: Modify Framer Motion animations in component files
- **Background**: Customize floating elements in `InteractiveBackground.js`

## Contact

For questions or support regarding this portfolio website, please use the contact form on the website or reach out to Arabella Chen directly.

## License

MIT License 