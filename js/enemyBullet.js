// arma del enemigo

function EnemyBullet(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.img = new Image();
  this.img.src = "img/espada_sefirot.png";
  this.w = 80;
  this.h = 65;
  this.vx = 7;
  this.vy = 1;
}

EnemyBullet.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  this.move();
};

EnemyBullet.prototype.move = function() {
  this.x -= this.vx;
};
