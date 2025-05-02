import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || "",
        gender: user.gender || "",
        bloodType: user.bloodType || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(file); // Store the actual file
    setFormData((prev) => ({
      ...prev,
      photo: data.url || prev.photo,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: No token found");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        {/* Name */}
        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        {/* Email (Read-Only) */}
        <div className="mb-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor bg-gray-100"
          />
        </div>

        {/* Optional Password */}
        <div className="mb-5">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="New Password"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        {/* Blood Type */}
        <div className="mb-5">
          <input
            type="text"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            placeholder="Blood Type"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="ml-3 text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none border rounded"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        {/* Photo Upload */}
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img src={formData.photo} className="w-full rounded-full" alt="Profile" />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg,.png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-3 py-2 text-[15px] bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name || "Uploaded" : "Upload Photo"}
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-7">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
          >
            {loading ? <HashLoader size={35} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
