import React from 'react';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/todoList/TodoList';
import NewTodo from './components/newTodo/NewTodo';

class App extends React.Component {
  state = {
    todosList: [],
  }

  componentWillMount() {
    const todosWithUsers = [...todos].map(todo => (
      {
        ...todo,
        user: users.find(person => person.id === todo.userId),
        updateAppState: config => this.setState(config),
      }
    ));

    this.setState({
      todosList: [...todosWithUsers],
    });
  }

  updateAppState = (config) => {
    this.setState(config);
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>
        <NewTodo
          todos={todosList}
          users={users}
          updateAppState={this.updateAppState}
        />

        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
