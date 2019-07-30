export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';

export const setTodos = payload => ({ type: SET_TODOS, payload });

export const addTodo = payload => ({ type: ADD_TODO, payload });

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload.todos.map(todo => ({
        ...todo,
        id: getId(),
        user: action.payload.users.find(user => user.id === todo.userId),
      }));

    case ADD_TODO: {
      const { title, user } = action.payload;

      const todo = {
        title,
        id: getId(),
        completed: false,
        userId: user.id,
        user,
      };

      return [...state, todo];
    }

    default: return state;
  }
};

export default todosReducer;

function idFactory() {
  let id = 0;

  return () => {
    id += 1;

    return id;
  };
}

const getId = idFactory();
