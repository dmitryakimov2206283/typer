function DataBinder(element, data) {
    this.data = data
    this.element = element
    element.innerHTML = data
    element.addEventListener("change", this, false)
}

DataBinder.prototype.handleEvent = function(event) {
    switch (event.type) {
        case "change": this.change(this.element.value)
    }
}

DataBinder.prototype.change = function(value) {
    this.data = value
    this.element.innerHTML = value
}