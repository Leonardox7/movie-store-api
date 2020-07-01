const router = require('express').Router();
const express = require('express');
const app = express();
const useRouter = require('./routes/user-router');

app.use((req, res, next) => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', '*');
  res.set('access-control-allow-headers', '*');
  next();
});
app.use('/api', router);
useRouter(app);
app.listen(8085, () =>
  console.log(`Example app listening at http://localhost:${8085}`)
);
