var request = require('request');
var convert = require("xml-js");
const express = require('express');
const app = express();
const mysql = require('mysql');

const client = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "asdf1234",
  database: "bus_data"
});

var i = 39;
var lock = 0;

//11


client.query("SELECT * FROM citycode;", function(err, res, fields){



      var url = 'http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList';
      var queryParams;
      queryParams = '?' + encodeURIComponent('serviceKey') + '=rhz8eeH4JwqQScvH4Ymr%2F9jJkTWHkXMYGrTzDvM8FVka8PW6hWABYVTC%2BPt7SmDDDczTUMMt7jQ4sf4SXyYiFg%3D%3D'; /* Service Key*/
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('300'); /* */
      queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('xml'); /* */
      queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent(res[i].number); /* */

      request({url: url + queryParams,  method: 'GET'}, function (error, response, body) {
      var result = convert.xml2json(body, { compact: true, spaces: 4 });
      var data = JSON.parse(result).response.body.items.item;


      console.log(res[i].name);
            for(j in data){
              var querycode = 'INSERT INTO 원주시';
              //querycode += bus_table;
              querycode += ' (routeno, city_number, city_name, routetp, endnodenm, startnodenm) VALUES (?, ?, ?, ?, ?, ?)';
              client.query(querycode, [data[j].routeno._text, res[i].number, res[i].name, data[j].routetp._text, data[j].endnodenm._text, data[j].startnodenm._text], function(err, result, fields){

              });//query
            }
            console.log('FINISH!');

            });//request


});//query
