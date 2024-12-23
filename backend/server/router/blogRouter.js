const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/auth-middleware');

// Routes
router.post('/', authMiddleware, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id',  blogController.getBlogById);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);
router.post('/:id/comments', authMiddleware, blogController.addComment); // Add comment
router.post('/:id/reactions', authMiddleware, blogController.reactToBlog); // Add reaction

module.exports = router;

