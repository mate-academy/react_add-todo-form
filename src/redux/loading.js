const SET_LOADED = 'FINISH_LOADING';

export const setLoaded = () => ({
  type: SET_LOADED,
});

const loadingReducer = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case SET_LOADED:
      return true;

    default:
      return state;
  }
};

export default loadingReducer;
