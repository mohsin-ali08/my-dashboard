import { useNavigate } from "react-router-dom";
import Dashboardbg from "../assets/dashboardbg.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Dashboardbg})`,
        }}
      ></div>
      {/* Overlay for Blur Effect */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      {/* Content with Blur Effect */}
      <div className="relative z-10 text-center py-10 px-6 bg-white bg-opacity-75 rounded-lg shadow-lg backdrop-blur-md ">
        <h1 className="text-4xl font-bold mb-4">Welcome to my Dashboard!</h1>
        <p className="text-lg mb-3">We're thrilled to have you here. This dashboard is my personal hub for managing and tracking your projects effortlessly.</p>
        <p className="text-lg mb-3">Explore various features including user comments, posts, and albums. Share insights with your friends and collaborate easily!</p>
        <p className="text-lg mb-6">Click the button below to dive right into the action!</p>
        <button
          onClick={() => navigate("/dashboard")} // Adjust path as necessary
          className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition duration-200"
        >
          Go to Dashboard
        </button>
        <div className="mt-6">
          <p className="text-md text-gray-300">Feel free to invite your friends to explore your dashboard!</p>
        </div>
        
        {/* Warnings Section */}
        <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
  <h2 className="font-bold">Important Warnings:</h2>
  <ul className="list-disc list-inside">
    <li>This is my personal dashboard, so be careful when sharing it with friends.</li>
    <li>Make sure they don’t change or delete anything important without asking me first.</li>
    <li>Keep private information safe; don’t share it with people who shouldn’t see it.</li>
    <li>Check who has access regularly and change it if needed to keep it secure.</li>
  </ul>
</div>

      </div>
    </div>
  );
}
