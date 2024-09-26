function start() {
    player.gain = new Decimal(1)
    player.unlocks = 1
    fix_buttons()
}

function faster() {
    let cost = new Decimal(10).mul(new Decimal(1.15).pow(player.gain.sub(1)))
    if (player.number.gte(cost)) {
        player.number = player.number.sub(cost)
        player.gain = player.gain.add(1)
    }
}