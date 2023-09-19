const express = require('express');
const app = express();
require('./db');
const userRouter = require('./router/user');
const todoRouter = require('./router/todo');
const dnsRouter = require('./router/dns');

const port = 3000;

app.use(express.json());

app.use(['/user','/users'],userRouter);
app.use('/todo',todoRouter);
app.use('/dns',dnsRouter);


app.get('/', (req, res,next) => {
  res.send('hola pona');
});


app.use((req, res, next) => {
  res.status(404).send(
      "<h1>Page not found on the server</h1>")
})



app.use((err, req, res, next)=> {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  const handleError = err.statusCode < 500;
  res.status(err.statusCode).send(
    handleError? err : {
    message:'somthing went wrong'
  })


  
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});