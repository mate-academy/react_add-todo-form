import React from 'react';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

import './App.scss';

type State = {
  todoList: TodoWithUser[],
  title: string,
  user: string,
  isTitleCorrect: boolean,
};

const preparedTodos: TodoWithUser[] = todos.map((todo) => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    user: 'Leanne Graham',
    todoList: preparedTodos,
    isTitleCorrect: true,
  };

  checkTitle = (inputs: string[]) => {
    const alphabetEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const alphabetRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'];
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' '];

    return inputs.every(input => alphabetEn.includes(input.toLocaleLowerCase())
      || alphabetRu.includes(input.toLocaleLowerCase())
      || digits.includes(input.toLocaleLowerCase()));
  };

  changeTitle = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      title: event.currentTarget.value,
      isTitleCorrect: this.checkTitle(event.currentTarget.value.split('')) && (event.currentTarget.value.trim().length > 0),
    });
  };

  changeUser = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      user: event.currentTarget.value,
    });
  };

  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      isTitleCorrect,
      todoList,
      title,
      user,
    } = this.state;

    if (!title || !isTitleCorrect) {
      return 0;
    }

    const selectedUser = users.find(person => person.name === user);

    const newTodo: TodoWithUser = {
      userId: selectedUser?.id,
      id: todoList.length + 1,
      title: this.state.title,
      user: selectedUser || undefined,
    };

    return this.setState(state => ({
      todoList: [...state.todoList, newTodo],
      title: '',
      user: 'Leanne Graham',
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <form
          method="POST"
          onSubmit={this.submit}
          className="todo-form"
        >
          <label htmlFor="title">
            Your title
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.changeTitle}
              placeholder="enter Todo title"
              required
            />

            {!this.state.isTitleCorrect && (
              <div>
                *Please enter correct title (use only RU or EN alphabet and digits/spaces)
              </div>
            )}
          </label>

          <select name="user" id="users" value={this.state.user} onChange={this.changeUser}>
            {users.map((user) => <option value={user.name}>{user.name}</option>)}
          </select>

          <button className="todo-form__button" type="submit">
            Add Post
          </button>
        </form>

        <TodoList todoList={this.state.todoList} />
      </div>
    );
  }
}
