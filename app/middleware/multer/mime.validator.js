const multer = require('multer');
const requireMimeType = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
  'video/mp4',
  'video/webm',
];

const upload = multer({
  limits: 1024 * 1024 * 5,
  fileFilter: function (req, file, done) {
    try {
      if (requireMimeType.includes(file.mimetype)) {
        done(null, true);
      } else {
        done('file type is not supported', false);
      }
    } catch (err) {
      console.log('err: ================', err);
    }
  },
});

module.exports = upload;
