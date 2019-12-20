//modulo del personaje 

function Player(game) {
    this.game = game
    this.x = this.game.canvas.widtheight* 0.08
    this.y = this.y0

    this.img = new Image
    this.img.src = "img/cloud_player.png"

    this.w = 180
    this.h = 220
    this.y0 = this.game.canvas.height - this.h
    this.vy = 1
    this.positionY = this.y0
    this.positionX = 150
    this.bullets = []

    this.setListerner()

}

// pinta el jugador

Player.prototype.draw = function() {

    this.game.ctx.drawImage(this.img, this.positionX, this.positionY, this.w, this.h);

//bucle para realizar el ataque del personaje
    this.bullets = this.bullets.filter(function(bullet) {
        return bullet.x < this.game.canvas.width;
    }.bind(this));

    this.bullets.forEach(function(bullet) {
        bullet.draw();
        bullet.move();
    });


}


//movimientos del personaje 
Player.prototype.setListerner = function() {

    document.onkeydown = function(e) {
        switch(e.keyCode) {
            case this.game.keys.top:
                this.jump()
                break;
            case this.game.keys.forward:
                this.moveF()
                break;
            case this.game.keys.backward:
                this.moveB()
                break;
            case this.game.keys.shoot:
                if (this.bullets <= 1)
                    this.shoot()
                break;
        }
    }.bind(this)


}

// gravedad en el salto del personaje 
Player.prototype.gravity = function() {
    var gravity = 1.8
    if (this.positionY + gravity <= this.game.canvas.height - this.h) {
        this.positionY += (gravity * 2)
    }
}

// salto del pesonaje 
Player.prototype.jump = function() {
    if (this.positionY - 5 > 0 && this.positionY - 5 >= this.h) {
        this.positionY -= 5
        this.vy = -14
    }
}

//movimiento hacia adelante
Player.prototype.moveF = function() {
    if (this.positionX + 20 > 0) {
        this.positionX += 30
    }
}

//movimiento hacia atras 
Player.prototype.moveB = function() {
    if (this.positionX - 20 > 0) {
        this.positionX -= 30
    }
}

//disparo del personaje
Player.prototype.shoot = function() {
    //console.log("paso por aquí")
    var bullet = new Bullet(this.game, this.positionX + 300, this.positionY + this.h/ 2, "img/espada_cloud.png")
    this.bullets.push(bullet)   
}

//movimiento del personaje 
Player.prototype.move = function() {
    var gravity = 0.4;
    if (this.positionY >= this.y0) {
        this.positionY = this.y0;
        this.vy = 1;
    } else {
        //console.log("entra")
        this.positionY += this.vy;
        this.vy += gravity;
    }
}