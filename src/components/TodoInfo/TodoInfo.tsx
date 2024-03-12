import { useState } from 'react';

const ALLOWED_CHARACTERS_REGEX = /^[a-zA-Zа-яА-Я0-9\s]*$/;

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface TodoInfoProps {
  todosData: TodoItem[];
  usersData: UsersItem[];
  setNewTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({
  usersData,
  todosData,
  setNewTodos,
}) => {
  const selectInitialValue = 'Choose a user';
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(selectInitialValue);
  const [isInputError, setIsInputError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);
  const [userId, setUserId] = useState(0);

  const theBiggestTodoId = Math.max(...todosData.map(item => item.id), 0);

  const [newCard, setNewCard] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue === '') {
      setIsInputError(true);
    }

    if (selectValue === selectInitialValue) {
      setIsSelectError(true);
    }

    if (inputValue === '' || selectValue === selectInitialValue) {
      return;
    }

    setSelectValue(selectInitialValue);
    setInputValue('');
    setNewTodos(prevTodos => [...prevTodos, newCard]);
    setUserId(0);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ALLOWED_CHARACTERS_REGEX.test(event.target.value)) {
      setInputValue(event.target.value);
      setNewCard(prevState => ({
        ...prevState,
        id: theBiggestTodoId + 1,
        title: event.target.value,
      }));
      if (event.target.value !== '') {
        setIsInputError(false);
      }
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    setNewCard(prevState => ({
      ...prevState,
      userId: +event.target.value,
    }));
    if (event.target.value !== selectInitialValue) {
      setIsSelectError(false);
    }

    setUserId(+event.target.value);
  };

  return (
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
        <span className="error">{isInputError && 'Please enter a title'}</span>
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
          {usersData.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <span className="error">{isSelectError && 'Please choose a user'}</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
