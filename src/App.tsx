import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { UserSelect } from './components/UserSelect/UserSelect';
import { useState } from 'react';
import { FormType, Todo } from './types';

export const App = () => {
  const [formState, setFormState] = useState<FormType>({
    titleInput: '',
    selectedUser: 0,
    titleInputError: false,
    selectedUserError: false,
  });
  const [todoList, setTodoList] = useState<Todo[]>(todosFromServer);

  const maxId = Math.max(...todosFromServer.map(todo => todo.id));

  const reset = () => {
    setFormState({
      titleInput: '',
      selectedUser: 0,
      titleInputError: false,
      selectedUserError: false,
    });
  };

  const validation = () =>
    !formState.titleInput || formState.selectedUser === 0 ? false : true;

  const newTodo: Todo = {
    id: maxId + 1,
    title: formState.titleInput,
    completed: false,
    userId: formState.selectedUser,
  };

  const addTodo = (todo: Todo) => {
    setTodoList([...todoList, todo]);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTodo(newTodo);
    reset();
  }

  const listOfTodosWithUser = todoList.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        id="todo"
        onSubmit={event => {
          if (validation()) {
            handleSubmit(event);
          } else {
            event.preventDefault();

            if (!formState.titleInput && !formState.selectedUser) {
              setFormState({
                ...formState,
                titleInputError: true,
                selectedUserError: true,
              });
            } else if (!formState.titleInput && formState.selectedUser) {
              setFormState({
                ...formState,
                titleInputError: true,
              });
            } else if (formState.titleInput && !formState.selectedUser) {
              setFormState({
                ...formState,
                selectedUserError: true,
              });
            }
          }
        }}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={formState.titleInput}
            onChange={event => {
              setFormState({
                ...formState,
                titleInput: event.target.value.trimStart(),
                titleInputError: false,
              });
            }}
          />

          {formState.titleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <UserSelect
            form={formState}
            selectedValue={formState.selectedUser}
            onChange={setFormState}
            users={usersFromServer}
          />

          {formState.selectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={listOfTodosWithUser} />
    </div>
  );
};
