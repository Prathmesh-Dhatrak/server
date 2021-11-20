const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: "df1er8u4g",
  api_key: "898958518246954",
  api_secret: "-kjg324SE8WJdsANE3Cz32Ln55I",
});

// req.files.file.path
exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};
