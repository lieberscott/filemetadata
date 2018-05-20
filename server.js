'use strict';

const express = require('express');
const cors = require('cors');
// require and use "multer"...
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/"); // where to save file
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // how to save filename, may want to include Date.now() + file.originalname to avoid same names
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(new Error("only store png files"), false); // will not save file
  }
  else {
    cb(null, true);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 // max 1 mb
  },
  fileFilter: fileFilter
}); // will save uploaded files to storage parameters

const app = express();


let newFile = require("./newFile.js");



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', (req, res) => {
  res.json({greetings: "Hello, API"});
});


app.post("/api/fileanalyze", upload.single("upfile"), newFile.createFile);

// app.post("/api/fileanalyze", upload.single("upfile"), (req, res, next) => { // upfile is name from index.html form
//   console.log(req.file);
//   res.json({ response: "Success" });
// });

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
