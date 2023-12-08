const express = require('express');
const app = express();
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');

const client = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "asdf1234",
  database: "bus_data"
});
const mainPage = fs.readFileSync('./index.ejs', 'utf8');

app.get('/', (req, res) => {
  var page = ejs.render(mainPage, {
      title: "Term Project",
  });
  res.send(page);
});

app.get('/getnumdata', (req, res) => {
  console.log(req.query.busnum);
  var querycode = 'SELECT * FROM bustable WHERE routeno = ';
  querycode += req.query.busnum;
  querycode += '; '

  client.query(querycode, function(err, result, fields){//query(sql쿼리문, func(옵션, 파라미터, 콜백함수))
      if(err) throw err;
      else{
          var page = ejs.render(mainPage, {
              title: "Temporary Title",
              data: result,
          });
          res.send(page);//페이지에 표시
      }
  });
});

app.get('/getnamedata', (req, res) => {
  console.log(req.query.cityname);
  var querycode = 'SELECT * FROM bustable WHERE city_name = \'';
  querycode += req.query.cityname;
  querycode += '\'; '
  //querycode += 'SELECT * FROM 세종특별시 WHERE routeno = ;';

  client.query(querycode, function(err, result, fields){//query(sql쿼리문, func(옵션, 파라미터, 콜백함수))
      if(err) throw err;
      else{
          var page = ejs.render(mainPage, {
              title: "Temporary Title",
              data: result,
          });
          res.send(page);//페이지에 표시
      }
  });
});

app.get('/img', function(req, res){
  fs.readFile('resource/bus.png', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});



app.listen(3400, () => {
  console.log('Server Running on Port 3400!');
});

/*
FOR 3 datalist<br>
<% if(locals.data){ %>
  <% data.forEach(function(val){ %>
      지역 : <%= val.name %>, 번호 : <%= val.age %><br>

  <% }) %>
<% } %>
*/
