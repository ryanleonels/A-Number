const ge = (x) => document.getElementById(x)

const def_player = {
    number: new Decimal(0),
    gain: new Decimal(0),
    unlocks: 0,
    offline_time: 0
}

let player;

function check_unlocks() {
    let u = 0
    if (player.gain.gte(1)) u = 1
    if (player.number.gte(200)) u = 2
    return u
}

function tab(n) {
    ge("number").style.display = (n == 0 ? "inline-block" : "none")
    ge("alpha").style.display = (n == 1 ? "inline-block" : "none")
}

setInterval(() => {
    real_gain = new Decimal(0)
    real_gain = real_gain.add(player.gain)
    
    player.number = player.number.add(real_gain.div(30))
    ge("number-display").innerHTML = format(player.number)
    ge("speed-cost").innerHTML = format(new Decimal(10).mul(new Decimal(1.15).pow(player.gain.sub(1))))

    let u = check_unlocks()
    player.unlocks = Math.max(player.unlocks, u)
    fix_buttons()
}, (1000 / 30));
