var http = require('http')
var url = require('url')
var port = process.argv[2]
var fs = require('fs')

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname

  console.log('有请求发送！路径（带查询参数）为：' + pathWithQuery)

  response.statusCode = 200
  response.setHeader('Content-Type', 'text/html;charset=utf-8')
  const filePath = path === '/' ? '/index.html' : path
  const suffix = filePath.substring(filePath.lastIndexOf('.'))
  const fileTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  }
  response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
  let content
  try {
    // 默认首页为index.html
    content = fs.readFileSync(`./public${filePath}`)
  } catch (e) {
    content = 'file not exists'
    response.statusCode = 404
  }
  response.write(content)
  response.end()
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
