import React, { useCallback, useReducer } from 'react';
import { Color, Good, GoodWithoutColor } from './react-app-env';
import { colors } from './api/colors';

const goodsFromServer: GoodWithoutColor[] = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

export const getColorById = (colorId: number): Color | null => {
  return colors.find(color => color.id === colorId) || null;
};

const goodsWithColor: Good[] = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

export const GoodsContext = React.createContext<{
  goods: Good[],
  addGood:(name: string, colorId: number) => void,
  deleteGood: (goodId: number) => void,
  updateGood: (goodId: number, name: string, colorId: number) => void,
}>({
      goods: [],
      addGood() {},
      deleteGood() {},
      updateGood() {},
    });

type AddGoodAction = {
  type: 'addGood',
  payload: {
    name: string,
    colorId: number,
  },
};

type DeleteGoodAction = {
  type: 'deleteGood',
  payload: {
    goodId: number,
  },
};

type UpdateGoodAction = {
  type: 'updateGood',
  payload: {
    goodId: number,
    name: string,
    colorId: number,
  },
};

type ActionType = AddGoodAction | DeleteGoodAction | UpdateGoodAction;

interface GoodsState {
  goods: Good[],
}

const initialState: GoodsState = {
  goods: goodsWithColor,
};

const history = [];

function reducer(state: GoodsState, action: ActionType) {
  history.push(action);

  switch (action.type) {
    case 'addGood':
      // eslint-disable-next-line no-case-declarations
      const newGood = {
        id: Date.now(),
        name: action.payload.name,
        colorId: action.payload.colorId,
        color: getColorById(action.payload.colorId),
      };

      return {
        ...state,
        goods: [...state.goods, newGood],
      };

    case 'updateGood':
      // eslint-disable-next-line no-case-declarations
      const goodsCopy = state.goods.map(good => {
        if (good.id === action.payload.goodId) {
          return {
            ...good,
            name: action.payload.name,
            colorId: action.payload.colorId,
            color: getColorById(action.payload.colorId),
          };
        }

        return good;
      });

      return {
        goods: goodsCopy,
      };

    case 'deleteGood':
      return {
        goods: state.goods.filter(good => good.id !== action.payload.goodId),
      };
    default:
      return state;
  }
}

export const GoodsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addGood = useCallback((name: string, colorId: number) => {
    dispatch({
      type: 'addGood',
      payload: {
        name,
        colorId,
      },
    });
  }, []);

  const deleteGood = useCallback((goodId: number) => {
    dispatch({
      type: 'deleteGood',
      payload: {
        goodId,
      },
    });
  }, []);

  const updateGood = useCallback((
    goodId: number,
    name: string,
    colorId: number,
  ) => {
    dispatch({
      type: 'updateGood',
      payload: {
        name,
        colorId,
        goodId,
      },
    });
  }, []);

  return (
    <GoodsContext.Provider value={{
      goods: state.goods,
      addGood,
      deleteGood,
      updateGood,
    }}
    >
      {children}
    </GoodsContext.Provider>
  );
};
