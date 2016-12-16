let audio = new Audio('beefcake.wav');
let hasPlayed = false;

let counter = 0;
let inProgress = true;

// collission detection
function checkForCollision(cheesyPoofs, cartman) {
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
  } else {
    console.log("COLLISION!!!")
    return true;
  }
};

function newPoofs() {
  if (inProgress === true) {
  let item = $('<div />');
  $(item).appendTo('.gameboard');
  $(item).attr('class', 'item');
  //randomize a left css property and speed of animation for cheeypoofs
  let randomLeft = Math.floor(Math.random() * (650 - 10 + 1)) + 10;
  let randomSpeed = Math.floor(Math.random() * (5) + 1);
  $(item).css({
    left: randomLeft,
    animation: "fall " + randomSpeed + "s" + " infinite",
    })
  }
 }

//create new cheesypoof every 3 seconds
window.setInterval(function() {
  newPoofs();
}, 3000);

//create function for missing a poof and decreasing score
function checkMiss() {
  let poofs = $('.item');
  for (poof of poofs) {
  let y1 = poofs.offset().top;
  let cheesyHeight = poofs.outerHeight(true);
  let top1 = y1 + cheesyHeight;
  if (top1 > 550) {
    counter -= 5;
    $('#counter').text(counter);
    poof.remove();
    }
  }
}

function collision() {
  let poofs = $('.item');
  let cartman = $('#cartman');
  for (poof of poofs) {
    if (checkForCollision(poof, cartman)) {
      counter += 5;
      $('#counter').text(counter);
      poof.remove();
    }
  }
}

function checkWin() {
  if (counter === 10) {
    let winMessage = $('.winMessage')
    winMessage.css({
      top: 100,
    })
    inProgress = false;
    return true;
  }
}

function playWinSound() {
  if (checkWin()) {
    if (hasPlayed === false) {
    audio.play();
    hasPlayed = true;
    };
  }
}

window.setInterval(function() {
  collision();
  checkMiss();
  checkWin();
  playWinSound();
}, 20);
