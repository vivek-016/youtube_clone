import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

//   getting user details from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

//   add channel handle function
  const handleAddChannel = async () => {
    // validating login
    if (!user) {
      alert("You must login to create a channel");
    }
    try {
        // sending post request to add channel details
      const response = await fetch("http://localhost:3000/api/channel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelName,
          description,
          channelBanner,
          user: user._id,
          subscribers: 0,
          videos: [],
        }),
      });

      if (!response.ok) {
        throw new Error("failed to create channel");
      }

      const data = await response.json();

      alert("Channel created successfully");

      // updating local storage
      const updatedUser = { ...user, channel: data._id };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/channel");
    } catch (error) {
      console.error("Error creating channel: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Channel
        </h2>
        <form className="space-y-6">
          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel Name
            </label>
            <input
              type="text"
              placeholder="Enter your channel name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Channel Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel Description
            </label>
            <textarea
              placeholder="Write a short description about your channel"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Channel Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel Banner URL
            </label>
            <input
              type="text"
              placeholder="Provide the banner image URL for your channel"
              value={channelBanner}
              onChange={(e) => setChannelBanner(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setChannelName("");
                setDescription("");
                setChannelBanner("");
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleAddChannel}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChannel;
