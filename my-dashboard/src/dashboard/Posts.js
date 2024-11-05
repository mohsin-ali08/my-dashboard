// src/pages/Posts.js
import { useEffect, useState } from "react";
import { Spin, Card, Button, Avatar } from "antd";
import { LikeOutlined, ShareAltOutlined, CommentOutlined } from "@ant-design/icons";
import apiInstance from "../config/apis/axiosconfig";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Initial limit for posts
  const [hasMore, setHasMore] = useState(true); // To track if more posts are available

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get("/posts?_limit=" + limit);
      if (response.data.length < limit) {
        setHasMore(false); // No more posts to load
      }
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [limit]); // Fetch posts whenever the limit changes

  const loadMorePosts = () => {
    setLimit((prevLimit) => prevLimit + 10); // Increase the limit by 10
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="md:p-4 pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent"
          bodyStyle={{ padding: "16px" }}
        >
          <div className="flex items-center mb-4">
            <Avatar src={`https://i.pravatar.cc/150?u=${post.userId}`} alt={post.userId} className="mr-3" />
            <div>
              <h3 className="font-semibold">User {post.userId}</h3>
              <p className="text-sm text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <img
            src={`https://picsum.photos/300/200?random=${post.id}`}
            alt="Post"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <p className="mb-4 text-gray-700">{post.body}</p>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-blue-500">
                <LikeOutlined />
                <span>Like</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-blue-500">
                <CommentOutlined />
                <span>Comment</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer text-gray-500 hover:text-blue-500">
                <ShareAltOutlined />
                <span>Share</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
      {hasMore && (
        <div className="flex justify-center items-center mt-4 col-span-full">
          <Button onClick={loadMorePosts} type="primary" className="bg-green-600 px-10 py-5 text-white hover:bg-gray-700 font-semibold">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
