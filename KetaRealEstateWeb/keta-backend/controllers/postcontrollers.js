// /controllers/postController.js
const Post = require("../models/Post");
const path = require("path");
const multer = require("multer");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../bloguploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const blogup = multer({ storage: storage });

exports.createPost = [
  blogup.single("photo_url"), // Handle single file upload with field name "photo"
  async (req, res) => {
    const { title, author, SEOtitle, metadescription } = req.body;
    const photo_url = req.file ? `/bloguploads/${req.file.filename}` : null; // Path to store in the database

    try {
      const newPost = await Post.create(
        title,
        author,
        SEOtitle,
        metadescription,
        photo_url
      );
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res
        .status(500)
        .json({ message: "Failed to create post", error: error.message });
    }
  },
];

exports.updatePost = async (req, res) => {
  const { title, author, SEOtitle, metadescription } = req.body;
  const id = req.params.id;
  let photo_url = null;

  try {
    // Handle file upload
    if (req.file) {
      photo_url = `/bloguploads/${req.file.filename}`; // Adjust based on your upload path
    }

    // Call the update method from your model (make sure to handle photo_url correctly)
    const updatedPost = await Post.updateById(
      id,
      title,
      author,
      SEOtitle,
      metadescription,
      photo_url
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Failed to update post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Fetch all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
};

// Fetch a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: error.message });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.deleteById(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(deletedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};
