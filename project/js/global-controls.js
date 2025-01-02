// Map <key_code>: <element_id>
let keysTargets = {
    // Enter
    13: "invitation-header"
}

let altTargets = {
    // L (Д)
    76: "login-link",
    // R (К)
    82: "restart-typing",
    // T (Е)
    84: "theme-toggle"
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