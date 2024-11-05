// src/pages/Todos.js
import { useEffect, useState } from "react";
import { Spin, Card, Button } from "antd";
import apiInstance from "../config/apis/axiosconfig";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Initial limit for todos
  const [hasMore, setHasMore] = useState(true); // To track if more todos are available

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await apiInstance.get("/todos?_limit=" + limit);
      if (response.data.length < limit) {
        setHasMore(false); // No more todos to load
      }
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [limit]); // Fetch todos whenever the limit changes

  const loadMoreTodos = () => {
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
    <div className="md:p-4 pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          title={todo.title}
          className={`bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-300 border border-transparent ${todo.completed ? 'border-green-500' : 'border-red-500'}`}
        >
          <p className="text-sm">{todo.completed ? "✔️ Completed" : "❌ Pending"}</p>
          <p className="text-gray-500">Due Date: {todo.dueDate || 'N/A'}</p>
          <div className="flex justify-end">
            <Button type="link" className="text-blue-500">Edit</Button>
            <Button type="link" className="text-red-500">Delete</Button>
          </div>
        </Card>
      ))}
      {hasMore && (
        <div className="flex justify-center items-center mt-4">
          <Button onClick={loadMoreTodos} type="none" className="bg-green-600 px-10 py-5 text-white hover:bg-gray-700 font-semibold">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
