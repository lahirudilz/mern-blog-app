const express = require("express");
const blogRouter = express.Router();

const {
  fetchBlogList,
  addNewBlog,
  deleteABlog,
  updateABlog,
} = require("../controller/blog-controller");

blogRouter.get("/", fetchBlogList);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/update/:id", updateABlog);
blogRouter.delete("/delete/:id", deleteABlog);

module.exports = blogRouter;
