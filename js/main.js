const tombolTema = document.getElementById("tombolTema");

tombolTema.addEventListener("click", function () {
    document.body.classList.toggle("mode-gelap");

    if (document.body.classList.contains("mode-gelap")) {
        tombolTema.innerHTML = "☀️ Mode Terang";
    } else {
        tombolTema.innerHTML = "🌙 Mode Gelap";
    }
});