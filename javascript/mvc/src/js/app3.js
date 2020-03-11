import '../style/app3.css'

import $ from 'jquery'

const $square = $('.square')

$square.on('click', e => {
  $square.toggleClass('active')
})