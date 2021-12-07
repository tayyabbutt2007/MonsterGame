const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK = 16;
const HEAL_VALUE = 18;
const MODE_ATTACK = 'ATTACK'; // can also MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // can also MODE_STRONG_ATTACK = 1

const enteredValue = prompt("Enter an Initial Max life for You and Momster", "100");

let choseMaxLife = parseInt(enteredValue);

if(isNaN(choseMaxLife) || choseMaxLife <= 0) {
    choseMaxLife = 100;
}
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBonusLife = true;

adjustHealthBars(choseMaxLife);

function reset() {
    currentMonsterHealth = choseMaxLife;
    currentPlayerHealth = choseMaxLife;
    resetGame(choseMaxLife);
}

function endRound() {
    let initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(currentPlayerHealth);
        alert("Lucky You, Bonus Life Saved You!");
    }
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("YOU WIN");
        reset();
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
        alert("You Lose");
        reset();
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("DRAW");
        reset();
    }
}


function attackMonster(mode) {
    let maxLife;
    if(mode == MODE_ATTACK){
        maxLife = ATTACK_VALUE;
    }
    else if (mode == MODE_STRONG_ATTACK) {
        maxLife = STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxLife);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}


function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healHander() {
    let healValue;
    if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
        alert("You can't heal beacuse you already have alot power.");
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}


healBtn.addEventListener('click', healHander);
strongAttackBtn.addEventListener('click', strongAttackHandler)
attackBtn.addEventListener('click', attackHandler);