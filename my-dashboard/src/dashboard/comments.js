// src/pages/Comments.js
import { useEffect, useState } from "react";
import { Spin, Card, Button, Avatar, Input } from "antd";
import { LikeOutlined, ShareAltOutlined, MessageOutlined } from "@ant-design/icons";
import apiInstance from "../config/apis/axiosconfig";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Initial limit for comments
  const [hasMore, setHasMore] = useState(true); // To track if more comments are available

  // Fetch comments from API
  const fetchComments = async () => {
    try {
      const response = await apiInstance.get("/comments?_limit=" + limit);
      if (response.data.length < limit) {
        setHasMore(false); // No more comments to load
      }
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [limit]); // Fetch comments whenever the limit changes

  const loadMoreComments = () => {
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
      {comments.map((comment) => (
        <Card
          key={comment.id}
           className="bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent"
          bodyStyle={{ padding: "16px" }}
        >
          <div className="flex items-center mb-4">
            {/* Placeholder avatar using initials */}
            <Avatar src={`https://i.pravatar.cc/150?u=${comment.email}`} alt={comment.name} className="mr-3" />
            <div>
              <h3 className="font-semibold">{comment.name}</h3>
              <p className="text-sm text-gray-500">{comment.email}</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">{comment.body}</p>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="flex space-x-4">
              <LikeOutlined className="text-gray-500 hover:text-blue-500 cursor-pointer" />
              <ShareAltOutlined className="text-gray-500 hover:text-blue-500 cursor-pointer" />
              <MessageOutlined className="text-gray-500 hover:text-blue-500 cursor-pointer" />
              <Input type="text" placeholder="Reply this comment!"/>
            </div>
          </div>
        </Card>
      ))}
      {hasMore && (
        <div className="flex justify-center items-center mt-4 col-span-full">
          <Button onClick={loadMoreComments} type="none" className="bg-green-600 px-10 py-5 text-white hover:bg-gray-700 font-semibold">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
