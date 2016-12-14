
// working but choppy and slow
// $(document).keydown(function(e) {
//   switch(e.which) {
//     case 37:
//       $('.catcher').stop().animate( {
//         left: '-=50px'
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

// works perfectly, but need to fully understand what it's doing
let pane = $('.gameboard');
let box = $('.catcher');
let limits = pane.width() - box.width();
let d = {};
let x = 4;

function newv(v, left, right) {
    var n = parseInt(v, 10) - (d[left] ? x : 0) + (d[right] ? x : 0);
    return n < 0 ? 0 : n > limits ? limits : n;
}

$(window).keydown(function(e) { d[e.which] = true; })
$(window).keyup(function(e) { d[e.which] = false; });

setInterval(function() {
    box.css({
        left: function(i,v) {
          // console.log({i, v})
          return newv(v, 37, 39); },
    });
}, 20);

// var pane = $('#pane'),
//     box = $('#box'),
//     maxValue = pane.width() - box.width(),
//     keysPressed = {},
//     distancePerIteration = 3;

// function calculateNewValue(oldValue, keyCode1, keyCode2) {
//     var newValue = parseInt(oldValue, 10)
//                    - (keysPressed[keyCode1] ? distancePerIteration : 0)
//                    + (keysPressed[keyCode2] ? distancePerIteration : 0);
//     return newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
// }

// $(window).keydown(function(event) { keysPressed[event.which] = true; });
// $(window).keyup(function(event) { keysPressed[event.which] = false; });

// setInterval(function() {
//     box.css({
//         left: function(index ,oldValue) {
//             return calculateNewValue(oldValue, 37, 39);
//         },
//         top: function(index, oldValue) {
//             return calculateNewValue(oldValue, 38, 40);
//         }
//     });
// }, 20);
