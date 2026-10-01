import axios from "axios";

export const getUser = async (token: string) => {
  try {
    const getUser = await axios.get("http://localhost:3000/api/userProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await getUser.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
