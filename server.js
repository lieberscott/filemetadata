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
    cb(null, file.originalname); // how to save filename
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024
  },

}); // will save uploaded files to storage parameters

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyze", upload.single("upfile"), (req, res, next) => {
  console.log(req.file);
  res.json({ response: "Success" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
