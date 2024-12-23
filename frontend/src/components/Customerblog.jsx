import React, { useState, useEffect } from 'react';
import './Blog.css';
import { FaPen } from "react-icons/fa";
import { useAuth } from '../store/Auth';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function Customerblog() {
  const [blogs, setBlogs] = useState([]);
  const [blogText, setBlogText] = useState('');
  const [blogHeading, setBlogHeading] = useState('');
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const { user, isLoggedin } = useAuth();

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      const reversedBlogs = response.data.reverse();
      setBlogs(reversedBlogs);
  
      // Initialize comments visibility for all blogs
      const visibility = {};
      reversedBlogs.forEach((blog) => (visibility[blog._id] = false));
      setCommentsVisibility(visibility);
  
      console.log('Blogs with comments:', reversedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };
  

  const fetchComments = (blogId) => {
    // Toggle comments visibility without making an API call
    setCommentsVisibility((prev) => ({
      ...prev,
      [blogId]: !prev[blogId], // Toggle visibility
    }));
  };
  

  const handleBlogChange = (e) => setBlogText(e.target.value);
  const handleHeadingChange = (e) => setBlogHeading(e.target.value);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedin) return (window.location.href = '/login');

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication required to post a blog.');
      return;
    }

    try {
      if (editMode && editId) {
        await axios.put(
          `http://localhost:5000/api/blogs/${editId}`,
          { heading: blogHeading, content: blogText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === editId
              ? { ...blog, heading: blogHeading, content: blogText }
              : blog
          )
        );
        setEditMode(false);
        setEditId(null);
      } else if (blogText.trim() && blogHeading.trim()) {
        const response = await axios.post(
          'http://localhost:5000/api/blogs',
          { heading: blogHeading, content: blogText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs([response.data, ...blogs]);
      }
      setBlogText('');
      setBlogHeading('');
    } catch (error) {
      console.error('Error submitting blog:', error.message);
    }
  };

  const requestDeleteBlog = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteBlog = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication required to delete a blog.');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== deleteId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting blog:', error.message);
    }
  };

  const handleReaction = async (blogId, reaction) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication required to react to a blog.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${blogId}/reactions`,
        { reaction },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, reactions: response.data } : blog
        )
      );
    } catch (error) {
      console.error('Error reacting to blog:', error.message);
    }
  };

  const editBlog = (id, heading, content) => {
    setEditMode(true);
    setEditId(id);
    setBlogHeading(heading);
    setBlogText(content);
  };

  const handleAddComment = async (blogId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication required to comment.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${blogId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, comments: response.data } : blog
        )
      );
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <>
      <Nav />
      <div className='blogs'>
        <h2>Customer Experience on Aurora</h2>
        <h2>
          <span className='username'>{user.username}</span> Share your visit
          experience at Aurora
        </h2>

        <div className='newblog-container'>
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="post">
                <p className="poster">
                  <strong>Posted by:</strong> {blog.user?.username || 'Unknown'}
                </p>
              </div>
              <h3>{blog.heading}</h3>
              <p>{blog.content}</p>
              <button
                onClick={() =>
                  commentsVisibility[blog._id]
                    ? setCommentsVisibility((prev) => ({
                        ...prev,
                        [blog._id]: false,
                      }))
                    : fetchComments(blog._id)
                }
              >
                {commentsVisibility[blog._id] ? 'Hide Comments' : 'View Comments'}
              </button>
              {commentsVisibility[blog._id] && blog.comments && (
                <div className='comments'>
                  <h4>Comments</h4>
                  {blog.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <p>
                        <strong>{comment.user}:</strong> {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className='reactions'>
                <button onClick={() => handleReaction(blog._id, 'like')}>
                  👍 {blog.reactions?.likes || 0}
                </button>
                <button onClick={() => handleReaction(blog._id, 'dislike')}>
                  👎 {blog.reactions?.dislikes || 0}
                </button>
              </div>
              <div className='add-comment'>
                <textarea
                  placeholder='Write a comment...'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => handleAddComment(blog._id)}>
                  Add Comment
                </button>
              </div>
              {isLoggedin && user.username === blog.user?.username && (
                <div>
                  <button
                    className='edit'
                    onClick={() => editBlog(blog._id, blog.heading, blog.content)}
                  >
                    Edit
                  </button>
                  <button onClick={() => requestDeleteBlog(blog._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <h4 className='write'>
          Write your blogs, share your thoughts <FaPen />
        </h4>
        <div className='blog-area'>
          <form onSubmit={handleBlogSubmit}>
            <input
              type='text'
              value={blogHeading}
              onChange={handleHeadingChange}
              placeholder='Enter blog heading...'
            />
            <textarea
              value={blogText}
              onChange={handleBlogChange}
              placeholder='Write your blog...'
            />
            <button className='submit' type='submit'>
              {editMode ? 'Save' : 'Post'}
            </button>
          </form>
        </div>
        <ConfirmModal
          show={showConfirmModal}
          message="Are you sure you want to delete this blog?"
          onConfirm={confirmDeleteBlog}
          onCancel={() => setShowConfirmModal(false)}
        />
      </div>
      <Footer />
    </>
  );
}

export default Customerblog;
