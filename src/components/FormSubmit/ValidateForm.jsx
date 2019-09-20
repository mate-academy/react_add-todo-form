const validate = () => {
  let titleError = '';
  let selectedUserError = '';

  if (!this.props.title.value) {
    titleError = 'title is empty';
  }

  if (!this.props.selectedUser.value) {
    selectedUserError = 'user is not selected';
  }

  if (titleError) {
    this.setState({
      title: {
        error: titleError,
      },
    });

    return false;
  }

  if (selectedUserError) {
    this.setState({
      selectedUser: {
        error: selectedUserError,
      },
    });

    return false;
  }

  return true;
};

export default validate;
