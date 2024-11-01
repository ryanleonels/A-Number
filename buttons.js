function adopt() {
    player.bnuy = new Decimal(1)
    player.bnuy_gen = new Decimal(1)
    if (player.unlocks < 1) player.unlocks = 1
    fix_buttons()
}

function breed() {
    let upgradeCost = cost(1, player.bnuy_gen)
    if (player.bnuy.gte(upgradeCost)) {
        player.bnuy = player.bnuy.sub(upgradeCost)
        player.bnuy_gen = player.bnuy_gen.add(1)
    }
}

function prestige() {
    let prestigeCost = cost(2, player.gwa)
    if (player.bnuy.gte(prestigeCost)) {
        player.bnuy = new Decimal(0)
        player.bnuy_gen = new Decimal(0)
        player.gwa = player.gwa.add(1)
    }
}