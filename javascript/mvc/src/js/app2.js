import '../style/app2.css'

import $ from 'jquery'

const $tabBar = $('.tab-bar')
const $tabContent = $('.tab-content')

$tabBar.on('click', 'li', e => {
  const $clickLi = $(e.currentTarget)
  const clickIndex = $clickLi.index()

  if (!$clickLi.hasClass('selected')) {
    $clickLi.addClass('selected').siblings().removeClass('selected')
  }

  const $showContent = $tabContent.children().eq(clickIndex)
  console.log($showContent)
  if (!$showContent.hasClass('active')) {
    $showContent.addClass('active').siblings().removeClass('active')
  }
})
