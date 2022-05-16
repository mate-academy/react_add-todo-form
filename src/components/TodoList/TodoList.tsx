import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Todos } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="Todo">
    <h1 className="Todo__title">Static list of todos:</h1>

    <ul className="Todo__list">
      <TransitionGroup className="todo-list">
        {todos.map((todo) => (
          <CSSTransition
            key={todo.id}
            timeout={500}
            classNames="item"
          >
            <li
              key={todo.id}
              className={'Todo__item'
                + `${todo.completed
                  ? ' Todo__item--completed'
                  : ' Todo__item--not_completed'}`}
            >
              <TodoInfo
                title={todo.title}
                status={todo.completed}
                user={todo.user}
              />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  </div>
);
