function Enemy2(game) {
    this.game = game
    this.x = this.game.canvas.width;
    this.y = this.game.canvas.height - 200;
    this.img = new Image
    this.img.src = "img/sefirot_3.png"

    this.dx = 5
    this.w = 180
    this.h = 220
    this.bullet = []

    this.shootBullet()

}

Enemy2.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Enemy2.prototype.shootBullet = function() {

    var shoot = new EnemyBullet(this.game, this.x, this.y + this.h / 2.5)
    this.bullet.push(shoot)
}
Enemy2.prototype.move = function() {
    
    this.x -= this.dx;
}