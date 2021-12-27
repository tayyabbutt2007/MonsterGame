const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK = 16;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK'; // can also MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // can also MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK'
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';




function getMaxLifeValue() {
    const enteredValue = prompt("Enter an Initial Max life for You and Momster", "100");
    const parsedValue = parseInt(enteredValue);
    
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw {message: 'Invalid user input, Not a number!!'};
    }
    return parsedValue;
}

let choseMaxLife;

try {
    choseMaxLife = getMaxLifeValue();
} catch(error) {
    console.log(error);
    choseMaxLife = 100;
    alert("You Entered Something Wrong, Defoult Value Set i.e. 100");
}


let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBonusLife = true;
const battleLog = [];

adjustHealthBars(choseMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = choseMaxLife;
    currentPlayerHealth = choseMaxLife;
    resetGame(choseMaxLife);
}

function endRound() {
    let initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(currentPlayerHealth);
        alert("Lucky You, Bonus Life Saved You!");
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("YOU WIN");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("You Lose");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("DRAW");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    }
}


function attackMonster(mode) {
    //use of ternary operator
    let maxLife = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK;
    let eventLog = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    // if (mode == MODE_ATTACK) {
    //     maxLife = ATTACK_VALUE;
    //     eventLog = LOG_EVENT_PLAYER_ATTACK;
    // }
    // else if (mode == MODE_STRONG_ATTACK) {
    //     maxLife = STRONG_ATTACK;
    //     eventLog = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    
    const damage = dealMonsterDamage(maxLife);
    currentMonsterHealth -= damage;
    writeToLog(
        eventLog,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
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
        healValue = choseMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function printLogEvent() {
    //For Loop
    // for (let i = 0; i < battleLog.length; i++) {
    //     console.log(battleLog[i]);
    // }

    // //For of Loop
    // let i = 0;
    // for (const logEntry of battleLog) {
    //     console.log(logEntry);
    //     console.log(i);
    //     i++;
    // }
    // console.log(battleLog);

    //For in Loop
    let i = 0;
    for (const logEntry of battleLog) {
        console.log(`#${i}`);
        for (const key in logEntry) {
            console.log(`${key} ==> ${logEntry[key]}`);
        }
        i++;
    }
}

logBtn.addEventListener('click', printLogEvent);
healBtn.addEventListener('click', healHander);
strongAttackBtn.addEventListener('click', strongAttackHandler)
attackBtn.addEventListener('click', attackHandler);