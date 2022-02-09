const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ destination: (req,file, cb) =>{ 
    cb(null, path.join(__dirname,'../../public/images/moviesImg'));
},
filename: (req, file, cb) =>{
    const newFileName = 'image-' + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
}
});

const upload = multer ({storage});

module.exports = upload;