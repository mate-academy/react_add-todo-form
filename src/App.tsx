import { useState } from "react";
import "./App.scss";

import usersFromServer from "./api/users";
import todosFromServer from "./api/todos";

import { User } from "./types/User";
import { Todo } from "./types/Todo";
import { TodoList } from "./components/TodoList";

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

export const usersTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(usersTodos);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(0);
  const [formErrorsTitle, setFormErrorsTitle] = useState("");
  const [formErrorsUser, setFormErrorsUser] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setFormErrorsTitle("");
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setFormErrorsUser("");
  };

  const newId =
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

    const handleAddTodo = () => {

      if (!title) {
        setFormErrorsTitle("Please enter a title");
      }

      if (userId === 0) {
        setFormErrorsUser("Please choose a user");
      }

      if (!title || userId === 0) {
        return;
      }

      const newUser = getUser(userId);

      setTodos([
        ...todos,
        {
          id: newId,
          title,
          userId,
          completed: false,
          user: newUser || null,
        },
      ]);

      setTitle("");
      setUserId(0);
    };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {formErrorsTitle && <span className="error">{formErrorsTitle}</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            id="userId"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {formErrorsUser && <span className="error">{formErrorsUser}</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAddTodo}>
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
