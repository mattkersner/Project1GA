// set gameboard to a variable
let gameboard = $('.gameboard');
// set cartman to a variable
let cartman = $('#cartman');
// establish limits that cartman can travel within the gameboard
let limits = gameboard.width() - cartman.width();
// store each keystroke as an object
let keyPress = {};
// distance cartman will travel at each keypress
let x = 4;

// left and right arrow movement functionality
function newValue(value, left, right) {
  // if the left arrow is pressed (true), set variable n to x-coordinate and subtract the distance
  if (keyPress[left]) {
    var n = parseInt(value, 10) - x;
  // if the right arrow is pressed (true), set variable n to x-coordinate and add the distance
  } else if (keyPress[right]) {
    var n = parseInt(value, 10) + x;
  };
  // if n is less than zero, return 0 so he doesn't move beyond the 0 x-coordinate
  if (n < 0) {
    return 0;
  // if n is greater than the established limits, return the limits so that cartman can't go beyond the game board
  } else if (n > limits) {
    return limits;
  // if neither of those things are true, just return n to move him around
  } else {
    return n;
  };
}

// when the key is pressed, grab the keycode to determine which key and set it to true so that it knows to move
$(window).keydown(function(e) {
  keyPress[e.which] = true;
})

// when the key is released, change to false so cartman no longer moves
$(window).keyup(function(e) {
  keyPress[e.which] = false;
});

// easter egg
function easterEgg() {
  if (keyPress[38] && keyPress[40]) {
    cartman.css('background-image','url(images/beefcake.png)');
    cartman.css('height', 100 + 'px');
    cartman.css('width', 100 + 'px');
    cartman.css('bottom', 2 + 'px');
  }
}

// easter egg 2
function butters() {
  if (keyPress[32]) {
    cartman.css('background-image','url(images/butters.png)');
    cartman.css('height', 100 + 'px');
    cartman.css('width', 100 + 'px');
    cartman.css('bottom', 10 + 'px');
  }
}

// revert back to cartman
function bringCartmanBack() {
  if (keyPress[67]) {
    cartman.css('background-image','url(images/cartman.png)');
    cartman.css('height', 80 + 'px');
    cartman.css('width', 80 + 'px');
    cartman.css('bottom', 10 + 'px');
  }
}

// an interval set to look every 20 miliseconds for a new x-coordinate and set it to cartmans left css property
setInterval(function() {
  easterEgg();
  butters();
  bringCartmanBack();
    cartman.css({
        left: function coordinates(y, value) {
          return newValue(value, 37, 39);
        },
    });
}, 20);
