const express = require("express");
const path = require("path");
const app = express();
const logger = require("morgan");
const router = express.Router();
const multer = require("multer");

const upload = multer({dest: "./public/upload"});

const port = 3001;







 // Build-in Middleware
 
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(express.static(path.join(__dirname,"public" )))

 // third party Middleware
  
  app.use(logger("combined"));



  app.post("/upload", upload.single("image"), ( req, res , next) => {
         console.log( req.file, req.body);
          res.send(req.file)
  }, (err, req, res, next) => {
      res.status(400).send( {err: err.message});
  } );
 
 // applicaation Middleware

     const loggerMiddleWare = (req, res, next) => {
           console.log(`${Date()}  ----requset ${req.method} ${req.url} ` );
           next();
       }

      app.use(loggerMiddleWare);



// Router Level Middleware




 app.use("/api/user", router);

  const fakeAuth = (req, res, next) => {
       
     const authSatus = true;
      if ( authSatus) {
        console.log("This is auth sataus ", authSatus);
        next();
      }else {
         res.status(401);
         throw Error("User is not authrize");
      }
      
  }

const getUser = (req, res) => {
       res.json({ msg:"Get All User"});
     
};


const createUser = (req, res) => {
     console.log( "This is the received  from client", req.body)
       res.json({ msg:"Get All User"});
     
};

 router.use(fakeAuth);
router.route("/").get(getUser).post(createUser);

// Error handling Midleware

 const errorHandler = (error, req, res, next) => {
 
     const statusCode = res.statusCode ? res.statusCode : 500;
      res.status(statusCode);

      switch (statusCode) {
        case 401:
             res.json( {
                title: "Unauthorize",
                message: error.message,
             })
            break;
        case 404:
             res.json( {
                title: "Not Found",
                message: error.message,
             })
            break;
        case 500:
             res.json( {
                title: "Server Error",
                message: error.message,
             })
            break;  
        default:
            break;
      }

 };

 app.all("*", (req, res)=>{
     res.status(404);
     throw new Error("Route Not Found");
 } )

app.use(errorHandler);
app.listen(port, ()=> { console.log(`Exmple app listing on port ${port}`) } );

