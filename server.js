const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log();
  console.log(`Escutando na porta: ${process.env.PORT}!`);
  console.log(`CTRL + Clique em http://localhost:${process.env.PORT}`);
});
