import React from 'react';
import { TodoItem } from './TodoItem';
import { ShapeTodosList } from '../Shapes/Shapes';
import './TodoList.css';

export const TodosList = props => (
  <ul className="TodoList">
    {
      props.todos.map(
        item => (
          <TodoItem
            key={item.id}
            item={item}
            flag={props.flag}
            required
          />
        ),
      )
    }
  </ul>
);

TodosList.propTypes = ShapeTodosList.isRequired;
