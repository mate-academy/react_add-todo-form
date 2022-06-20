import { FC, memo, useState } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
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
  const [userId, setUserId] = useState('');
  const [toDoList, setToDoList] = useState([...preparedTodos]);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  let uName = '';

  const validateInput = () => {
    if (!userId) {
      setUserError('Please choose a user');
    }

    if (!todoTitle) {
      setTitleError('Please enter the title');
    }
  };

  const getUser = () => users.find(user => user.name === userId);

  const addToDo = () => {
    if (todoTitle && userId) {
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

      setTitle('');
    } else {
      validateInput();
    }
  };

  return (
    <>
      <div className="App container">
        <h1 className="title is-1">To-Do List</h1>

        <form
          action="#/"
          method="POST"
          className="Form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="field is-grouped">
            <label
              htmlFor="title"
              className="control is-expanded"
            >
              <input
                type="text"
                data-cy="titleInput"
                defaultValue=""
                id="title"
                placeholder="Type the title"
                className="input is-rounded"
                onChange={(event) => {
                  setTitleError('');
                  setTitle(
                    event.target.value,
                  );
                }}
              />
            </label>
            <br />
            <br />
            <p className="has-text-danger">{titleError}</p>

            <div className="select control">
              <select
                name="users"
                id="users"
                data-cy="userSelect"
                defaultValue="Choose a user"
                onChange={(event) => {
                  setUserError('');
                  setUserId(event.target.value);
                }}
              >
                <option
                  disabled
                >
                  Choose a user
                </option>
                {
                  users.map(user => {
                    uName = user.name;

                    return (
                      <option
                        value={uName}
                        key={user.id}
                      >
                        {uName}
                      </option>
                    );
                  })
                }
              </select>
              <p className="has-text-danger">{userError}</p>
            </div>

            <button
              type="submit"
              className="button control is-success"
              onClick={() => {
                addToDo();
              }}
            >
              Add
            </button>
          </div>
        </form>
        <br />
        <hr />
        <br />
        <TodoList preparedToDos={toDoList} />
        <hr />
      </div>
    </>
  );
};

export default memo(App);
