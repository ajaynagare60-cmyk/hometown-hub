import { useState, useEffect } from "react";
import "./Posts.css";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("General");
  const [image, setImage] = useState("");
  const [creating, setCreating] = useState(false);

  const [commentText, setCommentText] = useState({});

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = user?.name || "You";


  const fetchPosts = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch posts");
    }

    setPosts(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchPosts();
}, []);

const createPost = async () => {
  if (!content.trim()) {
    alert("Please write something before posting.");
    return;
  }

  try {
    setCreating(true);

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: content,
        type: postType,
        image: image,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    setPosts((previousPosts) => [data, ...previousPosts]);

    setContent("");
    setPostType("General");
    setImage("");
  } catch (error) {
    console.error("Create post error:", error);
    alert(error.message);
  } finally {
    setCreating(false);
  }
};


  const handleLike = (postId) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  };

  const handleCommentChange = (postId, value) => {
    setCommentText((previousComments) => ({
      ...previousComments,
      [postId]: value,
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentText[postId]?.trim();

    if (!text) {
      alert("Please write a comment.");
      return;
    }

    const newComment = {
      id: Date.now(),
      author: currentUser,
      text,
    };

    setPosts((previousPosts) =>
      previousPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      })
    );

    setCommentText((previousComments) => ({
      ...previousComments,
      [postId]: "",
    }));
  };

  const handleDeletePost = (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    setPosts((previousPosts) =>
      previousPosts.filter((post) => post.id !== postId)
    );
  };

  return (
    <div className="posts-page">
      <div className="create-post">
  <h3>What's happening in your hometown?</h3>

  <textarea
    placeholder="Write something..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
  />

  <select
    value={postType}
    onChange={(e) => setPostType(e.target.value)}
  >
    <option value="General">General</option>
    <option value="Announcement">Announcement</option>
    <option value="Local News">Local News</option>
    <option value="Culture">Culture</option>
    <option value="Help">Help</option>
    <option value="Event">Event</option>
  </select>

  <input
    type="text"
    placeholder="Image URL (optional)"
    value={image}
    onChange={(e) => setImage(e.target.value)}
  />

  <button onClick={createPost} disabled={creating}>
    {creating ? "Posting..." : "Post"}
  </button>
</div>


      <div className="posts-list">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              
              <h4>
                {post.author?.name || "Unknown User"}
              </h4>

              <span>{post.type}</span>

              <p>{post.content}</p>

              <div>
                👍 {post.likes?.length || 0}
                &nbsp;&nbsp;
                💬 {post.comments?.length || 0}
              </div>

            </div>
          ))
        )}
      </div>


    </div>
  );
}

export default Posts;
