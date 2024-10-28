const ge = (x) => document.getElementById(x)

const def_player = {
    number: new Decimal(0),
    gain: new Decimal(0),
    gain2: new Decimal(1),
    gain3: new Decimal(1),
    gain4: new Decimal(1),
    unlocks: 0,
    offline_time: 0
}

let player;

function check_unlocks() {
    let u = 0
    if (player.gain.gte(1)) u = 1
    if (player.number.gte(200) || player.gain2.gt(1)) u = 2
    if (player.number.gte(10000) || player.gain3.gt(1)) u = 3
    if (player.number.gte(1e25) || player.gain4.gt(1)) u = 4
    if (player.gain4.gte(10)) u = 5
    return u
}

function tab(n) {
    ge("number").style.display = (n == 0 ? "inline-block" : "none")
    ge("omega").style.display = (n == 1 ? "inline-block" : "none")
}

function cost(n, k) {
    switch (n) {
        case 1:
            if (k >= 100) return new Decimal(Infinity)
            return new Decimal(10).mul(new Decimal(1.15).pow(new Decimal(k).sub(1)))
        case 2:
            if (k >= 100) return new Decimal(Infinity)
            return new Decimal(200).mul(new Decimal(2).pow(new Decimal(k).sub(1)))
        case 3:
            if (k >= 100) return new Decimal(Infinity)
            return new Decimal(10).pow(new Decimal(4).mul(new Decimal(1.5).pow(new Decimal(k).sub(1))))
        case 4:
            if (k >= 10) return new Decimal(Infinity)
            return new Decimal(10).pow(new Decimal(25).mul(new Decimal(2).pow(new Decimal(k).sub(1).mul(100))))
        default:
            return new Decimal(Infinity)
    }
}

function tick(ms) {
    unlocks = check_unlocks()
    real_gain = new Decimal(0)
    if (unlocks >= 1) real_gain = real_gain.add(player.gain)
    if (unlocks >= 2) real_gain = real_gain.mul(player.gain2)
    if (unlocks >= 3) real_gain = real_gain.pow(player.gain3)
    if (unlocks >= 4) real_gain = real_gain.tetrate(player.gain4)
    
    player.number = player.number.add(real_gain.mul(ms / 1000))
    ge("number-display").innerHTML = format(player.number)
    ge("gain-display").innerHTML = format(real_gain)
    ge("gain1").innerHTML = format(player.gain)
    ge("gain2").innerHTML = format(player.gain2)
    ge("gain3").innerHTML = format(player.gain3)
    ge("gain4").innerHTML = format(player.gain4)
    ge("speed-cost1").innerHTML = format(cost(1, player.gain))
    ge("speed-cost2").innerHTML = format(cost(2, player.gain2))
    ge("speed-cost3").innerHTML = format(cost(3, player.gain3))
    ge("speed-cost4").innerHTML = format(cost(4, player.gain4))

    let u = check_unlocks()
    player.unlocks = Math.max(player.unlocks, u)
    fix_buttons()
}

setInterval(() => {
    tick(1000 / 30)
}, (1000 / 30));
