import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function getUserId(id: number) {
  return usersFromServer.find(person => id === person.id);
}

const todosWithUser = todosFromServer.map(todo => {
  const user = getUserId(todo.userId);

  return {
    ...todo,
    user,
  };
});

function getMaxId(todos: Todo[]) {
  const ids = todos.map(todo => todo.id);
  const newId = Math.max(...ids) + 1;

  return newId;
}

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [formValues, setFormValues] = useState({
    todoTitle: '',
    todoUserId: '0',
  });
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    userError: false,
  });

  function formReset() {
    setFormValues({
      todoTitle: '',
      todoUserId: '0',
    });
  }

  function handleSubmitErrors() {
    if (!formValues.todoTitle.trim()) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        titleError: true,
      }));
    }

    if (!+formValues.todoUserId) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        userError: true,
      }));
    }
  }

  function handleChanges(event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [event.target.name]: event.target.value,
    }));
    if (formErrors.titleError && event.target.name === 'todoTitle') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        titleError: false,
      }));
    }

    if (formErrors.userError && event.target.name === 'todoUserId') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        userError: false,
      }));
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const user = getUserId(+formValues.todoUserId);

    const newTodo = {
      id: getMaxId(todos),
      title: formValues.todoTitle,
      completed: false,
      userId: +formValues.todoUserId,
      user,
    };

    handleSubmitErrors();

    if (!formValues.todoTitle.trim() || !+formValues.todoUserId) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, newTodo]);

    formReset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>
          <input
            type="text"
            id="todoTitle"
            data-cy="titleInput"
            name="todoTitle"
            placeholder="Enter a title"
            value={formValues.todoTitle}
            onChange={handleChanges}
          />
          {formErrors.titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todoUserId">User: </label>
          <select
            data-cy="userSelect"
            id="todoUserId"
            name="todoUserId"
            value={formValues.todoUserId}
            onChange={handleChanges}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {formErrors.userError
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
