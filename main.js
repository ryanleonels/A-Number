const ge = (x) => document.getElementById(x)

const def_player = {
    bnuy: new Decimal(0),
    bnuy_gen: new Decimal(0),
    alpha: new Decimal(0),
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
    if (player.bnuy.gte(1000) || player.alpha.gte(1)) u = 2
    if (player.bnuy.gte(Number.MAX_VALUE)) u = 3
    return u
}

function tab(n) {
    ge("number").style.display = (n == 0 ? "inline-block" : "none")
    ge("alpha").style.display = (n == 1 ? "inline-block" : "none")
}

function alpha(n) {
    return Decimal.pow(new Decimal(n).add(1), new Decimal(n).add(1))
}

function fib(n) {
    return Decimal.pow(phi1, n).sub(Decimal.pow(phi2, n)).div(sqrt5)
}

function softcap(value, cap, scPow, isDecimal = false){
    if(isDecimal){
        if(value.lte(cap)) return value
        return value.pow(scPow).times(cap.pow(new Decimal(1).sub(scPow)))
    }

    if(value <= cap) return value
    return (value ** scPow) * (cap ** (1 - scPow))
}

function cost(n, k) {
    switch (n) {
        case 1:
            if (new Decimal(k).gte(1000)) return new Decimal(Infinity)
            return new Decimal(2).pow(k)
        case 2:
            if (new Decimal(k).gte(100)) return new Decimal(Infinity)
            return new Decimal(1000).pow(new Decimal(k).add(1))
        default:
            return new Decimal(Infinity)
    }
}

function tick(ms) {
    unlocks = check_unlocks()
    bnuy_gain = new Decimal(0)
    if (unlocks >= 1 && player.bnuy_gen.gt(0)) bnuy_gain = bnuy_gain.add(fib(player.bnuy_gen.add(1)))
    if (unlocks >= 2) bnuy_gain = bnuy_gain.mul(alpha(player.alpha))
    if (unlocks >= 3) {
        if (player.unlocks < 3) alert("The world has collapsed due to excess bnuys.")
    }
    bnuy_gain = softcap(bnuy_gain, new Decimal(1e200), 0.5, true)
    
    player.bnuy = player.bnuy.add(bnuy_gain.mul(ms / 1000)).min(Number.MAX_VALUE)
    ge("gen-display").innerHTML = format1(player.bnuy_gen)
    ge("gain-display").innerHTML = format1(bnuy_gain)
    ge("number-display").innerHTML = format1(player.bnuy)
    ge("breed-cost").innerHTML = format1(cost(1, player.bnuy_gen))
    ge("alpha-display").innerHTML = format1(player.alpha)
    ge("alpha-mult-display").innerHTML = format1(alpha(player.alpha))
    ge("alpha-cost").innerHTML = format1(cost(2, player.alpha))
    ge("softcapped").innerHTML = bnuy_gain.gte(1e200) ? " (softcapped)" : ""
    ge("hardcapped").innerHTML = player.bnuy.gte(Number.MAX_VALUE) ? " (hardcapped)" : ""
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

