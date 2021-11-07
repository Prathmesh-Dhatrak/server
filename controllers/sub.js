const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  //

  try {
    const { name, parent } = req.body;
    const category = await new Sub({
      name,
      slug: slugify(name),
      parent,
    }).save();

    res.json(category);
  } catch (error) {
    console.log("Create Sub --------->");
    res.status(400).send("Create Sub-Category Failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).send("Sub-Category Update Failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Delete Sub-Category Failed");
  }
};
