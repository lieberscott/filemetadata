'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' );

let FileSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

let File = mongoose.model("File", FileSchema);


let createFile = (req, res, done) => {
  let filename = req.file.originalname;
  let path = req.file.path; // captures urlpath field of file; "path" here is part of the object captured by multer

  addFile(filename, path);
  
  function addFile(name, url) {
    let newentry = new File({
      filename: name,
      url: url
    });
      
    newentry.save((err, data) => {
      if (err) {
        done(err)
      }
      else {
        console.log(data);
        console.log(req.file);
        done(null, data)
      }
    });
      
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size + " bytes"
    });
  }

};


//----------- Do not edit below this line -----------//

exports.FileModel = File; // FileModel will be how it is imported in other documents such as redirectAction.js
exports.createFile = createFile;