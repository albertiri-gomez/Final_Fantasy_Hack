var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  score: undefined,
  keys: {
    top: 38,
    forward: 39,
    backward: 37,
    shoot: 32
  },

  //funcion de arranque del juego
  init: function(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.canvas.setAttribute("width", this.w);
    this.canvas.setAttribute("height", this.h);
    this.start();
    this.img = new Image();
    this.img.src = "img/gameover.jpg";
    this.img2 = new Image();
    this.img2.src = "img/You Win.png";
  },

  //funcion de empieze del juego
  start: function() {
    this.reset();
    // funcion importante para el juego porque calcula el bucle de renderizado y los intervalos de tiempo
    this.interval = setInterval(
      function() {
        this.clear();
        //bucle de renderizado
        this.framesCounter++;
        if (this.framesCounter > 1000) this.framesCounter = 0;
        if (this.framesCounter % 50 === 0) {
          if (this.scor < 100) {
            this.generateEnemy();
          } else {
            //this.generateFinalEnemy()
            this.pushEnemy = [];
          }
        }
        // fin del bucle de renderizado
        this.moveAll();
        this.drawAll();
        this.clearEnemy();
        if (this.died() ) {
          this.scor -= 0.5;
        }
        if(this.diedEnemy())
        {this.scor -= 0.5;
        }
        if(this.diedBullet())
        {this.scor -= 0.5;
        }
        if (this.Kill()) {
          this.scor + 10;
        }
        if (this.scor < 0) {
          this.gameOver();
        }
        if (this.scor >= 100) {
          this.Win();
        }
        // if (this.vaderShoot()) {
        //     this.scor -= 0.7
        // }
      }.bind(this),
      1000 / this.fps
    );
  },

  // funcion para parar el juego
  stop: function() {
    clearInterval(this.interval);
  },

  // funcion de fin de juego
  gameOver: function() {
    this.stop();
    this.ctx.drawImage(this.img, 310, 100, this.w / 2, this.h / 2);
  },

  //funcion de ganar el juego
  Win: function() {
    this.stop();
    this.ctx.drawImage(this.img2, 420, 40, 480 * 1.2, 360 * 1.2);
  },

  //resetear el juego
  reset: function() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.framesCounter = 0;
    this.score = ScoreBoard;
    this.enemy = [];
    this.enemy2 = [];
    this.scor = 0;
  },

  //colisiones para cuando te matan
  died: function() {
     this.enemy.forEach(
      function(enem) {
        if (
          this.player.positionX + this.player.w >= enem.x &&
          this.player.positionX < enem.x + enem.w &&
          this.player.positionY + this.player.h >= enem.y &&
          this.player.positionY + this.player.h >= enem.y
        ) {
          this.enemy.splice(enem, 1);
          this.scor -= 30;
        }
      }.bind(this),
    );
  },

  diedEnemy: function () {
    return this.enemy2.forEach(function (enem) {
        if (
            this.player.positionX + this.player.w >= enem.x &&
            this.player.positionX < enem.x + enem.w &&
            this.player.positionY + this.player.h >= enem.y &&
            this.player.positionY + this.player.h >= enem.y
        ) {
            this.enemy2.splice(enem, 1);
            this.scor -= 30;
        }
    }.bind(this)
    );
},

diedBullet: function () {
    return this.enemy2.forEach(function (shoot) {
        return shoot.bullet.forEach(function (benem) {
            if ((this.player.positionX + this.player.w - 60) >= benem.x &&
                this.player.positionX < (benem.x + benem.w) &&
                this.player.positionY + (this.player.h) >= benem.y &&
                this.player.positionY + (this.player.h - 60) >= benem.y
            ) {
                shoot.bullet.splice(benem, 1);
                this.scor -= 10;
            }
        }.bind(this))
    }.bind(this))
},

  // colision para matar
  Kill: function() {
    this.enemy.forEach(
      function(enemy, r) {
        this.player.bullets.forEach(
          function(bullet, i) {
            if (
              bullet.x + bullet.w > enemy.x &&
              bullet.y + bullet.w > enemy.y &&
              bullet.x < enemy.x + enemy.w
            ) {
              this.player.bullets.splice(i, 1);
              this.enemy.splice(r, 1);
              this.scor += 30;
              if (this.scor >= 50) {
                this.generateEnemy2();
                this.pushEnemy = [];
                this.scor - 0.5;
              }
            }
          }.bind(this)
        );
      }.bind(this),
      this.enemy2.forEach(
        function(enem, r) {
          this.player.bullets.forEach(
            function(bullet, i) {
              if (
                bullet.x + bullet.w > enem.x &&
                bullet.y + bullet.h > enem.y &&
                bullet.x < enem.x + enem.w
              ) {
                this.player.bullets.splice(i, 1);
                this.enemy2.splice(r, 1);
                this.scor += 10;
              }
            }.bind(this)
          );
        }.bind(this)
      )
    );
  },

  //limpia el enemigo cuando me da
  clearEnemy: function() {
    this.enemy = this.enemy.filter(function(enem) {
      return enem.x + enem.w >= 0;
    });
  },

  //generacion de enemigos
  generateEnemy: function() {
    function aleatorio(max, min) {
      return Math.round(Math.random(pushEnemy) * (max - min) + min);
    }
    var randomEnemy = aleatorio(4, 1);
    if (randomEnemy >= 3) {
      var pushEnemy = this.enemy.push(new Enemy(this));
    }
    if (this.scor >= 50) {
      this.generateEnemy2();
      this.pushEnemy = [];
      this.scor - 0.5;
    }
    return randomEnemy;
  },

  //limpia todo el escenario
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  //dibuja las cosas necesarias para
  drawAll: function() {
    this.background.draw();
    this.player.draw();
    this.enemy2.forEach(function(enem) {
      enem.draw();
      enem.bullet.forEach(function(b) {
        b.draw();
      });
    });
    this.enemy.forEach(function(enem) {
      enem.draw();
    });
    this.drawScore();
  },

  //movimiento del los enemmigos y el personaje
  moveAll: function() {
    this.player.move();
    this.enemy2.forEach(function(enem2) {
      enem2.move();
    });
    this.enemy.forEach(function(enem) {
      enem.move();
    });
  },

  //pinta la puntuacion del juego
  drawScore: function() {
    this.score.update(this.scor, this.ctx);
  },


  generateEnemy2: function() {
    this.enemy2.push(new Enemy2(this));
  }
};
