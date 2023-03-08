import express from 'express';
import cors from 'cors';

const colors = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

const goods = [
  { id: 1, colorId: 1, name: 'Dumplings' },
  { id: 2, colorId: 2, name: 'Carrot' },
  { id: 3, colorId: 3, name: 'Eggs' },
  { id: 4, colorId: 1, name: 'Ice cream' },
  { id: 5, colorId: 2, name: 'Apple' },
  { id: 6, colorId: 3, name: 'Bread' },
  { id: 7, colorId: 1, name: 'Fish' },
  { id: 8, colorId: 2, name: 'Honey' },
  { id: 9, colorId: 3, name: 'Jam' },
  { id: 10, colorId: 1, name: 'Garlic' },
];

const app = express();

app.use(cors());

app.delete('/goods/:goodId', (req, res) => {
  const { goodId } = req.params;

  const good = goods.find((good) => good.id === +goodId);

  if (!good) {
    res.sendStatus(404);
    return;
  }

  const goodIndex = goods.indexOf(good);

  goods.splice(goodIndex, 1);
  res.sendStatus(204);
})

app.post('/goods', express.json(), (req, res) => {
  const goodsIds = goods.map((good) => good.id);
  const sortGoodsIds = goodsIds.sort((a, b) => a - b);

  const goodId = sortGoodsIds[sortGoodsIds.length - 1] + 1;

  const newGood = {
    id: goodId,
    name: req.body.name,
    colorId: req.body.colorId,
  }

  goods.push(newGood);

  res.status(201);
  res.send(newGood);
})

app.get('/goods', (req, res) => {
  res.send(goods);
});

app.get('/goods/:goodId', (req, res) => {
  const { goodId } = req.params;

  if (isNaN(+goodId)) {
    res.sendStatus(422);
    return;
  }

  const foundGood = goods.find(good => good.id === +goodId);

  if (!foundGood) {
    res.sendStatus(404);
    return;
  }

  res.send(foundGood);
})

app.get('/colors', (req, res) => {
  res.send(colors);
});

app.get('/colors/:colorId', (req, res) => {
  const { colorId } = req.params;

  if (isNaN(+colorId)) {
    res.sendStatus(422);
    return;
  }

  const foundColor = colors.find(color => color.id === +colorId);

  if (!foundColor) {
    res.sendStatus(404);
    return;
  }

  res.send(foundColor);
})

app.get('/goodsWithColors', (req, res) => {
  const goodsWithColor = goods.map(good => ({
    ...good,
    color: colors.find(color => color.id === good.colorId) || null,
  }));

  res.send(goodsWithColor);
})

app.listen(5000);
