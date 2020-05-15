import React, { Component } from 'react';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';   

import './app.css';

export default class App extends Component {

  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee', 'Leane Graham', true),
      this.createTodoItem('Make Awesome App', 'Leane Graham', true),
    ],

    
  };

  createTodoItem(toDo, user, completed) {
    return {
      toDo,
      user,
      id: this.maxId++,
      completed,
    }
  }

  addItem = (todo, user) => {
    
    const newItem = this.createTodoItem(todo, user);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });

  };


  render() {

    const { todoData } = this.state;

    return (
      <div className="todo-app">
         <div className="App">
    </div>
    <h1>Add todo form</h1>
      <ItemAddForm onItemAdded={this.addItem}/>
      <TodoList
          todos={todoData}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
  </div>
  );
  }
};
