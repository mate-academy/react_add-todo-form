import './App.scss';
import { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer, { User } from './api/users';
import todoList, { TodosInterFace } from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [newtitle, setTitle] = useState('');
  const [idOfTodo, setId] = useState(16);
  const [name, setName] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [personError, setPersonError] = useState(false);
  const [todosArr, setTodos] = useState(todoList);

  const placeHolder = 'Enter a title';

  const finishedArr: TodosInterFace[] = todosArr.map(todo => ({
    ...todo,
    person: getUser(todo.userId),
  }));

  const foundPerson = usersFromServer.find(user => {
    return user.name === name;
  });

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
      id: newUserId,
      name,
      username: name,
      email: 'Sincere@april.biz',
    },
  };

  const newTodo = () => {
    if (newObj.person?.name !== '' && newtitle !== '') {
      setId(current => current + 1);
      setTodos([...todosArr, newObj]);
      setPersonError(false);
      setTitleError(false);
      setTitle('');
      setName('');
    }

    if (newtitle === '') {
      setTitleError(true);
    } else if (newtitle !== '') {
      setTitleError(false);
    }

    if (name === '') {
      setPersonError(true);
    } else if (name !== '') {
      setPersonError(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit} id="create-course-form">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            required
            placeholder={placeHolder}
            value={newtitle}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <span className="error">{titleError && 'Please enter a title'}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          >
            <option value="" disabled selected>Choose user</option>
            {usersFromServer.map((user) => {
              return (
                <option value={user.name} key={user.name}>
                  {user.name}
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

      <TodoList todos={finishedArr} />
    </div>
  );
};
