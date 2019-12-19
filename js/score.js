
const ScoreBoard = {
    update: function(score, ctx) {
        this.width = 50
        this.height = 40
        ctx.font = "30px sans-serif"
        ctx.fillStyle = "white"
        ctx.fillText("Score: " + Math.floor(score), 50, 50)
    }
}