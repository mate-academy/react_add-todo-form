import React from 'react';
import './TodoList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import TodoListPropTypes from './TodoListPropType';

const TodoList = ({ todos }) => (
  <div className="list">
    {todos.map(item => (
      <Card
        border="dark"
        bg="info"
        className="list__item"
        key={item.id}
      >
        <div
          key={item.id}
        >
          {item.title}
        </div>
        <span>
          Status:
          {
            item.copmpleted
              ? ' done'
              : ' in process'
          }
        </span>
        <div>{item.name}</div>
      </Card>
    ))}
  </div>
);

TodoList.propTypes = TodoListPropTypes;

export default TodoList;
