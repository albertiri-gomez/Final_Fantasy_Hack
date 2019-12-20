// arma del enemigo

function EnemyBullet(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.w = 50;
  this.h = 30;
  this.img = new Image();
  this.img.src = "img/espada_sefirot.png";
  this.r = 5;
  this.w = 80;
  this.h = 65;

  this.vx = 10;
  this.vy = 1;

  this.gravity = 0.25;
}

EnemyBullet.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  this.move();
};

EnemyBullet.prototype.move = function() {
  this.x -= this.vx;
};
