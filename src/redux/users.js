export const SET_USERS = 'SET_USERS';

export const setUsers = users => ({
  type: SET_USERS,
  users,
});

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;

    default: return state;
  }
};

export default usersReducer;
