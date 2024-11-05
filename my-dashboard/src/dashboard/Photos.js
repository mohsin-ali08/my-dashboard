import { useEffect, useState } from "react";
import { Spin, Card, Button } from "antd";

export default function Photos() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Number of items to load per request

  // Fetch random users from RandomUser.me API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${itemsPerPage}&page=${page}`);
      const data = await response.json();

      // Ensure users are available and update the state
      if (data.results) {
        setUsers((prevUsers) => [...prevUsers, ...data.results]);
      } else {
        console.error("No users found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="md:p-4 pt-10 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
         <Card
         key={user.login.uuid}
         className="bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg border border-transparent"
       >
         <img
           src={user.picture.large}
           alt={`${user.name.first} ${user.name.last}`}
           className="w-full h-auto rounded-full mb-4"
         />
         <div className="p-4">
           <h3 className="text-lg font-semibold">{`${user.name.first} ${user.name.last}`}</h3>
           <p className="text-gray-500 text-sm truncate">{user.email}</p>
         </div>
       </Card>
       
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          type="primary"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
