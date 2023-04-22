import './App.scss';
import { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer, { User } from './api/users';
import todoList, { TodosInterFace } from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: TodosInterFace[] = todoList.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  // const todoCopy = todos;
  const [newtitle, setTitle] = useState('');
  const [idOfTodo, setId] = useState(16);
  const [name, setName] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [personError, setPersonError] = useState(false);

  let newUserId = 0;

  usersFromServer.map((person) => {
    if (person.name === name) {
      newUserId = person.id;
    }

    return 0;
  });

  const newObj: TodosInterFace = {
    id: idOfTodo,
    title: newtitle,
    completed: false,
    userId: newUserId,
    user: {
      id: 1,
      name: '',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
  };

  const newTodo = () => {
    if (newObj.user?.name !== '' && newtitle !== '') {
      setId(current => current + 1);
      todos.push(newObj);
    }

    if (newtitle === '') {
      setTitleError(current => !current);
    }

    if (newObj.user?.name === '') {
      setPersonError(current => !current);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <span className="error">{titleError && 'Please enter a title'}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Chose a user"
            onChange={(event) => {
              setName(event.target.value);
            }}
          >
            <option
              value="person"

            >
              Chose a user

            </option>
            {usersFromServer.map((person) => {
              return (
                <option value={person.name}>
                  {' '}
                  {person.name}
                  {' '}
                </option>
              );
            })}
          </select>

          <span className="error">{personError && 'Please choose a user'}</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={newTodo}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section>

      <TodoList todos={todos} />
    </div>
  );
};
