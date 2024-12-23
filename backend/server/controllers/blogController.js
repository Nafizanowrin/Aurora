const Blog = require('../models/blogModel');

const createBlog = async (req, res) => {
  const { heading, content } = req.body;
  const userId = req.user.id; // ID of the logged-in user

  try {
    const newBlog = new Blog({
      heading,
      content,
      user: userId, // Associate the blog with the user
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Server error');
  }
};



const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user', 'username');
    const sanitizedBlogs = blogs.map((blog) => ({
      ...blog.toObject(),
      user: blog.user || { username: 'Anonymous' },
    }));

    res.json(sanitizedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'username');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


const updateBlog = async (req, res) => {
  try {
    const { heading, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the logged-in user is the owner
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    blog.heading = heading || blog.heading;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a comment
const addComment = async (req, res) => {
  const { id } = req.params; // Blog ID
  const { content } = req.body; // Comment content

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    console.log(req.user)
    const comment = {
      user: req.user.username, // Logged-in user
      content,
    };

    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(blog.comments);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// React to a blog
const reactToBlog = async (req, res) => {
  const { id } = req.params; // Blog ID
  const { reaction } = req.body; // Reaction type: "like" or "dislike"

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (reaction === 'like') {
      blog.reactions.likes += 1;
    } else if (reaction === 'dislike') {
      blog.reactions.dislikes += 1;
    } else {
      return res.status(400).json({ error: 'Invalid reaction type' });
    }

    await blog.save();
    res.status(200).json(blog.reactions);
  } catch (error) {
    console.error('Error reacting to blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, addComment, reactToBlog };
