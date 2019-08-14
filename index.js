
var player = new Dot();
player.cannotLeaveScreen = true;
var enemies = [];
var minimumPlayerSize = 20;
player.size = minimumPlayerSize;
function setup() {
    createCanvas(windowWidth, windowHeight);
    player.setPosition(windowWidth / 2, windowHeight / 2);

    p5.disableFriendlyErrors = true;
    if (windowHeight < windowWidth) {
        playerSpeed *= windowHeight / 743;
        enemySpeed *= windowHeight / 743;
    } else {
        playerSpeed *= windowWidth / 743;
        enemySpeed *= windowWidth / 743;

    }
}
var score = 0;
var firstBite = false;
var backgroundColor = "#222"
var invertedColors = false;
function draw() {
    background(backgroundColor)
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
                    if (player.size > windowWidth && player.size > windowHeight) {
                        if (!invertedColors) {
                            player.color = "#222"
                            backgroundColor = "#fff"
                            enemyColor = "#222";

                        } else {
                            player.color = "#fff"
                            backgroundColor = "#222"
                            enemyColor = "#fff";

                        }
                        firstBite = false;
                        invertedColors = !invertedColors;
                        player.size = minimumPlayerSize;
                        minimumEnemySize = 7;
                        maximumEnemySize = 30;
                        enemies = [];
                    }
                    score++;
                }
                else {
                    gameOver();
                }
            }
            enemy.update();
            enemy.draw();
            textSize(32);
            fill(player.color)
            text(score, 0, 32);
            // player.setPosition(mouseX,mouseY)
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
function resetStage() {
    player.color = "#fff"
    backgroundColor = "#222"
    enemyColor = "#fff";

    firstBite = false;
    invertedColors = false;
    player.size = minimumPlayerSize;
    minimumEnemySize = 7;
    maximumEnemySize = 30;
    enemies = [];
    score = 0;
    player.setPosition(windowWidth / 2, windowHeight / 2);
    loop();
}
function gameOver() {
    noLoop();
    alert("Game over! You ate " + score + " enemies");
    resetStage();
}
var enemyColor = "#fff";
var enemySpeed = 1;
var minimumEnemySize = 7;
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
        newEnemy.color = enemyColor;
        // console.log("new Enemy size = " + newEnemy.size + " speedFactor: " + speedFactor)
        enemies.push(newEnemy)
    }
}
const options = { probabilityThreshold: 0.75 };
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
            if (results[0].confidence > 0.98) up();
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
