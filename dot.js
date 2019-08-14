class Dot {
    constructor(x, y) {
        if (x == undefined || y == undefined) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = x;
            this.y = y;
        }
        this.vx = 0;
        this.vy = 0;
        this.size = 20;
        this.cannotLeaveScreen = false;
        this.color=("#fff")
    }
    draw() {
        stroke(this.color); 
        fill(this.color); 

        circle(this.x, this.y, this.size);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // this.vy *= this.velocityDecay;
        // this.vx *= this.velocityDecay;

        if (this.cannotLeaveScreen) {
            if (this.y < 0 || this.y > windowHeight) {
                this.vy = 0;
            }
            if (this.x < 0 || this.x > windowWidth) {
                this.vx = 0;
            }
        }
    }
    setVelocity(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }
    isOutsideScreen() {
        if (this.y < 0 || this.y > windowHeight || this.x < 0 || this.x > windowWidth) {
            return true;
        } else return false;
    }
    hits(otherDot) {
        return collideCircleCircle(this.x, this.y,this.size, otherDot.x, otherDot.y, otherDot.size);
    }
}