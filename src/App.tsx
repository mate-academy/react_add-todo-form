import './App.scss';

// Імпортуємо початкові дані про користувачів та завдання з файлів API
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
// Імпортуємо хук useState для керування станом у компоненті
import { useState } from 'react';
// Імпортуємо компонент списку завдань та тип даних Todo
import { TodoList } from './components/TodoList';
import { Todo } from './types/todos';

export const App = () => {
  // --- СТАН И КОМПОНЕНТА (STATES) ---

  // Зберігаємо масив користувачів та список усіх завдань
  const [users] = useState(usersFromServer);

  // Зберігаємо поточне значення текстового інпуту (назва завдання)
  const [title, setTitle] = useState('');
  // Зберігаємо ID обраного користувача (0 означає, що користувача ще не обрано)
  const [userId, setUserId] = useState(0);

  // Прапорці для відображення помилок валідації форми
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  // Явно вказуємо дженерик <Todo[]> для useState, щоб зафіксувати правильний тип даних
  const [todos, setTodos] = useState<Todo[]>(
    // Перебираємо серверні завдання і додаємо до кожного об'єкт користувача
    todosFromServer.map(todo => ({
      ...todo,
      // Шукаємо користувача, а якщо не знайшли — додаємо дефолтний об'єкт
      user: usersFromServer.find(user => user.id === todo.userId) || {
        id: 0,
        name: '',
        username: '',
        email: '',
      },
    })),
  );

  // --- ОБРОБНИК ВІДПРАВКИ ФОРМИ ---
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Зупиняємо стандартне перезавантаження сторінки браузером при сабміті
    event.preventDefault();

    // Валідація: перевіряємо, чи заповнене поле title (якщо порожнє — вмикаємо помилку)
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    // Валідація: перевіряємо, чи обрано користувача (якщо залишається 0 — вмикаємо помилку)
    if (userId === 0) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    // Якщо обидва поля успішно пройшли валідацію, створюємо нове завдання
    if (title && userId !== 0) {
      // 1. Шукаємо найбільший ID у масиві todos, щоб новий ID був унікальним та інкрементним
      const maxId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
      const nextId = maxId + 1;

      // 2. Знаходимо повний об'єкт користувача з масиву users за його ID, який обрав автор
      const foundUser = users.find(user => user.id === userId);
      // Захисна перевірка: якщо користувача раптом не знайдено, перериваємо виконання

      if (!foundUser) {
        return;
      }

      // 3. Формуємо новий об'єкт завдання відповідно до структури типу Todo
      const newTodo = {
        id: nextId, // Новий унікальний ідентифікатор (найбільший + 1)
        title, // Назва завдання, яку ввів користувач в інпут
        completed: false, // Свіжостворене завдання за замовчуванням завжди не виконано
        userId, // Ідентифікатор користувача, який відповідає за це завдання
        user: foundUser, // Повний об'єкт користувача (id, name, username, email)
      };

      // Додаємо нове завдання в кінець нашого списку, створюючи новий масив (immutability)
      setTodos([...todos, newTodo]);

      // Очищаємо поля форми до початкового стану після успішного додавання
      setTitle('');
      setUserId(0);
    }
  };

  // --- JSX РОЗМІТКА КОМПОНЕНТА ---
  return (
    <div className="App">
      <h1>Add todo form</h1>

      {/* Форма з обробником події onSubmit */}
      <form onSubmit={handleSubmit}>
        {/* Поле для введення назви завдання */}
        <div className="field">
          <input
            type="text"
            // Атрибут data-cy допомагає Cypress стабільно знаходити цей інпут у тестах
            data-cy="titleInput"
            // ДОДАНО: Атрибут placeholder, який вимагає тест Cypress як підказку для користувача
            placeholder="Enter todo title"
            // Зв'язуємо значення інпуту зі станом компонента
            value={title}
            // При введенні тексту оновлюємо стан title та приховуємо помилку валідації
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {/* Умовний рендеринг: якщо titleError true, виводимо текст помилки */}
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        {/* Випадаючий список для вибору користувача */}
        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            // При виборі користувача трансформуємо рядок у число і зберігаємо в стан
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            {/* Дефолтна опція, яка заблокована для повторного вибору */}
            <option value="0" disabled>
              Choose a user
            </option>
            {/* Динамічно рендеримо список користувачів, отриманих з сервера */}
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {/* Умовний рендеринг: якщо userError true, виводимо текст помилки */}
          {userError && <span className="error">Please choose a user</span>}
        </div>

        {/* Кнопка відправки форми */}
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {/* Передаємо оновлений масивtodos у компонент списку для відображення */}
      <TodoList todos={todos} />
    </div>
  );
};
