import './App.scss';
import { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer, { User } from './api/users';
import todoList, { TodosInterFace } from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: TodosInterFace[] = todoList.map(todo => ({
  ...todo,
  person: getUser(todo.userId),
}));

export const App = () => {
  const [newtitle, setTitle] = useState('');
  const [idOfTodo, setId] = useState(16);
  const [name, setName] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [personError, setPersonError] = useState(false);

  const foundPerson = usersFromServer.find(user => user.name === name);

  let newUserId = foundPerson?.id;

  if (newUserId === undefined) {
    newUserId = 0;
  }

  const newObj: TodosInterFace = {
    id: idOfTodo,
    title: newtitle,
    completed: false,
    userId: newUserId,
    person: {
      id: 1,
      name,
      username: name,
      email: '',
    },
  };

  const newTodo = () => {
    if (newObj.person?.name !== '' && newtitle !== '') {
      setId(current => current + 1);
      todos.push(newObj);
    }

    if (newtitle === '') {
      setTitleError(current => !current);
    }

    if (newObj.person?.name === '') {
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
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            required
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
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          >
            <option value="person">
              Chose a user
            </option>
            {usersFromServer.map((user) => {
              return (
                <option value={user.name}>
                  {' '}
                  {user.name}
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
