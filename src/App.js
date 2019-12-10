import React from 'react';
import './App.css';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

function getTodosWithUsers(allTodos, allUsers) {
  return allTodos.map(oneTodo => ({
    ...oneTodo,
    user: allUsers.find(person => person.id === oneTodo.userId),
  }));
}

class App extends React.Component {
  state = { fullTodos: getTodosWithUsers(todos, users) };

  addTodo = oneTodo => (
    this.setState(prevState => ({
      fullTodos: [...prevState.fullTodos, {
        ...oneTodo,
        id: prevState.fullTodos.length + 1,
      }],
    }))
  );

  render() {
    const { fullTodos } = this.state;

    return (
      <section className="todos">
        <NewTodo
          addTodo={this.addTodo}
        />

        <table className="table">
          <thead>
            <tr>
              <th className="table__heading">ID</th>
              <th className="table__heading">Title</th>
              <th className="table__heading">User</th>
            </tr>
          </thead>
          <tbody>
            {fullTodos.map(todo => (
              <tr key={todo.id}>
                <td className="table__item">{todo.id}</td>
                <td className="table__item">{todo.title}</td>
                <td className="table__item">{todo.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default App;
