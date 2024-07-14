const mongoose = require("mongoose");
const Blog = require("../model/Blog");

const fetchBlogList = async (req, res) => {
  let blogList;

  try {
    blogList = await Blog.find();
  } catch (error) {
    console.log(error);
  }

  if (!blogList) {
    return res.status(404).json({ message: "No Data Found!" });
  } else {
    return res.status(200).json({ blogList });
  }
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  const newBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newBlog.save();
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save(session);
    session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ newBlog });
};

const deleteABlog = async (req, res) => {
  const id = req.params.id;

  try {
    const currentBlog = await Blog.findByIdAndDelete(id);

    if (!currentBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    return res.status(200).json({ message: "Successfully deleted!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to delete. Try again later!" });
  }
};

const updateABlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  let currentBlog;

  try {
    currentBlog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }

  if (!currentBlog) {
    return res.status(500).json({ message: "unable to update!" });
  }

  return res.status(200).json({ currentBlog });
};

module.exports = { fetchBlogList, addNewBlog, updateABlog, deleteABlog };
