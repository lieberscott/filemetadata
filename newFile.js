'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

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
  
//   async function checkRepeat(exerciser) { // check if exerciser is already in database
//     let check = await File.findOne({username: exerciser});

//     if (check) { // username already exists
//       res.json({
//         Error: "Username already in use. Please select another."
//       });
//     }
    
//     else { // doesn't exist, so trigger addUser function
//       addExerciser(exerciser);
//     }
//   };
  
  function addFile(filename, path) {
    let newentry = new File({
      filename: filename,
      url: path
      });
      
     newentry.save((err, data) => {
      if (err) { console.log(err) }
      else { console.log(data) }
    });
      
    res.json(newentry);
  }

};


//----------- Do not edit below this line -----------//

exports.FileModel = File; // FileModel will be how it is imported in other documents such as redirectAction.js
exports.createFile = createFile;