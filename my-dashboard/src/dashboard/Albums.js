import { useEffect, useState } from "react";
import { Spin, Card, Button } from "antd";
import apiInstance from "../config/apis/axiosconfig";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(9); // Set initial limit of items to fetch

  // Fetch albums from API
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get(`/albums?_limit=${limit}`);
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load more albums by increasing limit
  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 9); // Increase limit by 9 more items
  };

  useEffect(() => {
    fetchAlbums();
  }, [limit]); // Fetch albums when limit changes

  return (
    <div className="md:p-4 pt-10">
      {loading && albums.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <Card
              key={album.id}
              title={album.title}
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => {/* Navigate to album detail page */}}
            >
              <img
                src={`https://picsum.photos/200/150?random=${album.id}`} // Placeholder image
                alt={`Album ${album.title}`}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p>Album ID: {album.id}</p>
              <p>Number of Photos: {album.photosCount || 'N/A'}</p>
              <p>Created on: {new Date().toLocaleDateString()}</p>
            </Card>
          ))}
        </div>
      )}
      {!loading && (
        <div className="flex justify-center mt-6">
          <Button type="none" className="bg-green-600 px-10 py-5 text-white hover:bg-gray-700 font-semibold" onClick={loadMore} disabled={loading}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
