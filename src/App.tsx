import { FC, memo, useState } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import { PreparedTodos, Todo, User } from './appTypeDefs';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

function prepareTodos(
  todoList: Todo[],
  usersList: User[],
): PreparedTodos[] {
  return todoList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

export const preparedTodos: PreparedTodos[] = prepareTodos(todos, users);

const App: FC = () => {
  const [todoTitle, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [toDoList, setToDoList] = useState([...preparedTodos]);

  const getUser = () => users.find(user => (
    user.id === userId
  ));

  const addToDo = () => {
    setToDoList(prevState => ([
      ...prevState,

      {
        userId: getUser()?.id,
        id: prevState.length + 1,
        title: todoTitle,
        completed: false,
        user: getUser(),
      },
    ]));
  };

  return (
    <>
      <div className="App container">
        <h1 className="title is-1">To-Do List</h1>

        <form
          action="#/"
          method="POST"
          className="Form"
        >
          <div className="field is-grouped">
            <label
              htmlFor="title"
              className="control is-expanded"
            >
              <input
                type="text"
                defaultValue=""
                id="title"
                placeholder="Type the title"
                onChange={(event) => {
                  setTitle(
                    event.target.value,
                  );
                }}
                className="input is-rounded"
              />
            </label>

            <div className="select control">
              <select
                name="users"
                id="users"
                data-cy="userSelect"
              >
                <option
                  disabled
                >
                  Choose a user
                </option>
                {
                  users.map(user => (
                    <option
                      value={`${user.name}`}
                      key={user.id}
                      onClick={() => {
                        setUserId(user.id);
                      }}
                    >
                      {user.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <button
              type="button"
              className="button control is-success"
              onClick={addToDo}
            >
              Add
            </button>
          </div>
        </form>

        <TodoList preparedToDos={toDoList} />
        <hr />
      </div>
    </>
  );
};

export default memo(App);
