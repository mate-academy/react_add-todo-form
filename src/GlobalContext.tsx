import React, { useContext, useReducer } from 'react';
import { Good } from './types';

export const actions = {
  addGood: (payload: Good) => ({ type: 'ADD_GOOD' as const, payload }),
  updateGood: (payload: Good) => ({ type: 'UPDATE_GOOD' as const, payload }),
  deleteGood: (payload: number) => ({ type: 'DELETE_GOOD' as const, payload }),
};

type Action =
  | ReturnType<typeof actions.addGood>
  | ReturnType<typeof actions.updateGood>
  | ReturnType<typeof actions.deleteGood>;

type Dispatch = (action: Action) => void;

const initialState = [] as Good[];

function reducer(goods: Good[], action: Action) {
  switch (action.type) {
    case 'ADD_GOOD':
      return [...goods, action.payload];
    case 'UPDATE_GOOD':
      return goods.map(good =>
        good.id === action.payload.id ? action.payload : good,
      );
    case 'DELETE_GOOD':
      return goods.filter(good => good.id !== action.payload);
    default:
      return goods;
  }
}

const DispatchContext = React.createContext<Dispatch>(() => {});
const StateContext = React.createContext([] as Good[]);

export const useGlobalState = () => useContext(StateContext);
export const useDispatch = () => useContext(DispatchContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
