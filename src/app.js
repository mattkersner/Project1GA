
// working but choppy and slow
// $(document).keydown(function(e) {
//   switch(e.which) {
//     case 37:
//       $('.catcher').stop().animate( {
//         left: '-=30px'
//     });
//     break;
//     case 39:
//       $('.catcher').stop().animate( {
//         left: '+=30px'
//     });
//     break;
//   }
// });

// class Catcher {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.cartman = new Image;
//     this.cartman.src = 'images/cartman.png';
//   }
//   move() {
//     $('.catcher').addEventListener('keydown', function(e) {
//          if (e.keycode === 37) {
//             this.x -= 30px;
//          } else if (e.keycode === 39) {
//             this.x += 30px;
//          }
//     });
//   }
// }


// .catcher top is always at 410

// set gameboard to a variable
let pane = $('.gameboard');
// set cartman to a variable
let box = $('.catcher');
// establish limits that cartman can travel within the gameboard
let limits = pane.width() - box.width();
// store each keystroke
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

// an interval set to look every 20 miliseconds for a new x-coordinate and set it to cartmans left css property
setInterval(function() {
    box.css({
        left: function coordinates(y, value) {
          return newValue(value, 37, 39);
        },
    });
}, 20);
