const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads/pdfs/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
