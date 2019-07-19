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
      }
    ));

    this.setState({
      todosList: [...todosWithUsers],
    });
  }

  handleChangeTodo = (id) => {
    const newTodos = [...this.state.todosList];
    const index = newTodos.findIndex(todo => todo.id === id);
    const todo = newTodos[index];

    todo.completed = !todo.completed;
    newTodos.splice(index, 1, todo);

    this.setState({
      todosList: [...newTodos],
    });
  }

  handleSubmit = (newTodo) => {
    this.setState(prevState => (
      {
        todosList: [...prevState.todosList, newTodo],
      }
    ));
  }

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>
        <NewTodo
          todos={todosList}
          users={users}
          onSubmitForm={this.handleSubmit}
        />

        <TodoList
          todos={todosList}
          onChangeTodoStatus={this.handleChangeTodo}
        />
      </div>
    );
  }
}

export default App;
