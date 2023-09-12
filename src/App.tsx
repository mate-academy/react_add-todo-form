import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TitleInput } from './components/TitleInput';
import { UserSelect } from './components/UserSelect';
import { SubmitButton } from './components/SubmitButton';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userSelectId, setUserSelectId] = useState(0);
  const [hasUserSelectedId, setHasUserSelectedId] = useState(false);
  const [preparedTodos, setPreparedTodos] = useState(initialTodos);

  function getUserById(userId: number) {
    return usersFromServer.find(({ id }) => id === userId) || null;
  };

  function onSubmit(todo: TodoWithUser) {
    setPreparedTodos(currentTodo => [...currentTodo, todo]);
  };

  function formReset() {
    setTodoTitle('');
    setUserSelectId(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelectId(+event.target.value);
    setHasUserSelectedId(false);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim() || !userSelectId) {
      setHasTitleError(Boolean(!todoTitle));
      setHasUserSelectedId(Boolean(!userSelectId));

      return;
    }

    const todoIds = preparedTodos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoIds) + 1;

    onSubmit({
      id: maxTodoId,
      title: todoTitle.trim(),
      completed: false,
      userId: userSelectId,
      user: getUserById(userSelectId),
    });

    formReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <TitleInput
          todoTitle={todoTitle}
          handleInputChange={handleInputChange}
          hasTitleError={hasTitleError}
        />
        <UserSelect
          userSelectId={userSelectId}
          handleUserSelect={handleUserSelect}
          usersFromServer={usersFromServer}
          hasUserSelectedId={hasUserSelectedId}
        />
        <SubmitButton />
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
