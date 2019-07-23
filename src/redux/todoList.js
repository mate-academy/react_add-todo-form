const ACTION_TYPE_SET_TODOS = 'SET_TODOS';
const ACTION_TYPE_SET_LOADED = 'SET_LOADED';
const ACTION_TYPE_ADD_TODO = 'ADD_TODO';

export const setTodos = todos => ({
  type: ACTION_TYPE_SET_TODOS,
  todos,
});

export const setLoaded = () => ({
  type: ACTION_TYPE_SET_LOADED,
});

export const addTodo = todo => ({
  type: ACTION_TYPE_ADD_TODO,
  todo,
});

const initialState = {
  todos: [],
  isLoaded: false,
};

const todosReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ACTION_TYPE_SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case ACTION_TYPE_SET_LOADED:
      return {
        ...state,
        isLoaded: true,
      };

    case ACTION_TYPE_ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };

    default:
      return state;
  }
};

export default todosReducer;
