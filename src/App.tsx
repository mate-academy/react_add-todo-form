import {
  FC,
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from 'react';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => {
    return user.id === userId;
  });

  return foundUser || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [formFields, setFormFields] = useState({
    todoTitle: '',
    selectedUserId: 0,
  });
  const [formValidity, setFormValidity] = useState({
    isTitleValid: true,
    isUserSelected: true,
  });
  const [todos, setTodos] = useState([...todosWithUsers]);

  const largestTodoId = useMemo(() => {
    return Math.max(...todos.map(todo => todo.id));
  }, [todos]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const { todoTitle, selectedUserId } = formFields;

    if (!todoTitle || !selectedUserId) {
      setFormValidity({
        isTitleValid: !!todoTitle,
        isUserSelected: !!selectedUserId,
      });

      return;
    }

    const newTodo: Todo = {
      id: largestTodoId + 1,
      title: todoTitle,
      userId: selectedUserId,
      completed: false,
      user: getUser(selectedUserId),
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
    setFormFields({
      todoTitle: '',
      selectedUserId: 0,
    });
  }

  function handleChange<
    K extends keyof typeof formFields,
    T extends keyof typeof formValidity,
  >(
    formField: K,
    newValue: string | number,
    validityField: T,
  ): void {
    setFormFields({
      ...formFields,
      [formField]: newValue,
    });

    if (!formValidity[validityField]) {
      setFormValidity({
        ...formValidity,
        [validityField]: true,
      });
    }
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    const input = event
      .target
      .value
      .replace(/[^a-z\p{sc=Cyrillic} \d]/giu, '');

    handleChange('todoTitle', input, 'isTitleValid');
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    handleChange('selectedUserId', +event.target.value, 'isUserSelected');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            name="todoTitle"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={formFields.todoTitle}
            onChange={handleTitleChange}
          />

          {!formValidity.isTitleValid
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="selectedUserId"
              data-cy="userSelect"
              value={formFields.selectedUserId}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!formValidity.isUserSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
