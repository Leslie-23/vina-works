const News = require("../models/newsModel");

exports.createNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const news = await News.create({
      title,
      content,
      image,
      author: req.user.id,
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().populate("author", "fullName");
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      "author",
      "fullName"
    );
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
