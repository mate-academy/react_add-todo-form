import React, { Component } from 'react';
import users from '../api/users';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: '',
    userName: '',
    emptyValue: false,
    inputValue: false
  };

  onChangeSelect = (event) => {
    
    this.setState({
      userName: event.target.value,
      emptyValue: false});
    console.log(this.state.emptyValue);
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
      inputValue: false
    });
    
  };

  onSubmit = (e) => {
    
    e.preventDefault();

    if(this.state.userName === '') {
      if(this.state.label === '') {
        this.setState({
          inputValue: 'true',
          emptyValue: 'true'
  
        });
        return;
      }
      this.setState({
        emptyValue: 'true'

      });
   
      return;
    };

    if(this.state.label === '') {
      this.setState({
        inputValue: 'true'

      });
      return;
    }
    this.props.onItemAdded(this.state.label, this.state.userName);
    this.setState({
      label: ''
    });
    this.setState({
      userName: ''
    });
    this.setState({
      emptyValue: false,
      inputValue: false
    });
  };

  render() {
    const {emptyValue} = this.state;
    const {inputValue} = this.state;
    let classNameInput = 'form-control';
    let classNameDiv = 'normal';
    let classNameInput1 = 'form-control';
    let classNameDiv1 = 'normal';
    if(emptyValue) {
      classNameInput = 'form-control done';
      classNameDiv = 'normal message';
    }
    
    if(!emptyValue) {
      classNameInput = 'form-control';
      classNameDiv = 'normal';
    }
    
    if(inputValue) {
      classNameInput1 = 'form-control done';
      classNameDiv1 = 'normal message';
    }
    
    if(!inputValue) {
      classNameInput1 = 'form-control';
      classNameDiv1 = 'normal';
    } 
    
    

    return (
      <>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Choose a user</label>
              <select className={classNameInput} 
                id="exampleFormControlSelect1" 
                value={this.state.userName} onChange={this.onChangeSelect}>
                <option value=''>Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
              <div className={classNameDiv}>Enter, please, name of user</div>
            </div>
            <div className="form-group">
              
            <label htmlFor="exampleFormControlInput1">New task</label>
            <input type="text"
                id="exampleFormControlInput1"
                className={classNameInput1} 
                onChange={this.onLabelChange}
                placeholder="What needs to be done"
                value={this.state.label} />
                <div className={classNameDiv1}>Enter, please, name of user</div>
            </div>
            <button
              className="btn btn-outline-secondary">
              Add Item
        </button>
          </form>
      </>
    );
  }
}
