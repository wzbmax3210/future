const jsonp = (url) => {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp${Math.random().toString(32).substr(2)}`
    window[callbackName] = data => {
      delete window[callbackName]
      resolve(data)
    }
    const script = document.createElement('script')
    script.src = `${url}?callback=${callbackName}`
    script.onerror = () => {
      reject()
    }
    script.onload = () => {
      script.remove()
    }
    document.body.appendChild(script)
  })
}

const getAjax = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('get', url)
    request.onreadystatechange = () => {
      if(request.readyState === 4) {
        if (request.status >= 200 && request < 300) {
          resolve.call(null, request.response)
        } else {
          reject.call(null, request)
        }
      }
    }
    request.send()
  })
}

jsonp('http://localhost:8888/friends.js')
  .then(data => console.log(data))

getAjax('http://localhost:8888/friends.json')
  .then(resolve => console.log(resolve))
  .catch(reject => console.log(reject))
