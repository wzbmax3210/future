getCss.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const style = document.createElement('style')
        style.innerHTML = request.response
        document.head.appendChild(style)
      } else {
        console.log('get css fail')
      }
    }
  }
  request.send()
}

getJs.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/2.js')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
      } else {
        console.log('get Js fail')
      }
    }
  }
  request.send()
}

getHtml.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/3.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
      } else {
        console.log('get Html fail')
      }
    }
  }
  request.send()
}

getXml.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/4.xml')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const xml = request.responseXML
        const name = xml.getElementsByTagName('name')[0].textContent
        console.log(name)
      } else {
        console.log('get xml fail')
      }
    }
  }
  request.send()
}

getJson.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/5.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const json = JSON.parse(request.response)
        console.log(json)
      } else {
        console.log('get json fail')
      }
    }
  }
  request.send()
}

let n = 1
getPage.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', `/page${n+1}.json`)
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const array = JSON.parse(request.response)
        array.forEach(item => {
          const li = document.createElement('li')
          li.textContent = item.id
          pageUl.appendChild(li)
        })
      } else {
        console.log('get page fail')
      }

      n += 1
    }
  }
  request.send()
}
