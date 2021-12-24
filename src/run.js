
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/assets'));

router.get('/runner',function(req, res){
  res.sendFile(path.join(__dirname+'/templates/runner.html'));
});

router.get('/tictactoe',function(req,res){
  res.sendFile(path.join(__dirname+'/templates/tictactoe.html'));
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/templates/home.html'));
});

app.use('/', router);
app.listen(process.env.port || 5000);

console.log('Website running on port 5000');