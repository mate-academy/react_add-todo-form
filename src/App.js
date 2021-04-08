import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import goodsFromServer from './api/goods';
import colors from './api/colors';
import AddGoodForm from './components/AddGoodFrom';

const getColorById = colorId => (
  colors.find(color => colorId === color.id)
);

const goodsWithColor = goodsFromServer.map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

class App extends React.PureComponent {
  state = {
    goods: goodsWithColor,
  }

  addGood = (newGoodName, selectedColorId) => {
    this.setState(({ goods }) => {
      const newGood = {
        id: +new Date(),
        name: newGoodName,
        colorId: selectedColorId,
        color: getColorById(selectedColorId),
      };

      return {
        goods: [newGood, ...goods],
      };
    });
  }

  render() {
    const { goods } = this.state;

    return (
      <>
        <h1>Add good form</h1>

        <AddGoodForm
          addGood={this.addGood}
        />

        <GoodsList goods={goods} />
      </>
    );
  }
}

const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li
        key={good.id}
        style={{ color: good.color.name }}
      >
        {good.name}
      </li>
    ))}
  </ul>
);

GoodsList.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
