import axios from 'axios';

export const getAllSauces = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/sauces`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllCheeses = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/cheeses`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllVeggies = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/veggies`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllPizzas = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/pizzas`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSinglePizza = async (pizzaId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/pizzas/${pizzaId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// users

export const getAllCustomers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/users`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/get-current-user`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/orders`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserOrders = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/orders`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
