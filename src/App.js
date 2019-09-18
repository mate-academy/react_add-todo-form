import React from 'react';
import './App.css';
import users from './api/users';
import FormControll from './api/components/FormControll/FormControll';
import TodoList from './api/components/TodoList/TodoList';
import todosWithUsers from './api/function/dataFromServer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todosToRender: [...todosWithUsers],
      users: [...users],
      selectedUser: 0,
      inputValue: '',
      textError: '',
    };
  }

  handleClick = () => {
    const { selectedUser, inputValue } = this.state;

    if (!selectedUser && !inputValue) {
      this.setState({
        textError: 'Error: Please, input title task and select person',
      });
    } else if (!selectedUser && inputValue) {
      this.setState({
        textError: 'Error: Please, select person',
      });
    } else if (selectedUser && !inputValue) {
      this.setState({
        textError: 'Error: Please, input title task',
      });
    }

    else {
      if (inputValue.length < 15) {
        this.setState({
          textError: 'Error: The small length of task. Min length 15 symbol',
        });
      }

      else {
        this.setState((prevState) => (
          {
            inputValue: '',
            selectedUser: 0,
            textError: '',
            todosToRender: [
              ...prevState.todosToRender,
              {
                userId: prevState.selectedUser,
                id: prevState.todosToRender.length + 1,
                title: prevState.inputValue,
                completed: true,
                user: prevState.users.find(person => (
                  person.id === prevState.selectedUser
                )),
              },
            ],
          }
        ));
      }
    }
  }

  handleInput = ({ target }) => (
    this.setState({
      inputValue: target.value,
    })
  );

  handleSelected = ({ target }) => (
    this.setState({
      selectedUser: Number(target.value),
    })
  );

  render() {
    const {
      inputValue,
      textError,
      selectedUser,
      todosToRender,
      users,
    } = this.state;

    return (
      <>
        <h1 className="page-title">
          {'Todos list consist from'
          + ' '
          + todosToRender.length
          + ' '
          + 'todo'
          }
        </h1>

        <FormControll
          users={users}
          handleInput={this.handleInput}
          handleClick={this.handleClick}
          handleSelected={this.handleSelected}
          selectedUser={selectedUser}
          textError={textError}
          inputValue={inputValue}
        />

        <TodoList
          todos={todosToRender}
        />

      </>
    );
  }
}

export default App;
