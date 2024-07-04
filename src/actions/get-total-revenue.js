import axios from 'axios';

export const getTotalRevenue = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/get-total-revenue`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};
