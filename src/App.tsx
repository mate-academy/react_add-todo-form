import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  // Ініціалізуємо стан значенням null, яке точно не співпаде з жодним ID
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Скидаємо помилки перед новою перевіркою
    setHasTitleError(false);
    setHasUserError(false);
    let hasError = false;

    // Перевірка заголовка (додаємо .trim(), щоб уникнути порожніх пробілів)
    if (!todoTitle.trim()) {
      setHasTitleError(true);
      hasError = true;
    }

    // Перевірка, чи обрано користувача (значення має бути не null)
    if (selectedUser === null) {
      setHasUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const nextId = (todos.length ? Math.max(...todos.map(t => t.id)) : 0) + 1;

    const newsTodo: Todo = {
      id: nextId,
      title: todoTitle,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(u => u.id === selectedUser),
    };

    const addTodo = (newTodo: Todo) => {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    };

    addTodo(newsTodo);

    setTodoTitle('');
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitEvent => handleSubmit(submitEvent)}
      >
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            placeholder={'Enter a title'}
            onChange={titleChangeEvent =>
              setTodoTitle(titleChangeEvent.target.value)
            }
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            // Встановлюємо значення для select. Якщо selectedUser null, то порожній рядок.
            value={selectedUser !== null ? String(selectedUser) : ''}
            onChange={userChangeEvent =>
              setSelectedUser(
                userChangeEvent.target.value
                  ? +userChangeEvent.target.value
                  : null,
              )
            }
          >
            {/* value порожній рядок, щоб він не збігався з ID */}
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
