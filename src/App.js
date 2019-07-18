import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todosMap: this.getTodosWithUsers(),
    };
  }

  getTodosWithUsers = () => {
    const todosMap = todos.map(todo => ({
      ...todo,
      userName: users.filter(user => user.id === todo.userId)
        .map(user => user.name),

    }));

    return todosMap;
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todosMap: [
        ...prevState.todosMap,
        {
          userName: todo.userName,
          title: todo.title,
          id: prevState.todosMap.length + 1,
          completed: false,
          userId: users.filter(user => user.name === todo.userName)
            .map(user => user.id)
            .join(''),
        },
      ],
    }));
  }

  render() {
    const { todosMap } = this.state;

    return (
      <div className="App">
        <NewTodo
          users={users}
          onSubmit={this.addTodo}
        />
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={todosMap} />
      </div>
    );
  }
}

export default App;
