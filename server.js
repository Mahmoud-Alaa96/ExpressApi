const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res,next) => {
  res.send('hola pona');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});