let cheesyPoofs = $('.item');
// window.setInterval(function () {
//   let cheesyPoofs = $('.item');
// }, 100);
let cartman = $('#catcher');
let counter = 0;

// collission detection
function collision(cheesyPoofs, cartman) {
  // define full dimensions of cheesypoofs
  let x1 = $(cheesyPoofs).offset().left;
  let y1 = $(cheesyPoofs).offset().top;
  let cheesyWidth = $(cheesyPoofs).outerWidth(true);
  let cheesyHeight = $(cheesyPoofs).outerHeight(true);
  let box1 = x1 + cheesyWidth;
  let top1 = y1 + cheesyHeight;
  // define full dimensions of cartman
  let x2 = $(cartman).offset().left;
  let y2 = $(cartman).offset().top;
  let cartmanWidth = $(cartman).outerWidth(true);
  let cartmanHeight = $(cartman).outerHeight(true);
  let box2 = x2 + cartmanWidth;
  let top2 = y2 + cartmanHeight;
  // all measurements of when cartman and cheesypoofs are not colliding, return false
  if (top1 < y2 || y1 > top2 || box1 < x2 || x1 > box2) {
    return false;
  } else { // collision
    console.log("COLLISION!!!")
    return true;
  }
};

//randomize a left property for the new cheesypoof css
let randomLeft = Math.floor(Math.random() * (500 - 10 + 1)) + 10;


//check for collision every 20 miliseconds, if collision is true, add 5 to counter and remove cheesypoofs
window.setInterval(function() {
  if (collision(cheesyPoofs, cartman) === true) {
    counter += 5;
    $('#counter').text(counter);
    $(cheesyPoofs).remove();
    let item = new Item(item);
    item.new();
    // $(cheesyPoofs).css({
    // left: randomLeft,
    // });
  } if (counter === 50) {
    $('.winMessage').addClass('.winMessage2');
  }
  // if ($(cheesyPoofs).offset().top > 450) {
  //   counter -=5;
  //   $('#counter').text(counter);
  // }
}, 20);







// let gameboard = $('.gameboard');

// function miss(cheesyPoofs, gameboard) {
//   let y1 = $(cheesyPoofs).offset().top;
//   let cheesyHeight = $(cheesyPoofs).outerHeight(true);
//   let box = y + height;
//   let y2 = $(gameboard).offset().top;
//   let gameheight = $(gameboard).outerHeight(true);
//   let box2 = y2 + gameheight;
//   if (box < y2 || y1 > box2) {
//     return false;
//   } else {
//     return true;
//   }
// }

// window.setInterval(function() {
//   if (miss(cheesyPoofs, gameboard) === true) {
//     counter -= 5;
//     $('#counter').text(counter);
//   }
// }, 20);
