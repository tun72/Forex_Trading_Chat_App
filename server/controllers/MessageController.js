const Message = require("../models/MessageModel");
const factory = require("../controllers/FactoryHandler");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const catchAsync = require("../utils/catchAsync");
const sharp = require("sharp");

// multer for image upload
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadFile = upload.single("file");

exports.saveFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // change file name
  const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  req.file.filename = `${suffix} ${req.file.originalname}`;
  let filePath = "upload/chat/files";

  // resize if is image
  if (req.file.mimetype.startsWith("image")) {
    filePath = "upload/chat/imgs";
    await sharp(req.file.buffer)
      .resize(700, 700)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(filePath, req.file.filename));
  } else {
    // save the file
    await fs.promises.writeFile(
      path.join(filePath, req.file.filename),
      req.file.buffer
    );
  }

  //response with file path
  res.status(200).json({
    status: "success",
    filePath: `${filePath}/${req.file.filename}`,
  });
});

exports.aliasMessages = (req, res, next) => {
  const user1 = req.user._id;
  const user2 = req.body.id;


  req.query.sort = "timestamp";
  req.filter = {
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  };

  next();
};

exports.getMessages = factory.getAll(Message);
