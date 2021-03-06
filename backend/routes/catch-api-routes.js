// Requiring our models
var db = require("../models");
const multer = require("multer");
const path = require("path");


// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init UPLOADS
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    console.log(file);
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file, cb) {
  // ALLOED FILE EXTENSIONS
  const filetypes = /jpeg|jpg|png|gif/;

  // CHECK FILE EXT.
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // CHECK MIME
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only images: jpeg, jpg, gif & png !");
  }
}

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting catch thread
  app.get("/api/catch", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Catch.findAll({
      // where: {UserId: req.query.user_id},
      where: query,
      include: [db.User]
    }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/catch/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Catch.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  app.post('/api/catch', upload, (req, res, next) => {
    console.log(req.file)
    let filePath = "/uploads/" + req.file.filename;
    let data = {latitude: req.body.latitude, longitude: req.body.longitude, weight: req.body.weight, length: req.body.length, bait: req.body.bait, time: req.body.time, date: req.body.date, fish: req.body.fish, temperature: req.body.temperature, weathercondition: req.body.weathercondition, UserId: req.body.userId, img: filePath};
    console.log (data); // create catch table
   db.Catch.create(data).then(function(dbcatch){ 
     console.log(dbcatch)
     res.json(dbcatch)
   })
  });

   // DELETE route for deleting catch
   app.delete("/api/catch/:id", function(req, res) {
    db.Catch.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // PUT route for updating catch
  app.put("/api/catch", function(req, res) {
    db.Catch.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbCatch) {
      res.json(dbCatch);
    });
  });

  // POST route for saving a new post
    // app.get("/api/catch", (req, res) => res.render("index"));
    app.post("/upload2/:catchId", upload, (req, res) => {
      console.log(req.file);
      let filePath = "/uploads/" + req.file.filename;
      db.catch.update({ img: filePath }, {where: {
        id: req.params.catchId
      }}).then((dbFile) => res.json(dbFile));
    });
    
    app.post("/upload", (req, res) => {
      upload(req, res, (err) => {
        if (err) {
          res.render("index", {
            msg: err,
          });
        } else {
          if (req.file == undefined) {
            res.render("index", {
              msg: "Error: No File Selected",
            });
          } else {
            res.render("index", {
              msg: "File Uploaded",
              file: `uploads/${req.file.filename}`,
            });
          }
        }
      });
    });
};
 

 