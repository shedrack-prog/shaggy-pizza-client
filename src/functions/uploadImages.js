import axios from 'axios';

export const uploadImages = async (formData, path) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/pizzas/uploadImages`,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
