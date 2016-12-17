let audio = new Audio('beefcake.wav');
let hasPlayed = false;

let level = 1;
let counter = 0;
let inProgress = true;

// collission detection
function checkForCollision(cheesyPoofs, cartman) {
  // define full dimensions of cheesypoofs
  let x1 = $(cheesyPoofs).offset().left;
  let y1 = $(cheesyPoofs).offset().top;
  let cheesyWidth = $(cheesyPoofs).outerWidth(true);
  let cheesyHeight = $(cheesyPoofs).outerHeight(true);
  let entirePoofWidth = x1 + cheesyWidth;
  let entirePoofHeight = y1 + cheesyHeight;
  // define full dimensions of cartman
  let x2 = $(cartman).offset().left;
  let y2 = $(cartman).offset().top;
  let cartmanWidth = $(cartman).outerWidth(true);
  let cartmanHeight = $(cartman).outerHeight(true);
  let entireCartmanWidth = x2 + cartmanWidth;
  let entireCartmanHeight = y2 + cartmanHeight;
  // all measurements of when cartman and cheesypoofs are not colliding, return false
  if (entirePoofHeight < y2 || y1 > entireCartmanHeight || entirePoofWidth < x2 || x1 > entireCartmanWidth) {
    return false;
  } else {
    console.log("COLLISION!")
    return true;
  }
};

//function for creating newPoofs and appending them to the gameboard
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
  let entirePoofHeight = y1 + cheesyHeight;
  if (entirePoofHeight > 550) {
    counter -= 5;
    $('#counter').text(counter);
    poof.remove();
    }
  }
}

//function for action when a collision is true, and to grab all newly created cheesypoofs
function collision() {
  let poofs = $('.item');
  let cartman = $('#cartman');
//this is how to account for newly created cheesypoofs
  for (poof of poofs) {
    if (checkForCollision(poof, cartman)) {
      counter += 5;
      $('#counter').text(counter);
      poof.remove();
    }
  }
}

//check for a winner
function checkWin() {
  if (counter === 25) {
    let winMessage = $('.winMessage')
    winMessage.css({
      top: 100,
    })
    //stop new cheesypoofs from being made
    inProgress = false;
    return true;
  }
}

//play the winning sound
function playWinSound() {
  if (checkWin()) {
    if (hasPlayed === false) {
    audio.play();
    hasPlayed = true;
    };
  }
}

//running every 20ms, call functions checking for collision, a miss, a win and to play winning sound
window.setInterval(function() {
  collision();
  checkMiss();
  checkWin();
  playWinSound();
}, 20);
