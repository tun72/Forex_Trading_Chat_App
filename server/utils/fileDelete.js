// this will help you delete files
const fs = require("fs");
const fileDelete = (path) => {
  if (fs.existsSync(path)) {
    console.log(path);
    fs.unlink(path, (err) => {
      console.log("success");

      if (err) throw new Error(err.message);
    });
  }
};

module.exports = fileDelete;
