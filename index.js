
var player = new Dot();
player.cannotLeaveScreen = true;
var enemies = [];
var minimumPlayerSize = 20;
player.size = minimumPlayerSize;
function setup() {
    createCanvas(windowWidth, windowHeight);
    player.setPosition(windowWidth / 2, windowHeight / 2);

    if (windowHeight < windowWidth) {
        playerSpeed *= windowHeight / 743;
    } else playerSpeed *= windowWidth / 743;
}
var score = 0;
var firstBite = false;
function draw() {
    background("#222")
    generateNewEnemies();

    enemies.forEach(function (enemy) {
        if (enemy.isOutsideScreen()) {
            enemies.splice(enemies.indexOf(enemy), 1);
        } else {
            if (player.hits(enemy)) {
                if (player.size > enemy.size) {
                    firstBite = true;
                    enemies.splice(enemies.indexOf(enemy), 1);
                    player.size += enemy.size;
                    score++;
                }
                else {
                    gameOver();
                }
            }
            enemy.update();
            enemy.draw();
        }
    });

    player.update();
    if (player.size > minimumPlayerSize) player.size *= 0.9995;
    if (firstBite) {
        minimumEnemySize *= 1.0005;
        maximumEnemySize *= 1.0005;
    }
    player.draw();
}
function gameOver() {
    noLoop();
    alert("Game over! You ate " + score + " enemies");
}
var enemySpeed = 1;
var minimumEnemySize = 10;
var maximumEnemySize = 30;
function generateNewEnemies() {
    if (random(1) < 0.01) {
        if (random(1) > 0.5) {
            var newEnemy;
            newEnemy = new Dot(random(windowWidth), 0);
            newEnemy.setVelocity(random(-enemySpeed, enemySpeed), random(-enemySpeed, enemySpeed));
            if (newEnemy.vy < 0) newEnemy.y = windowHeight;
        } else {
            var newEnemy; newEnemy = new Dot(0, random(windowHeight));
            newEnemy.setVelocity(random(-enemySpeed, enemySpeed), random(-enemySpeed, enemySpeed));
            if (newEnemy.vx < 0) newEnemy.x = windowWidth;
        }

        var speedFactor = 1 - (Math.abs(newEnemy.vx) + Math.abs(newEnemy.vy)) / (2 * enemySpeed);
        newEnemy.size = minimumEnemySize + (maximumEnemySize - minimumEnemySize) * speedFactor;
        // console.log("new Enemy size = " + newEnemy.size + " speedFactor: " + speedFactor)
        enemies.push(newEnemy)
    }
}
const options = { probabilityThreshold: 0.95 };
const classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);

function modelReady() {
    classifier.classify(gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    // console.log("Result: " + results[0].label + " confidence " + results[0].confidence);
    switch (results[0].label) {
        case "up":
            up();
            break;
        case "down":
            down();
            break;
        case "left":
            left();
            break;
        case "right":
            right();
            break;
        case "stop":
            stop()
            break;
        default:
            break;
    }
}

var playerSpeed = 1;
function up() {
    player.setVelocity(0, -1 * playerSpeed);
}

function down() {
    player.setVelocity(0, 1 * playerSpeed);
}

function left() {
    player.setVelocity(-1 * playerSpeed, 0);
}

function right() {
    player.setVelocity(1 * playerSpeed, 0);
}
function stop() {
    player.setVelocity(0, 0);
}
