
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
//         left: '+=50px'
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

// works perfectly, but pulled from stack overflow and need to fully understand what it's doing
// .catcher top is always at 410
let pane = $('.gameboard');
let box = $('.catcher');
let limits = pane.width() - box.width();
let keyPress = {};
let x = 4;

function newValue(value, left, right) {
  if (keyPress[left]) {
    var n = parseInt(value, 10) - x;
  } else if (keyPress[right]) {
    var n = parseInt(value, 10) + x;
  };
  // if (keyPress[right]) {
  //   var n = parseInt(value, 10) + x;
  // } else {
  //   var n = parseInt(value, 10) - 0;
  // }
  //   var n = parseInt(value, 10)
  //     - (keyPress[left] ? x : 0)
  //     + (keyPress[right] ? x : 0);
  if (n < 0) {
    return 0;
  } else if (n > limits) {
    return limits;
  } else {
    return n;
    // return n < 0 ? 0 : n > limits ? limits : n;
  };
}

$(window).keydown(function(e) {
  keyPress[e.which] = true;
})

$(window).keyup(function(e) {
  keyPress[e.which] = false;
});

setInterval(function() {
    box.css({
        left: function coordinates(y, value) {
          return newValue(value, 37, 39);
        },
    });
}, 20);
