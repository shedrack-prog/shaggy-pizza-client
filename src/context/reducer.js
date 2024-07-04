import { GET_SINGLE_PIZZA, SET_EDIT_PIZZA } from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === SET_EDIT_PIZZA) {
    return {
      ...state,
      editPizzaId: action.payload.id,
      isEditing: true,
      singlePizza: action.payload.pizza,
    };
  }
  if (action.type === GET_SINGLE_PIZZA) {
    return {
      ...state,
      singlePizza: action.payload.pizza,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
