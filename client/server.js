const express = require('express');
const port = process.env.PORT || process.env.VUE_APP_PORT || 3000;
const app = express();
app.use(express.static(__dirname + "/dist/"));
app.listen(port);