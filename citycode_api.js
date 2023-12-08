/* NodeJs 12 샘플 코드 */

var convert = require("xml-js");
var request = require('request');

const mysql = require('mysql');

const client = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "asdf1234",
    database: "bus_data"
});


var url = 'http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getCtyCodeList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=rhz8eeH4JwqQScvH4Ymr%2F9jJkTWHkXMYGrTzDvM8FVka8PW6hWABYVTC%2BPt7SmDDDczTUMMt7jQ4sf4SXyYiFg%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('xml'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    if (error) {
        throw new Error(error);
    }
    //let info = JSON.parse(body);
    var result = convert.xml2json(body, { compact: true, spaces: 4 });
    var data = JSON.parse(result).response.body.items.item;

    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);

    console.log(data);
    for (i in data) {

            console.log('지역번호 : ' + data[i].citycode._text);
            console.log('지역이름 : ' + data[i].cityname._text);
            console.log(" ")

/*
          client.query("INSERT INTO citycode (number, name) VALUES (?, ?) ", [data[i].citycode._text, data[i].cityname._text], function(err, result, fields){//query(sql쿼리문, func(옵션, 파라미터, 콜백함수))
            if(err) throw err;
            else{
              console.log(data[i].citycode._text);
              console.log(data[i].cityname._text);
            }
          });
*/
        }

});

/*
노선번호(버스번호) routeno
노선유형(버스종류) routetp
종점 endnodenm
기점 startnodenm


1. 지역 번호가 들어있는 테이블을 생성
2. 테이블 안에 지역번호 하나를 갖고온다
3. 갖고온 지역번호로 api를 돌려서 테이블에 집어넣는다
4. 반복환다





*/
