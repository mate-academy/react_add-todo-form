import React from 'react';
import NewTask from '../NewTask/NewTask';
import users from '../../api/users';
import todos from '../../api/todos';
import './TodoList.css';

function getTodosWithUsers() {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId),
  }));
}

class TodoList extends React.Component {
  state = {
    listOfTodos: getTodosWithUsers(todos, users),
  };

  addNewTask = (task) => {
    this.setState(prevState => ({
      listOfTodos: [...prevState.listOfTodos, task],
    }));
  };

  render() {
    const columns = ['#', 'task', 'status', 'user'];

    return (
      <>
        <table className="app__table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column} className="th__class">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            { (
              this.state.listOfTodos.map(todo => (
                <tr key={todo.id}>
                  <td className="td__class">{todo.id}</td>
                  <td className="td__class">{todo.title}</td>
                  {/* eslint-disable-next-line max-len */}
                  <td className="td__class">{todo.completed ? '\u2714' : '\u2718'}</td>
                  <td className="td__class">{todo.user.username}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <NewTask
          users={users}
          listOfTodos={this.state.listOfTodos}
          addNewTask={this.addNewTask}
        />
      </>
    );
  }
}

export default TodoList;
