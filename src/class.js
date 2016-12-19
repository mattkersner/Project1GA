class Game {
  constructor() {
    this.counter = 0;
    this.inProgress = true;
    this.level = 1;
    this.audio = new Audio('beefcake.wav');
    this.audio2 = new Audio('hidey_ho.wav');
    this.hasPlayed = false;
    this.has2Played = false;
  }
  // collission detection
  checkForCollision(cheesyPoofs, cartman) {
  // define full dimensions of cheesypoofs
    this.x1 = $(cheesyPoofs).offset().left;
    this.y1 = $(cheesyPoofs).offset().top;
    this.cheesyWidth = $(cheesyPoofs).outerWidth(true);
    this.cheesyHeight = $(cheesyPoofs).outerHeight(true);
    this.entirePoofWidth = this.x1 + this.cheesyWidth;
    this.entirePoofHeight = this.y1 + this.cheesyHeight;
  // define full dimensions of cartman
    this.x2 = $(cartman).offset().left;
    this.y2 = $(cartman).offset().top;
    this.cartmanWidth = $(cartman).outerWidth(true);
    this.cartmanHeight = $(cartman).outerHeight(true);
    this.entireCartmanWidth = this.x2 + this.cartmanWidth;
    this.entireCartmanHeight = this.y2 + this.cartmanHeight;
  // all measurements of when cartman and cheesypoofs are not colliding, return false
    if (this.entirePoofHeight < this.y2 || this.y1 > this.entireCartmanHeight || this.entirePoofWidth < this.x2 || this.x1 > this.entireCartmanWidth) {
      return false;
    } else {
      console.log("COLLISION!")
      return true;
    }
  };
  //function for creating newPoofs and appending them to the gameboard
  newPoofs() {
    if (this.inProgress === true) {
      this.item = $('<div />');
      $(this.item).appendTo('.gameboard');
      $(this.item).attr('class', 'item');
  //randomize a left css property and speed of animation for cheeypoofs
      this.randomLeft = Math.floor(Math.random() * (650 - 10 + 1)) + 10;
      this.randomSpeed = Math.floor(Math.random() * (5) + 1);
      $(this.item).css({
        left: this.randomLeft,
        animation: "fall " + this.randomSpeed + "s" + " infinite",
      })
    }
  }
  //create function for missing a poof and decreasing score
  checkMiss() {
    this.poofs = $('.item');
    for (this.poof of this.poofs) {
      this.y1 = this.poofs.offset().top;
      this.cheesyHeight = this.poofs.outerHeight(true);
      this.entirePoofHeight = this.y1 + this.cheesyHeight;
      if (this.entirePoofHeight > 550) {
        this.counter -= 5;
        $('#counter').text(this.counter);
        this.poof.remove();
      }
    }
  }
  //function for action when a collision is true, and to grab all newly created cheesypoofs
  collision() {
    this.poofs = $('.item');
    this.cartman = $('#cartman');
  //this is how to account for newly created cheesypoofs
    for (this.poof of this.poofs) {
      if (this.checkForCollision(this.poof, cartman)) {
        this.counter += 5;
        $('#counter').text(this.counter);
        this.poof.remove();
      }
    }
  }
  //check for a winner
  checkWin() {
    if (this.level === 1) {
      if (this.counter >= 25) {
        this.winMessage = $('.winMessage');
        this.winMessage.css({
          top: 100,
        })
      //stop new cheesypoofs from being made
        this.inProgress = false;
        return true;
      }
    } else if (this.level === 2) {
        if (this.counter === 50) {
          this.winMessage = $('.winMessage');
          this.winMessage.css({
          top: 100,
          })
          this.inProgress = false;
          return true;
        }
    }
  }
  //play the winning sound
  playWinSound() {
    if (this.checkWin()) {
      if (this.hasPlayed === false) {
        this.audio.play();
        this.hasPlayed = true;
      };
    }
  }
  specialDrop() {
    if (this.inProgress === true) {
      this.mrhankey = $('<div />');
      $(this.mrhankey).appendTo('.gameboard');
      $(this.mrhankey).attr('class', 'mrhankey');
      this.randomLeft = Math.floor(Math.random() * (650 - 10 + 1)) + 10;
      this.randomSpeed = Math.floor(Math.random() * (5) + 1);
      $(this.mrhankey).css({
        left: this.randomLeft,
        animation: "fall " + this.randomSpeed + "s" + " infinite",
      })
    }
    if (this.has2Played === false) {
      this.audio2.play();
      this.has2Played = true;
    }
  }
  specialCollision() {
      this.hankey = $('.mrhankey');
      this.cartman = $('#cartman');
      for (this.special of this.hankey) {
        if (this.checkForCollision(this.special, cartman)) {
          this.counter += 10;
          $('#counter').text(this.counter);
          this.special.remove();
        }
      }
  }
  specialMiss() {
    this.hankey = $('.mrhankey');
    for (this.special of this.hankey) {
      this.y1 = this.hankey.offset().top;
      this.hankeyHeight = this.hankey.outerHeight(true);
      this.entireHankeyHeight = this.y1 + this.hankeyHeight;
      if (this.entireHankeyHeight > 550) {
        this.special.remove();
      }
    }
  }
  stopTimer() {
    if (game.checkWin()) {
      clearInterval(time);
    }
  }
}

let game = new Game;

$('#start').on('click', function() {
  $('#yes-audio').trigger('play');
  //create new cheesypoof every 3 seconds
  setInterval(function() {
    game.newPoofs();
  }, 3000);
  //special drop every 15 seconds
  setInterval(function() {
    game.specialDrop();
  }, 15000);
  //call functions checking for collision, a miss, a win and to play winning sound
  setInterval(function() {
    game.collision();
    game.checkMiss();
    game.checkWin();
    game.playWinSound();
    game.specialCollision();
    game.specialMiss();
    game.stopTimer();
  // game.levelAdvance();
  }, 20);
})

// experimenting with timer, pulled from stack overflow and adjusted to my needs. Created a clearInterval
// to work with the level ending/win. Couldn't get it to work perfectly with the clearinterval in the class
// $('#start').on('click', function() {
  let time = setInterval(function() {
    let timer = $('#timer').html();
    timer = timer.split(':');
    let minutes = timer[0];
    let seconds = timer[1];
    seconds -= 1;
    if (minutes < 0) return;
    if (minutes < 10 && length.minutes != 2) minutes = minutes;
    if (seconds < 0 && minutes != 0) {
        minutes -= 1;
        seconds = 59;
    } else if (seconds < 10 && length.seconds != 2) seconds = "0" + seconds;
        $('#timer').html(minutes + ':' + seconds);
}, 1000);

// levelAdvance() {
  //   if (game.checkWin()) {
  //     game.level = 2;
  //     $('#level').html('Level Two');
  //   }
  // }
