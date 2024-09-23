const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño de la ventana del navegador
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 5,
    size: 20,
    direction: { x: 0, y: -1 }, // Dirección inicial hacia arriba
    alive: true
};

const projectiles = [];
const enemies = [];
const specialEnemies = [];
let projectileSpeed = 10;  // Velocidad inicial de los proyectiles
let lastUpgradeTime = 0;   // Tiempo de la última mejora de disparo
let gameTime = 0;         // Tiempo transcurrido en el juego
const upgradeInterval = 10000; // Intervalo de mejora en milisegundos
let specialEnemySpawnChance = 0.1; // Probabilidad inicial de aparición de enemigos especiales

function spawnEnemy() {
    const isSpecial = Math.random() < specialEnemySpawnChance;
    if (isSpecial) {
        const specialEnemy = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 20,
            speed: 1.5,
            health: 5 // Vida inicial de los enemigos especiales
        };
        specialEnemies.push(specialEnemy);
    } else {
        const enemy = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 20,
            speed: 1.5
        };
        enemies.push(enemy);
    }
}

// Generar enemigos al azar cada 1 segundo
setInterval(spawnEnemy, 1000);

function shoot() {
    const projectile = {
        x: player.x,
        y: player.y,
        size: 5,
        speed: projectileSpeed,
        direction: { ...player.direction }
    };
    projectiles.push(projectile);
}

window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        shoot();
    }
});

function update(deltaTime) {
    gameTime += deltaTime;

    // Incrementar la probabilidad de aparición de enemigos especiales con el tiempo
    if (specialEnemySpawnChance < 1) {
        specialEnemySpawnChance += 0.001;
    }

    // Mejorar los disparos cada 10 segundos
    if (gameTime - lastUpgradeTime > upgradeInterval) {
        projectileSpeed += 2;
        lastUpgradeTime = gameTime;
    }

    // Actualizar la dirección del jugador según el movimiento
    if (keys['ArrowUp']) {
        player.y -= player.speed;
        player.direction = { x: 0, y: -1 };
    }
    if (keys['ArrowDown']) {
        player.y += player.speed;
        player.direction = { x: 0, y: 1 };
    }
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
        player.direction = { x: -1, y: 0 };
    }
    if (keys['ArrowRight']) {
        player.x += player.speed;
        player.direction = { x: 1, y: 0 };
    }

    // Asegurar que el jugador se mantenga dentro de los límites
    if (player.x < player.size / 2) player.x = player.size / 2;
    if (player.y < player.size / 2) player.y = player.size / 2;
    if (player.x > canvas.width - player.size / 2) player.x = canvas.width - player.size / 2;
    if (player.y > canvas.height - player.size / 2) player.y = canvas.height - player.size / 2;

    // Actualizar la posición de los proyectiles
    projectiles.forEach((projectile, index) => {
        projectile.x += projectile.direction.x * projectile.speed;
        projectile.y += projectile.direction.y * projectile.speed;
        if (projectile.x < 0 || projectile.y < 0 || projectile.x > canvas.width || projectile.y > canvas.height) {
            projectiles.splice(index, 1);
        }
    });

    // Mover los enemigos hacia el jugador
    enemies.forEach(enemy => {
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        enemy.x += Math.cos(angle) * enemy.speed;
        enemy.y += Math.sin(angle) * enemy.speed;
    });

    // Mover los enemigos especiales hacia el jugador
    specialEnemies.forEach(specialEnemy => {
        const angle = Math.atan2(player.y - specialEnemy.y, player.x - specialEnemy.x);
        specialEnemy.x += Math.cos(angle) * specialEnemy.speed;
        specialEnemy.y += Math.sin(angle) * specialEnemy.speed;
    });

    // Comprobar colisiones entre proyectiles y enemigos
    projectiles.forEach((projectile, pIndex) => {
        enemies.forEach((enemy, eIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (dist < projectile.size / 2 + enemy.size / 2) {
                enemies.splice(eIndex, 1);
                projectiles.splice(pIndex, 1);
            }
        });
    });

    // Comprobar colisiones entre proyectiles y enemigos especiales
    projectiles.forEach((projectile, pIndex) => {
        specialEnemies.forEach((specialEnemy, seIndex) => {
            const dist = Math.hypot(projectile.x - specialEnemy.x, projectile.y - specialEnemy.y);
            if (dist < projectile.size / 2 + specialEnemy.size / 2) {
                specialEnemy.health -= 1;
                projectiles.splice(pIndex, 1);
                if (specialEnemy.health <= 0) {
                    specialEnemies.splice(seIndex, 1);
                }
            }
        });
    });

    // Comprobar colisiones entre el jugador y los enemigos
    enemies.forEach(enemy => {
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist < player.size / 2 + enemy.size / 2) {
            player.alive = false;
        }
    });

    // Comprobar colisiones entre el jugador y los enemigos especiales
    specialEnemies.forEach(specialEnemy => {
        const dist = Math.hypot(player.x - specialEnemy.x, player.y - specialEnemy.y);
        if (dist < player.size / 2 + specialEnemy.size / 2) {
            player.alive = false;
        }
    });
}

function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar al jugador si está vivo
    if (player.alive) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '48px serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }

    // Dibujar los proyectiles
    projectiles.forEach(projectile => {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.size / 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Dibujar a los enemigos
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
    });

    // Dibujar a los enemigos especiales
    specialEnemies.forEach(specialEnemy => {
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.moveTo(specialEnemy.x, specialEnemy.y - specialEnemy.size / 2);
        ctx.lineTo(specialEnemy.x - specialEnemy.size / 2, specialEnemy.y + specialEnemy.size / 2);
        ctx.lineTo(specialEnemy.x + specialEnemy.size / 2, specialEnemy.y + specialEnemy.size / 2);
        ctx.closePath();
        ctx.fill();
    });

    // Dibujar el temporizador en la esquina superior izquierda
    ctx.fillStyle = 'white';
    ctx.font = '24px serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Time: ${Math.floor(gameTime / 1000)}s`, 10, 30);

    // Dibujar el tiempo restante para la próxima mejora de disparo
    const timeToNextUpgrade = Math.max(0, upgradeInterval - (gameTime - lastUpgradeTime));
    ctx.fillText(`Next Upgrade: ${Math.ceil(timeToNextUpgrade / 1000)}s`, 10, 60);
}

let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    if (player.alive) {
        update(deltaTime);
    }
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
