import $ from "jquery";
import "../style/app4.css";

const $circle = $('.circle')

$circle.on('mouseenter', e => {
  $circle.addClass('active')
}).on('mouseleave', e => {
  $circle.removeClass('active')
})