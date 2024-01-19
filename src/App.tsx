import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialProducts: Todo[] = todosFromServer.map((todo) => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return { ...todo, user } as Todo;
});

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [userChose, setUserChose] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([...initialProducts]);
  const [submitted, setSubmitted] = useState(false);

  const handlerOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '' || userChose === 0) {
      setSubmitted(true);

      return;
    }

    const selectedUser = usersFromServer.find((user) => user.id === userChose);

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
      userId: userChose,
      user: selectedUser,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle('');
    setUserChose(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handlerOnSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => setTitle(event.target.value)}
          />

          {submitted && title.trim() === ''
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userChose}
            onChange={(e) => setUserChose(parseInt(e.target.value, 10))}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(item => (
              <option
                value={item.id}
                key={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>

          {submitted && userChose === 0
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
