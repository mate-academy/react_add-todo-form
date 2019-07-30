export const SET_USERS = 'SET_USERS';

export const setUsers = payload => ({ type: SET_USERS, payload });

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload.users;

    default: return state;
  }
};

export default usersReducer;
