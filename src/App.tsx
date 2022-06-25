import {
  ChangeEvent,
  FC,
  memo,
  useState,
} from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import {
  PreparedTodos,
  Todo,
  User,
} from './appTypeDefs';
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
  const [userId, setUserId] = useState('Choose a user');
  const [toDoList, setToDoList] = useState([...preparedTodos]);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const validateInput = () => {
    if (!userId || userId === 'Choose a user') {
      setUserError('Please choose a user');
    }

    if (!todoTitle) {
      setTitleError('Please enter the title');
    }
  };

  const resetForm = () => {
    setTitle('');
    setUserId('Choose a user');
  };

  const getUser = () => users.find(user => user.name === userId);

  const addToDo = () => {
    if (todoTitle
      && userId !== 'Choose a user'
      && userId
    ) {
      setToDoList(prevState => ([
        ...prevState,
        {
          userId: getUser()?.id,
          id: Math.max(...prevState.map((todo) => todo.id)) + 1,
          title: todoTitle,
          completed: false,
          user: getUser(),
        },
      ]));

      resetForm();
    } else {
      validateInput();
    }
  };

  const handleFormSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    addToDo();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleError('');
    setTitle(event.target.value.replace(/[^a-z0-9 ]/gi, ''));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserError('');
    setUserId(event.target.value);
  };

  return (
    <>
      <div className="App container">
        <h1 className="title is-1">To-Do List</h1>

        <form
          className="Form"
          onSubmit={(event) => handleFormSubmit(event)}
        >
          <div className="field">
            <label
              htmlFor="title"
              className="control"
            >
              <input
                type="text"
                data-cy="titleInput"
                value={todoTitle}
                id="title"
                placeholder="Type the title"
                className="input is-rounded"
                onChange={(event) => handleChange(event)}
              />
            </label>
            <p className="has-text-danger">{titleError}</p>

            <div className="select control">
              <select
                name="users"
                id="users"
                data-cy="userSelect"
                value={userId}
                onChange={(event) => handleSelectChange(event)}
              >
                <option
                  disabled
                >
                  Choose a user
                </option>
                {
                  users.map(user => {
                    const { name, id } = user;

                    return (
                      <option
                        value={name}
                        key={id}
                      >
                        {name}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <p className="has-text-danger">{userError}</p>

            <button
              type="submit"
              className="button control is-success"
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
