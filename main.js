const ge = (x) => document.getElementById(x)

const def_player = {
    bnuy: new Decimal(0),
    bnuy_gen: new Decimal(0),
    unlocks: 0,
    last_tick: 0
}
const sqrt5 = new Decimal(5).sqrt()
const phi1 = new Decimal(1).add(sqrt5).div(2)
const phi2 = new Decimal(1).sub(sqrt5).div(2)

let player;

function check_unlocks() {
    let u = 0
    if (player.bnuy_gen.gte(1)) u = 1
    if (player.bnuy.gte(1000000)) u = 2
    return u
}

function tab(n) {
    ge("number").style.display = (n == 0 ? "inline-block" : "none")
    ge("alpha").style.display = (n == 1 ? "inline-block" : "none")
}

function fib(n) {
    return Decimal.pow(phi1, n).sub(Decimal.pow(phi2, n)).div(sqrt5)
}

function cost(n, k) {
    switch (n) {
        case 1:
            return new Decimal(2).pow(k)
        default:
            return new Decimal(Infinity)
    }
}

function tick(ms) {
    unlocks = check_unlocks()
    bnuy_gain = new Decimal(0)
    if (unlocks >= 1) bnuy_gain = bnuy_gain.add(fib(player.bnuy_gen.add(1)))
    
    player.bnuy = player.bnuy.add(bnuy_gain.mul(ms / 1000))
    ge("gen-display").innerHTML = format(player.bnuy_gen, 0)
    ge("gain-display").innerHTML = format(bnuy_gain, 0)
    ge("number-display").innerHTML = format(player.bnuy, 0)
    ge("breed-cost").innerHTML = format(cost(1, player.bnuy_gen), 0)
    let u = check_unlocks()
    player.unlocks = Math.max(player.unlocks, u)
    fix_buttons()
}

function main_loop() {
    if (player.last_tick === 0) player.last_tick = Date.now()
    diff = Math.max(Date.now() - player.last_tick, 1000 / 30)
    tick(diff)
    player.last_tick = Date.now()
}

setInterval(() => {
    main_loop()
}, (1000 / 30));

