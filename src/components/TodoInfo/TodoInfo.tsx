import React from 'react';
// Імпортуємо тип Todo з відповідного файлу для типізації пропсів
import { Todo } from '../../types/todos';
import { UserInfo } from '../UserInfo';

/**
 * Компонент TodoInfo відображає детальну інформацію про конкретне завдання.
 * @param todo - об'єкт завдання, який містить id, title, userId, completed, user та completed status.
 */
export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <div
      // Динамічно формуємо рядок класів:
      // - "TodoInfo" залишається завжди як базовий клас.
      // - Якщо todo.completed є true, через тернарний оператор додаємо модифікатор "TodoInfo--completed".
      // - Якщо false, додається порожній рядок, і стилі виконаного завдання не застосовуються.
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      // Додаємо data-атрибут з унікальним ідентифікатором завдання, який необхідний Cypress для тестів
      data-id={todo.id}
    >
      {/* Заголовок завдання з відповідним БЕМ-класом для стилізації та тестів */}
      <h3 className="TodoInfo__title">{todo.title}</h3>

      {/* Опис завдання */}
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
