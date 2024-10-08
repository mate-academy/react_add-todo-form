import './App.scss';
import { useState, FormEvent, FC } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { userById } from './utils/userByID';
import { Todo } from './types/types';

interface AddUserProps {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
}

const AddUser: FC<AddUserProps> = ({ onAdd, todos }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function handleFormReset() {
    setNewTitle('');
    setNewUserId(0);
    setTitleError('');
    setUserError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTitle) {
      setTitleError('Please enter a title');
    }

    if (!newUserId) {
      setUserError('Please choose a user');
    }

    if (newTitle && newUserId) {
      const nextId: number = todos[todos.length - 1].id + 1;

      const newTodo: Todo = {
        id: nextId,
        title: newTitle,
        completed: false,
        userId: newUserId,
        user: userById(newUserId),
      };

      onAdd(newTodo);

      handleFormReset();
    }
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={newTitle}
          placeholder="Some task"
          onChange={event => {
            setTitleError('');
            setNewTitle(event.target.value.trimStart());
          }}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={event => {
            setUserError('');
            setNewUserId(+event.target.value);
          }}
          value={newUserId}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => {
    return {
      ...todo,
      user: userById(todo.userId),
    };
  });

  initialTodos.sort((todo1, todo2) => todo1.id - todo2.id);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleAddTodo(newTodo: Todo) {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddUser onAdd={handleAddTodo} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
