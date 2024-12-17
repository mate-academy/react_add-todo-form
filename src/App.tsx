import { useState, ChangeEvent, useEffect } from "react";
import "./App.scss";
import { TodoList } from "./components/TodoList";
import { getUser, tasks } from "./helpers.tsx/helpers";
import usersFromServer from "./api/users";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}

export const App = () => {
  const [userId, setUserId] = useState("0");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [todos, setTodos] = useState<Todo[] | []>([]);

  useEffect(() => {
    setTodos(tasks);
  }, []);

  let maxId = Math.max(...todos.map((o) => o.id)) + 1;

  const users = usersFromServer;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value);
    setErrorTitle(false); // Reset error when user starts typing again
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setErrorUser(false); // Reset error when user starts typing again
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (taskDescription === "") {
      if (userId === "0") {
        setErrorUser(true);
        setErrorTitle(true);
      } else {
        setErrorTitle(true);
      }

      return;
    }

    if (userId === "0") {
      setErrorUser(true);

      return;
    }

    const newTask = {
      id: maxId,
      title: taskDescription,
      completed: false,
      userId: +userId,
      user: getUser(+userId),
    };

    setTodos([...todos, newTask]);
    setTaskDescription("");
    setUserId("0");
    maxId += 1;
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">
            {"Title: "}
            <input
              id="titleInput"
              value={taskDescription}
              onChange={handleInputChange}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
            />
            {errorTitle && <span className="error"> Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {"User: "}
            <select
              id="userSelect"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map((user) => {
                return <option value={user.id}>{user.name}</option>;
              })}
            </select>
          </label>
          {errorUser && <span className="error"> Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
