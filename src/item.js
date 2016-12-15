// class Item {
//   constructor() {
//     this.item = item;
//   }
//   new() {
//     let item = $('<div />');
//     $(item).appendTo('.gameboard');
//     $(item).attr('class', 'item');
//     let randomLeft = Math.floor(Math.random() * (650 - 10 + 1)) + 10;
//     $(item).css({
//       left: randomLeft,
//     });
//   }
// }

//drop a new cheesypoofs every 4 seconds
window.setInterval(function() {
  let item = $('<div />');
  $(item).appendTo('.gameboard');
  $(item).attr('class', 'item');
  let randomLeft = Math.floor(Math.random() * (650 - 10 + 1)) + 10;
  $(item).css({
    left: randomLeft,
    });
  // if (collision(cheesyPoofs, cartman) === true) {
  //   counter += 5;
  //   $('#counter').text(counter);
  //   $(cheesyPoofs).css({
  //   left: randomLeft,
  //   });
  // }
}, 3000);





