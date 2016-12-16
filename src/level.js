class Level {
  constructor(number, time, speed, points) {
    this.number = 1;
    this.time = 1;
    this.speed = 1;
    this.points = 0;
  }
  startLevel() {
    levelStart = setInterval(function() {
      shootPoof();
      watchHitBox();
    }, level.speed * 1000);
    setTimeout(function() {
      console.log('End Level');
      clearInterval(levelStart);
      clearInterval(hitbox);
    }, (level.time * 60) * 1000);
  }
