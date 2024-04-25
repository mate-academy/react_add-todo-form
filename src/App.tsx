import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface FormState {
  title: string;
  selectedUser: string;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [formState, setFormState] = useState<FormState>({
    title: '',
    selectedUser: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({
    title: false,
    selectedUser: false,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.selectedUser) {
      setErrors({
        title: !formState.title.trim(),
        selectedUser: !formState.selectedUser,
      });

      return;
    }

    setErrors({
      title: false,
      selectedUser: false,
    });

    const maxId = Math.max(...todos.map(todo => todo.id));
    const newId = maxId + 1;

    const selectedUserId = parseInt(formState.selectedUser, 10);
    const newUser = usersFromServer[selectedUserId - 1];

    const newTodo = {
      id: newId,
      title: formState.title,
      completed: false,
      userId: newUser.id,
    };

    setTodos([...todos, newTodo]);
    setFormState({
      title: '',
      selectedUser: '',
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          Title: <br />
          <input
            data-cy="titleInput"
            type="text"
            name="title"
            value={formState.title}
            placeholder="Please enter a title"
            onChange={handleInputChange}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User: <br />
          <select
            name="selectedUser"
            data-cy="userSelect"
            value={formState.selectedUser}
            onChange={handleInputChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>

        <TodoList todos={todos} />
      </form>
    </div>
  );
};
