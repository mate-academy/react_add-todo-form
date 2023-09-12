import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TitleInput } from './components/FormInput';
import { UserSelect } from './components/UserSelect';
import { SubmitButton } from './components/SubmitButton';

function getMaxId(currentTodos: TodoWithUser[]) {
  return Math.max(...currentTodos.map(({ id }) => id)) + 1;
}

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  function getUserById(userId: number) {
    return usersFromServer.find(({ id }) => id === userId) || null;
  }

  function addTodo(todo: TodoWithUser) {
    setTodos(currentTodo => [...currentTodo, todo]);
  }

  function resetForm() {
    setTodoTitle('');
    setSelectedUserId(0);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim() || !selectedUserId) {
      setHasTitleError(Boolean(!todoTitle));
      setHasSelectedUserError(Boolean(!selectedUserId));

      return;
    }

    addTodo({
      id: getMaxId(todos),
      title: todoTitle.trim(),
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <TitleInput
          todoTitle={todoTitle}
          handleInputChange={handleInputChange}
          hasTitleError={hasTitleError}
        />
        <UserSelect
          selectedUserId={selectedUserId}
          handleUserSelect={handleUserSelect}
          usersFromServer={usersFromServer}
          hasSelectedUserError={hasSelectedUserError}
        />
        <SubmitButton />
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
