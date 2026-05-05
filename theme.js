
    var body = document.body;
    var theme = localStorage.getItem("theme");

    if (!theme) {
        theme = "light";
    }

    function set(theme) {
        body.classList.remove("nav-top", "nav-sidebar", "sidebar-open");

        if (theme === "dark") {
            body.classList.add("dark", "nav-sidebar");
            document.getElementById("themeStylesheet").href = "css/themes/dark/theme.css";
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.add("nav-top");
            document.getElementById("themeStylesheet").href = "css/themes/light/theme.css";
            localStorage.setItem("theme", "light");
        }
    }

    set(theme);

    var menuBtn = document.querySelector(".menu-toggle");

    if (menuBtn) {
        menuBtn.onclick = function () {
            if (body.classList.contains("nav-sidebar")) {
                body.classList.toggle("sidebar-open");
            }
        };
    }

    // theme toggle
    var btn = document.querySelector(".theme-toggle");

    if (btn) {
        btn.onclick = function () {
            if (localStorage.getItem("theme") === "dark") {
                set("light");
            } else {
                set("dark");
            }
        };
    }

document.addEventListener("click", function(event) {
    const menu = document.querySelector("header");
    const body = document.body;
    if (!menu.contains(event.target)) {
        body.classList.remove("sidebar-open");
    }
})