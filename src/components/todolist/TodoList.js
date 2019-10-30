import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import TodoTable from '../TodoTable/TodoTable';


class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoHistory: [...this.props.todos],
      selectedPerson: 'select-person',
      newTodo: '',
      tempInputText: '',
      placeHolder: 'Write your new Todo for today',
      errorStyle: false,
    }
  }

  changeSelectedPerson = (event) => {
    this.setState({
      selectedPerson: event.target.value
    })
  }

  inputChange = (event) => {
    this.setState({
      tempInputText: event.target.value, errorStyle: false
    })
  }

  submitForm = async (event) => {
    event.preventDefault();
    if (this.state.selectedPerson === 'select-person') {
      this.setState({
        placeHolder: 'Please choose the name of person',
        errorStyle: true,
        tempInputText: ''
      })
      return
    }

    if (this.state.tempInputText === '') {
      this.setState({
        placeHolder: 'Please write your todo task for today', errorStyle: true
      })
      return
    }

    await this.setState(prev => {
      return {
        ...prev,
        newTodo: prev.tempInputText,
        todoId: prev.todoId + 1,
        error: null,
      }
    })

    const newTodo = {
      name: this.state.selectedPerson,
      title: this.state.newTodo,
      id: this.state.todoHistory.length + 1
    };

    this.setState(prev => {
      return {
        ...prev,
        todoHistory: [...prev.todoHistory, newTodo],
        tempInputText: '',
        placeHolder: 'Write your new Todo for today',
        selectedPerson: 'select-person'
      }
    })
  }

  render() {

    return (
      <>
        <Form onSubmit={this.submitForm}>
          <Form.Group widths='equal'>
            <Form.Input
              value={this.state.tempInputText}
              onChange={this.inputChange}
              onFocus={this.inputChange}
              id='form-subcomponent-shorthand-input-first-name'
              label='Create Todo'
              placeholder={this.state.placeHolder}
              className={this.state.errorStyle ? 'error' : ''}
            />
          </Form.Group>
          <select
            value={this.state.selectedPerson}
            onChange={this.changeSelectedPerson}
          >
            <option value="select-person">Select person</option>
            {this.props.users.map(user => <option value={user.name} key={user.id}>{user.name}</option>)}
          </select>
          <Button content='Submit' />
        </Form>
        <TodoTable todos={this.state.todoHistory}/>
      </>
    )
  }
}

TodoList.propTypes = {
  users: PropTypes.array.isRequired,
  todos: PropTypes.array.isRequired,
}

export default TodoList;
