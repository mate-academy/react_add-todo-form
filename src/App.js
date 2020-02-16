import React from 'react';
import './App.css';
import { todos as todosFromServer } from './api/todos';
import { users } from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

export class App extends React.Component {
  state = {
    todos: [],
    todoId: 0,
    inputValue: '',
    selectValue: '0',
  };

  componentDidMount() {
    const preparedTodos = todosFromServer.map((todo) => {
      const user = users.find(it => it.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });

    let todoId = 0;

    todosFromServer.forEach((todo) => {
      if (todo.id > todoId) {
        todoId = todo.id;
      }
    });

    this.setState({
      todos: preparedTodos,
      todoId: todoId + 1,
    });
  }

  handleInputChange = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    });
  };

  handleSelectChange = (evt) => {
    this.setState({
      selectValue: evt.target.value,
    });
  };

  handleFormSubmit = () => {
    const { inputValue, selectValue, todoId } = this.state;

    const user = users.find(it => it.id === Number(selectValue));

    const newTodo = {
      userId: Number(selectValue),
      title: inputValue,
      completed: false,
      user,
      id: todoId,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
      inputValue: '',
      selectValue: '0',
      todoId: prevState.todoId + 1,
    }));
  };

  render() {
    const { todos, inputValue, selectValue } = this.state;

    return (
      <div className="App">
        <h1>Add Todo Form</h1>
        <p>
          <span>Todos: </span>
          {todos.length}
        </p>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <hr />

        <NewTodo
          inputValue={inputValue}
          selectValue={selectValue}
          onInputChange={this.handleInputChange}
          onSelectChange={this.handleSelectChange}
          users={users}
          onFormSubmit={this.handleFormSubmit}
        />

        <TodoList todos={todos} />
      </div>
    );
  }
}
