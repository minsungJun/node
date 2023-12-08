
var convert = require("xml-js");
var request = require('request');

var url = 'http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=rhz8eeH4JwqQScvH4Ymr%2F9jJkTWHkXMYGrTzDvM8FVka8PW6hWABYVTC%2BPt7SmDDDczTUMMt7jQ4sf4SXyYiFg%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('xml'); /* */
queryParams += '&' + encodeURIComponent('cityCode') + '=' + encodeURIComponent('3'); /* */



request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
      if (error) {
          throw new Error(error);
      }

      var result = convert.xml2json(body, { compact: true, spaces: 4 });
      var data = JSON.parse(result).response.body.items.item;

      console.log(data);
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});
/*
노선번호(버스번호) routeno
노선유형(버스종류) routetp
종점 endnodenm
기점 startnodenm
*/
http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList?serviceKe=rhz8eeH4JwqQScvH4Ymr%2F9jJkTWHkXMYGrTzDvM8FVka8PW6hWABYVTC%2BPt7SmDDDczTUMMt7jQ4sf4SXyYiFg%3D%3D&cityCode=3&numOfRows=300&pageNo=1&_type=xml


http://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteNoList?serviceKey=rhz8eeH4JwqQScvH4Ymr%2F9jJkTWHkXMYGrTzDvM8FVka8PW6hWABYVTC%2BPt7SmDDDczTUMMt7jQ4sf4SXyYiFg%3D%3D&cityCode=3&numOfRows=10&pageNo=1&_type=xml
