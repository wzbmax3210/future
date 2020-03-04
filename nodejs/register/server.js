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
  var query = parsedUrl.query
  var method = request.method

  console.log('有请求发送！路径（带查询参数）为：' + pathWithQuery)

  if (path === '/register' && method === 'POST') {
    let responseJson = {
      success: true,
      msg: ''
    }
    const array = []
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    request.on('data', chunk => {
      array.push(chunk)
    })
    request.on('end', () => {
      const string = Buffer.concat(array).toString()
      const registerData = JSON.parse(string)
      if (!registerData.user || !registerData.password) {
        responseJson.success = false
        responseJson.msg = '用户名或者密码为空，请重新输入'
      } else {
        const usersArray = JSON.parse(fs.readFileSync('./db/users.json'))
        const lastUser = usersArray[usersArray.length - 1]
        const newUser = {
          id: lastUser ? lastUser.id + 1 : 1,
          user: registerData.user,
          password: registerData.password
        }
        usersArray.push(newUser)
        fs.writeFileSync('./db/users.json', JSON.stringify(usersArray))
      }
      response.write(JSON.stringify(responseJson))
      response.end()
    })
  } else {
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
  }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
