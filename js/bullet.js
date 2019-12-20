function Bullet(game, x, y, src) {
    this.game = game;
    this.x = this.game.player.positionX + game.player.w / 2;
    this.y = this.game.player.positionY + game.player.h / 2.5;
    this.img = new Image
    this.img.src = src
    this.r = 5;
    this.w = 80
    this.h = 65
    this.vx = 10;
    this.vy = 1;
    this.gravity = 0.25;
}

Bullet.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    this.img = new Image
    this.img.src = "img/dagger.png"
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Bullet.prototype.move = function() {
    this.x += this.vx;
};

// Bullet.prototype.moveShoot = function() {
//     this.x -= this.dx;
// }


