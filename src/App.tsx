import './App.scss';
import { useState } from 'react';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

// eslint-disable-next-line @typescript-eslint/no-shadow

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); /*список todos*/
  const [title, setTitle] = useState(''); /*заголовок новой задачи*/
  const [userId, setUserId] = useState(0); /*выбранного пользователя (userId)*/
  const [isTouched, setIsTouched] =
    useState(
      false,
    ); /*для валидации, взаимодействовал ли пользователь с формой*/

  const selectedUser = users.find(user => user.id === userId);
  /*ищем пользователя по userId*/

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault(); /*предостварщаем перезапуск страницы*/
    setIsTouched(true); /*включаем валидацию*/

    if (!title.trim() || userId === 0) {
      return; /*если заглавие пустое и пользователь не выбран - ничего не делаем*/
    }

    const cleanedTitle = title.replace(/[^\p{L}0-9 ]/giu, '');
    /*очищаем заглавие от специальных символов*/

    /*создавем новый todo*/
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      /*Якщо список todos не порожній: беремо максимальний id і додаємо 1.
Якщо список порожній: id = 1.
Це потрібно, щоб уникнути конфліктів id при рендерінгу (React вимагає унікальні ключі).
*/
      title: cleanedTitle,
      userId,
      completed: false,
      user: selectedUser!,
      /*сам об’єкт користувача (selectedUser!).
! вказує TypeScript, що ми впевнені: це значення не є undefined*/
    };

    /*добавляем в массив, очищаем поля*/
    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setIsTouched(false);
  };

  /*Повертають isTouched у false,
щойно користувач починає щось змінювати — щоб прибрати повідомлення про помилки.*/

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (isTouched) {
      setIsTouched(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (isTouched) {
      setIsTouched(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChange={handleTitleChange}
          />
          {isTouched && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isTouched && userId === 0 && (
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
