import React, { useReducer } from 'react';
import reducer from './reducer';
import { GET_SINGLE_PIZZA, SET_EDIT_PIZZA } from './actions';
import axios from 'axios';

const initialState = {
  editPizzaId: '',
  isEditing: false,
  singlePizza: {},
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEditPizza = (id) => {
    dispatch({ type: SET_EDIT_PIZZA, payload: { id } });
  };

  const getSinglePizza = async (id) => {
    const pizza = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/pizzas/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: GET_SINGLE_PIZZA, payload: { pizza } });
  };
  return (
    <AppContext.Provider value={{ ...state, setEditPizza, getSinglePizza }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
