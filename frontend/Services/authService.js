import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.message);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.delete(`${API_URL}/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export { registerUser, loginUser, logoutUser };
