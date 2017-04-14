class Game {
  constructor() {
    this.counter = 0;
    this.inProgress = true;
    this.level = 1;
    this.time = null;
    this.audio = new Audio('beefcake.wav');
    this.audio2 = new Audio('hidey_ho.wav');
    this.hasPlayed = false;
    this.has2Played = false;
  }
  // collission detection
  checkForCollision(cheesyPoofs, cartman) {
  // define full dimensions of cheesypoofs and x and y coordinates
    let x1 = $(cheesyPoofs).offset().left;
    let y1 = $(cheesyPoofs).offset().top;
    let cheesyWidth = $(cheesyPoofs).outerWidth(true);
    let cheesyHeight = $(cheesyPoofs).outerHeight(true);
    let entirePoofWidth = x1 + cheesyWidth;
    let entirePoofHeight = y1 + cheesyHeight;
  // define full dimensions of cartman and x and y coordinates
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
  newPoofs() {
    if (this.inProgress === true) {
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
  //create function for missing a poof and decreasing score
  checkMiss() {
    let poofs = $('.item');
    for (let poof of poofs) {
      let y1 = poofs.offset().top;
      let cheesyHeight = poofs.outerHeight(true);
      let entirePoofHeight = y1 + cheesyHeight;
      if (entirePoofHeight > 550) {
        this.counter -= 5;
        $('#counter').text(this.counter);
        poof.remove();
      }
    }
  }
  startGame() {
    this.inProgress = true;
  }
  //function for action when a collision is true, and to grab all newly created cheesypoofs
  collision() {
    let poofs = $('.item');
    let cartman = $('#cartman');
  //this is how to account for newly created cheesypoofs
    for (let poof of poofs) {
      if (this.checkForCollision(poof, cartman)) {
        this.counter += 5;
        $('#counter').text(this.counter);
        poof.remove();
      }
    }
  }
  sendWinMessageBack() {
    let winMessage = $('.winMessage');
    winMessage.css({
      top: -500,
    });
  }
  //check for a winner
  checkWin() {
    if (this.level === 1) {
      if (this.counter >= 25) {
        let winMessage = $('.winMessage');
        winMessage.css({
          top: 100,
        })
      //stop new cheesypoofs from being made
        this.inProgress = false;
        return true;
      }
    } if (this.level === 2) {
        if (this.counter >= 50) {
          let winMessage = $('.winMessage');
          winMessage.css({
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
  //mr hankey drop
  specialDrop() {
    if (this.inProgress === true) {
      let mrhankey = $('<div />');
      $(mrhankey).appendTo('.gameboard');
      $(mrhankey).attr('class', 'mrhankey');
      let randomLeft = Math.floor(Math.random() * (650 - 10 + 1)) + 10;
      let randomSpeed = Math.floor(Math.random() * (5) + 1);
      $(mrhankey).css({
        left: randomLeft,
        animation: "fall " + randomSpeed + "s" + " infinite",
      })
    }
    if (this.has2Played === false) {
      this.audio2.play();
      this.has2Played = true;
    }
  }
  specialCollision() {
      let hankey = $('.mrhankey');
      let cartman = $('#cartman');
      for (let special of hankey) {
        if (this.checkForCollision(special, cartman)) {
          this.counter += 10;
          $('#counter').text(this.counter);
          special.remove();
        }
      }
  }
  specialMiss() {
    let hankey = $('.mrhankey');
    for (let special of hankey) {
      let y1 = hankey.offset().top;
      let hankeyHeight = hankey.outerHeight(true);
      let entireHankeyHeight = y1 + hankeyHeight;
      if (entireHankeyHeight > 550) {
        special.remove();
      }
    }
  }
  startTimer() {
    this.time = setInterval(function() {
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
  }
  stopTimer() {
    if (game.checkWin()) {
      clearInterval(this.time);
      this.level = 2;
      this.counter = 0;
      let levelHTML = $('#level');
      levelHTML.html('Level Two');
      let timerReset = $('#timer');
      timerReset.html('1:00');
    }
  }
}

let game = new Game;

$('#start').on('click', function() {
  $('#yes-audio').trigger('play');
  game.hasPlayed = false;
  game.sendWinMessageBack();
  game.startGame();
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
    game.specialCollision();
    game.specialMiss();
    game.checkWin();
    game.playWinSound();
    game.stopTimer();
  // game.levelAdvance();
  }, 20);
  game.startTimer();
})
