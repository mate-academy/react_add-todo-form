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
  const theNextTodoId = Math.max(...todosData.map(item => item.id), 0);

  const [newCard, setNewCard] = useState<TodoItem>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      setIsInputError(true);
    }

    if (selectValue === selectInitialValue) {
      setIsSelectError(true);
    }

    if (inputValue.trim() === '' || selectValue === selectInitialValue) {
      return;
    }

    setSelectValue(selectInitialValue);
    setInputValue('');
    setToodosData(prevTodos => [...prevTodos, newCard]);
    setUserId(0);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;

    setInputValue(newInputValue);
    setNewCard(prevState => ({
      ...prevState,
      id: theNextTodoId + 1,
      title: newInputValue,
    }));
    if (newInputValue.trim() !== '') {
      setIsInputError(false);
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const thisUser = usersFromServer.find(
      item => item.id === +event.target.value,
    );

    setSelectValue(event.target.value);
    if (thisUser) {
      setNewCard(prevState => ({
        ...prevState,
        userId: +event.target.value,
        user: thisUser,
      }));
    }

    if (event.target.value !== selectInitialValue) {
      setIsSelectError(false);
    }

    setUserId(+event.target.value);
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
