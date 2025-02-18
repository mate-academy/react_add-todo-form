import { useState } from 'react';
import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';
import { TodoItem } from '../../types/TodoItem';

interface TodoListProps {
  todos: TodoItem[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const selectInitialValue = 'Choose a user';
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(selectInitialValue);
  const [isInputError, setIsInputError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [todosData, setToodosData] = useState(todos);
  const theBiggestTodoId = Math.max(...todosData.map(item => item.id), 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let isFormValid = true;

    if (inputValue.trim() === '') {
      setIsInputError(true);
      isFormValid = false;
    } else {
      setIsInputError(false);
    }

    if (selectValue === selectInitialValue) {
      setIsSelectError(true);
      isFormValid = false;
    } else {
      setIsSelectError(false);
    }

    if (!isFormValid) {
      return;
    }

    const newCard: TodoItem = {
      id: theBiggestTodoId + 1,
      title: inputValue.trim(),
      completed: false,
      userId: +selectValue,
      user: usersFromServer.find(user => user.id === +selectValue) || {
        id: 0,
        name: '',
        username: '',
        email: '',
      },
    };

    setSelectValue(selectInitialValue);
    setInputValue('');
    setToodosData(prevTodos => [...prevTodos, newCard]);
    setUserId(0);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;

    setInputValue(newInputValue);
    if (newInputValue.trim() === '') {
      setIsInputError(true);
    } else {
      setIsInputError(false);
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = +event.target.value;
    const thisUser = usersFromServer.find(item => item.id === selectedUserId);

    setSelectValue(event.target.value);
    if (thisUser) {
      setUserId(selectedUserId);
    }

    if (selectedUserId === 0) {
      setIsSelectError(true);
    } else {
      setIsSelectError(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={handleTitleInput}
          />
          <span className="error">
            {isInputError && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          {'User: '}
          <select
            required
            value={userId}
            onChange={handleUserInput}
            data-cy="userSelect"
          >
            <option disabled value="0">
              {selectInitialValue}
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">
            {isSelectError && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section className="TodoList">
        {todosData.map(item => (
          <TodoInfo key={item.id} todo={item} />
        ))}
      </section>
    </>
  );
};
