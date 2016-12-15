let cheesyPoofs = $('#item');
let cartman = $('#catcher');
let counter = $('#counter');

function collision(cheesyPoofs, cartman) {
  let x1 = $(cheesyPoofs).offset().left;
  let y1 = $(cheesyPoofs).offset().top;
  let cheesyWidth = $(cheesyPoofs).outerWidth(true);
  let cheesyHeight = $(cheesyPoofs).outerHeight(true);
  let box1 = x1 + cheesyWidth;
  let top1 = y1 + cheesyHeight;
  let x2 = $(cartman).offset().left;
  let y2 = $(cartman).offset().top;
  let cartmanWidth = $(cartman).outerWidth(true);
  let cartmanHeight = $(cartman).outerHeight(true);
  let box2 = x2 + cartmanWidth;
  let top2 = y2 + cartmanHeight;
  if (top1 < y2 || y1 > top2 || box1 < x2 || x1 > box2) {
    return false;
  } else {
    return true;
  }
};

window.setInterval(function() {
  if (collision(cheesyPoofs, cartman) === true) {
    $('#item').remove();
    $('#counter').html += "5";
  }
}, 20);




// window.setInterval(function() {
//     $('#result').text(collision($('#div1'), $('#div2')));
// }, 200);
