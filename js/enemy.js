function Enemy(game) {
    this.game = game
    this.x = this.game.canvas.width;
    this.y = this.game.canvas.height - 200;
    this.img = new Image()
    // this.img.src = "img/Reno.png"
    this.img.src = "img/Reno.png"
    this.dx = 5
    this.w = 170
    this.h = 220
}
Enemy.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

};

Enemy.prototype.move = function() {
    this.x -= this.dx;
};