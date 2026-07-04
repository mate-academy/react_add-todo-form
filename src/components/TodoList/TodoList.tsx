// Імпортуємо потрібний компонент для відображення одного завдання
import { TodoInfo } from '../TodoInfo';
// Імпортуємо тип для Todo, якщо він є (наприклад, з api)
import { Todo } from '../../types/todos';

// Описуємо, які пропси очікує наш компонент TodoList
interface Props {
  todos: Todo[]; // масив завдань
}

// Оголошуємо компонент TodoList, який приймає props типу Props
export const TodoList = ({ todos }: Props) => {
  return (
    // Головний контейнер для списку завдань
    <section className="TodoList">
      {/* Перебираємо масив todos за допомогою методу map */}
      {todos.map(todo => (
        /* Для кожного завдання рендеримо компонент TodoInfo,
           обов'язково передаючи унікальний key та саме завдання в пропси */
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
