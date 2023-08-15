const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const bucket = "dev-multer-s3-bucket";

const s3 = new AWS.S3({
  endpoint: "http://127.0.0.1:9000",
  accessKeyId: "sizwybthCrWJwk5gFzBS",
  secretAccessKey: "buisv5tmvBSCZyJ8VWL2707QkCMwvEynwPIlgMYr",
  sslEnabled: false,
  s3ForcePathStyle: true,
});

const storage = multerS3({
  s3,
  bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, Date.now().toString());
  },
});

const upload = multer({ storage });

module.exports = upload;
