var level = {
  number:1,
  time:1,
  speed:1,
  points:0
}
var cartman = {
  width:100,
  height:100,
  speed:1,
  top:0,
  bottom:0,
  left:0,
  right:0
}
var poof = {
  width:25,
  height:25,
  top:0,
  right:0,
  bottom:0,
  left:0,
  speed:1,
  element: null
}

var levelStart,
    hitbox,
    poofElement;

function startLevel() {
  levelStart = setInterval(function() {
    shootPoof();
    watchHitbox();
  }, level.speed*1000);
  setTimeout(function() {
    console.log("End Level");
    clearInterval(levelStart);
    clearInterval(hitbox);
  }, (level.time*60)*1000);
}
function shootPoof() {
  placePoof();
}
function placePoof() {
  poof.element
    .css({"top":"0", left:randomPerc()+"%"})
    .appendTo('.main')
    .animate({"top":"100%"}, poof.speed*500);
}
function randomPerc() {
  return Math.floor(Math.random() * (650 - 10 + 1)) + 10;
}
function watchHitbox() {
  hitbox = setInterval(function() {
    poof.top = parseInt(poof.element.css("top").replace('px', ''));
    poof.bottom = poof.top + poof.height;
    poof.left = parseInt(poof.element.css("left").replace('px', ''));
    poof.right = poof.left + poof.width;
    cartman.bottom = parseInt($('.cartman').css("bottom").replace('px', ''));
    cartman.top = cartman.bottom + cartman.height;
    cartman.left = parseInt($('.cartman').css("left").replace('px', ''));
    cartman.right = cartman.left + cartman.width;
    if(poof.bottom >= cartman.top && poof.left >= cartman.left && poof.right <= cartman.right) {
      handleCollide();
      clearInterval(hitbox);
    } else {
      handleMiss();
    }
  }, 25);
}
function handleCollide() {
  $('.status').css({"background-color":"green"});
  clearInterval(hitbox);
  level.points++;
  console.log(level.points);
}
function handleMiss() {
  $('.status').css({"background-color":"red"});
}
$(function() {
  poof.element = $('.poof').clone().remove();
  startLevel();
})
