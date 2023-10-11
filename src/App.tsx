import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [posts, setPosts] = useState([
    ...todosFromServer,
  ]);
  const [textInput, setTextInput] = useState('');
  const [selectedUserCount, setSelectedUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(
    usersFromServer[selectedUserCount],
  );

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserNotSelected, setIsUserNotSelected] = useState(false);

  const addNewPost = () => {
    if (textInput.trim() === '') {
      setIsTitleEmpty(true);
    } else {
      setIsTitleEmpty(false);
    }

    if (selectedUserCount === 0) {
      setIsUserNotSelected(true);
    } else {
      setIsUserNotSelected(false);
    }

    if (textInput.trim() !== '' && selectedUserCount !== 0) {
      const maxId = Math.max(...posts.map((post) => post.id));

      setPosts([
        ...posts,
        {
          id: maxId + 1,
          title: textInput,
          completed: true,
          userId: selectedUser.id,
        },
      ]);

      setTextInput('');
      setSelectedUserCount(0);
    }
  };

  const hanldeTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
    setIsTitleEmpty(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedUserCount(Number(selectedValue));
    setSelectedUser(usersFromServer[Number(selectedValue) - 1]);
    setIsUserNotSelected(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getUserName = (userId: {}) => {
    const men = usersFromServer.find((user) => user.id === userId);

    return men ? men.name : 'Unknown User';
  };

  const getUserEmail = (userId: {}) => {
    const men = usersFromServer.find((user) => user.id === userId);

    return men ? men.email : 'Unknown Email';
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="inputLabel">Title: </label>
          <input
            type="text"
            id="inputLabel"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={textInput}
            onChange={hanldeTitleChange}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUserCount}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserNotSelected
          && <span className="error">Please select a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addNewPost}
        >
          Add
        </button>
      </form>

      <TodoList
        posts={posts}
        getUserName={getUserName}
        getUserEmail={getUserEmail}
      />
    </div>
  );
};
