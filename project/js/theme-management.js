const themeToggle = document.getElementById("theme-toggle")
let currentTheme = localStorage.getItem("theme") || "light";

caption = currentTheme === "dark" ? "Светлая тема" : "Темная тема";
themeToggle.children[1].innerText = caption;

document.documentElement.setAttribute("data-theme", currentTheme);

themeToggle.addEventListener("click", () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    newCaption = newTheme === "dark" ? "Светлая тема" : "Темная тема";
    themeToggle.children[1].innerText = newCaption;

    currentTheme = newTheme;
})