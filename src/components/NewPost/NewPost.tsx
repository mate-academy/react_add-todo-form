import React, { useState, useEffect } from 'react';
import Todo from '../../types/Todo';
import usersFromServer from '../../api/users';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[],
}

export const NewPost: React.FC<Props> = ({
  setTodos,
  todos,
}) => {
  const getNewId = () => Math.max(...todos.map(todo => todo.id)) + 1;

  const { 0: isSubmitted, 1: setIsSubmitted } = useState(false);
  const { 0: todo, 1: setTodo } = useState<Todo>({
    id: getNewId(),
    title: '',
    completed: false,
    userId: 0,
  });

  useEffect(() => {
    setTodo(prevTodo => ({
      ...prevTodo,
      id: getNewId(),
    }));
  }, [todos]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = event.target;

    setTodo((prevTodo: Todo) => ({
      ...prevTodo,
      [name]: name === 'userId' ? parseInt(value, 10) : value,
    }));
  };

  const resetForm = () => {
    setTodo({
      title: '',
      id: getNewId(),
      userId: 0,
      completed: false,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitted(true);

    const trimmedTitle = todo.title.trim();

    if (trimmedTitle && todo.userId) {
      setIsSubmitted(false);

      const trimmedTodo = {
        ...todo,
        title: trimmedTitle,
      };

      setTodos((prevTodos: Todo[]) => [...prevTodos, trimmedTodo]);
      resetForm();
    }
  };

  return (
    <form
      method="POST"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      <div className="field">
        <input
          name="title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={todo.title}
          onChange={(event) => handleChange(event)}
        />
        {isSubmitted && !todo.title.trim() && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          name="userId"
          data-cy="userSelect"
          onChange={(event) => handleChange(event)}
          value={todo.userId}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {isSubmitted && todo.userId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
