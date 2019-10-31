import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import NewTask from './components/NewTask';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todosList: this.usersTodo(),
    };
  }

  usersTodo = () => todos.map(todo => ({
    ...todo,
    userName: users.filter(user => user.id === todo.userId)
      .map(user => user.name),

  }));

  addTodo = (todo) => {
    this.setState(prevState => ({
      todosList: [
        ...prevState.todosList,
        {
          userName: todo.userName,
          title: todo.title,
          id: prevState.todosList.length + 1,
          completed: false,
          userId: users.filter(user => user.name === todo.userName)
            .map(user => user.id)
            .join(''),
        },
      ],
    }));
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <NewTask
          users={users}
          onSubmit={this.addTodo}
        />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
