const multer = require('multer');

const storage = multer.memoryStorage();

const multerConfig = {
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/png', 'image/jpeg'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('Tipo inválido de arquivo.'));
    }
  },
};

module.exports = multerConfig;
