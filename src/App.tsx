import "./App.scss";
import { useState } from "react";
import usersFromServer from "./api/users";
import todosFromServer from "./api/todos";
import { TodoList } from "./components/TodoList";

let isEmptyTitle = false;
let isEmptySelectedUser = false;
const users = [...usersFromServer];
let todos = [...todosFromServer].map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId),
}));
const maxId = todos.map((todo) => todo.id).sort((a, b) => b - a)[0];

export const App = () => {
  const [newTitle, setNewTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState(0);
  const [latstTaskId, setLastTaskId] = useState(maxId);
  const [afterSubmit, setAfterSubmit] = useState(true);

  if (afterSubmit) {
    isEmptyTitle = false;
    isEmptySelectedUser = false;
  } else {
    isEmptyTitle = !newTitle;
    isEmptySelectedUser = !selectedUser;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedUser || !newTitle) {
      setAfterSubmit(false);
      return;
    }

    todos = [
      ...todos,
      {
        id: latstTaskId + 1,
        title: newTitle,
        completed: false,
        userId: selectedUser,
        user: users.find((user) => user.id === selectedUser),
      },
    ];
    setAfterSubmit(true);
    setLastTaskId(latstTaskId + 1);
    setSelectedUser(0);
    setNewTitle("");
  };
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder=""
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          {isEmptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => setSelectedUser(+event.target.value)}
            required
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isEmptySelectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
