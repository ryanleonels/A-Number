function decimalise(obj) {
    if (Array.isArray(obj)) {
        for (let i in obj) {
            obj[i] = decimalise(obj[i])
        }
        return obj
    } else if (typeof obj == "object") {
        let k = Object.keys(obj)
        for (let i in k) {
            obj[k[i]] = decimalise(obj[k[i]])
        }
        return obj
    } else if (typeof obj == "string") {
        let attempt = new Decimal(obj)
        if (attempt.eq(Decimal.dZero)) {
            if (obj == "0") {
                return attempt
            } else {
                // Object is not a valid decimal
                return obj
            }
        } else {
            if (attempt.isNan()) {
                return obj
            }
            return attempt
        }
    } else {
        return obj
    }
}

function save() {
    save_data = btoa(JSON.stringify(player))
    localStorage.setItem("numbr1", save_data)
    localStorage.setItem("numbr1_time", Date.now())
}

function load() {
    save_data = localStorage.getItem("numbr1")
    if (save_data != null) {
        decrypted_save_data = JSON.parse(atob(save_data))
        player = decimalise(decrypted_save_data)
        player.offline_time += (Date.now() - Number(localStorage.getItem("numbr1_time")))
        return true
    } else {
        return false
    }
}

function reset_everything(noprompt) {
    if (!noprompt) {
        if (!confirm("Really hard reset? This gives no bonuses.")) return
        if (!confirm("REALLY hard reset? This will not unlock anything.")) return
    }

    localStorage.removeItem("numbr1")
    localStorage.removeItem("numbr1_time")
    document.location.reload()
}

function fix_buttons() {
    ge("button0").style.display = player.unlocks == 0 ? "inline-block" : "none"
    ge("button1").style.display = player.unlocks >= 1 ? "inline-block" : "none"
    ge("button2").style.display = player.unlocks >= 2 ? "inline-block" : "none"
    ge("button3").style.display = player.unlocks >= 3 ? "inline-block" : "none"
    ge("button4").style.display = player.unlocks >= 4 ? "inline-block" : "none"

    ge("tab0_button").style.display = player.unlocks >= 1 ? "inline-block" : "none"
    ge("tab1_button").style.display = player.unlocks >= 5 ? "inline-block" : "none"
}

if (!load()) {player = def_player} // Load the game
fix_buttons()

setInterval(() => {
    save()
}, 15000)