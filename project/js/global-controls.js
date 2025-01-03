// Map <key_code>: <element_id>
var keysTargets = {
    // Enter
    13: "invitation-header"
}

var altTargets = {
    // L (Д)
    76: "login-link",
    // M (Ь)
    77: "page-main-link",
    // P (З)
    80: "profile-link",
    // R (К)
    82: "restart-typing",
    // T (Е)
    84: "theme-toggle",
    // W (Ц)
    87: "leaderboard-link"
}

function handleKeydownControl(e) {
    console.log("Key = " + e.key)
    console.log("Target id = " + keysTargets[e.key])

    if (e.altKey) 
        targetId = altTargets[e.keyCode]
    else
        targetId = keysTargets[e.keyCode]

    var target = document.getElementById(targetId)

    if (target != null)
        target.click()
}

window.addEventListener("keydown", handleKeydownControl)