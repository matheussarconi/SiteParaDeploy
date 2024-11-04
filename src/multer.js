const multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./src/public");
    },
    imagemProduto: function(req, file, cb) {
        let nome_sem_espaco = file.originalname.trim();
        let nome_arry = nome_sem_espaco.split(' ');
        let nome_com_underline = nome_arry.join('_');
        cb(null, `${Date.now()}_${nome_com_underline}`);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10MB
});

module.exports = upload