import axios from 'axios';

export const getGraphData = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/get-graph-revenue`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {}
};
