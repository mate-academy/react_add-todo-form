import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [touchedInput, setTouchedInput] = useState(false);
  const [touchedValue, setTouchedValue] = useState(false);

  const isEmptyInput = !inputValue.trim();
  const hasErrorInput = touchedInput && isEmptyInput;

  const isEmptyValue = !selectValue;
  const hasErrorValue = touchedValue && isEmptyValue;

  const handleAddTodos = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouchedValue(true);
    setTouchedInput(true);

    if (isEmptyInput || isEmptyValue) {
      return;
    }

    const newTitle = inputValue.replace(/[^\p{L}\p{N} ]+/gu, '');

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: newTitle,
      completed: false,
      userId: +selectValue,
      user: usersFromServer.find(user => user.id === +selectValue)!,
    };

    handleAddTodos(newTodo);

    setInputValue('');
    setSelectValue('');
    setTouchedValue(false);
    setTouchedInput(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          {hasErrorInput && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            defaultValue=""
            value={selectValue}
            data-cy="userSelect"
            onChange={e => setSelectValue(e.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id + 1} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasErrorValue && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
