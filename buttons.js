function start() {
    player.gain = new Decimal(1)
    player.unlocks = 1
    fix_buttons()
}

function faster1() {
    let upgradeCost = cost(1, player.gain)
    if (player.number.gte(upgradeCost)) {
        player.number = player.number.sub(upgradeCost)
        player.gain = player.gain.add(1)
    }
}

function faster2() {
    let upgradeCost = cost(2, player.gain2)
    if (player.number.gte(upgradeCost)) {
        player.number = player.number.sub(upgradeCost)
        player.gain2 = player.gain2.add(1)
    }
}

function faster3() {
    let upgradeCost = cost(3, player.gain3)
    if (player.number.gte(upgradeCost)) {
        player.number = player.number.sub(upgradeCost)
        player.gain3 = player.gain3.add(1)
    }
}

function faster4() {
    let upgradeCost = cost(4, player.gain4)
    if (player.number.gte(upgradeCost)) {
        player.number = player.number.sub(upgradeCost)
        player.gain4 = player.gain4.add(0.01)
    }
}