import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const Massege = ({ titleLength, isChoosen, checkedLengthWord }) => (
  <div className="card__container">
    <Card.Text
      className="warning1"
    >
      {(checkedLengthWord) && 'Enter the title!!! '}
    </Card.Text>
    <Card.Text
      className="warning2"
    >
      {(isChoosen) && 'Choose the name!!! '}
    </Card.Text>
    <Card.Text
      className="warning3"
    >
      {(titleLength === 30) && 'Max lenght is 30 !!!'}
    </Card.Text>
  </div>
);

Massege.propTypes = {
  isChoosen: PropTypes.bool.isRequired,
  titleLength: PropTypes.number.isRequired,
  checkedLengthWord: PropTypes.bool.isRequired,
};

export default Massege;
