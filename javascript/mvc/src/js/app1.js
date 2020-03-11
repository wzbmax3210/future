import '../style/app1.css'
import $ from 'jquery'

const $result = $('.result')
const $calculate = $('.calculate')
const $add1 = $('.add1')
const $minus1 = $('.minus1')
const $multiply2 = $('.multiply2')
const $division2 = $('.division2')
let n = localStorage.getItem('n') * 1
$result.text(n || 0)

$calculate.on('click', e => {
  switch (e.toElement) {
    case $add1[0]:
      n += 1
      localStorage.setItem('n', n)
      break
    case $minus1[0]:
      n -= 1
      localStorage.setItem('n', n)
      break
    case $multiply2[0]:
      n *= 2
      localStorage.setItem('n', n)
      break
    case $division2[0]:
      n /= 2
      localStorage.setItem('n', n)
      break
    default:
      break
  }
  $result.text(n)
})
