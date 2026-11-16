const tombolTema = document.getElementById("tombolTema");

tombolTema.addEventListener("click", function () {
    document.body.classList.toggle("mode-gelap");

    if (document.body.classList.contains("mode-gelap")) {
        tombolTema.innerHTML = "Mode Terang";
    } else {
        tombolTema.innerHTML = "Mode Gelap";
    }
});

// 1. Daftar keahlian (halaman Beranda), data dari
// data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkill) {
  muatKeahlian();
}

// 3. PENGHITUNG KARAKTER
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
    kotakPesan.addEventListener("input", () => {
        hitungKarakter.textContent =
            `${kotakPesan.value.length}/300 karakter`;
    });
}


// 4. DATA ENAM PROYEK
let proyek = [];
async function muatProyek() {
  try {
    jumlahProyek.textContent = "Memuat proyek...";

    const response = await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    proyek = await response.json();
    tampilkanProyek(proyek);

  } catch (error) {
    jumlahProyek.textContent = "Data proyek gagal dimuat.";
    console.error(error);
  }
}


// 5. MENAMPILKAN KARTU PROYEK
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
    return `
        <article class="kartu">
            <span class="label">${item.kategori}</span>
            <h3>${item.judul}</h3>
            <img src="${item.gambar}" alt="${item.alt}" width="280">
            <p>${item.deskripsi}</p>
        </article>
    `;
}

function tampilkanProyek(daftar) {
    if (!daftarProyek || !jumlahProyek) return;

    const semuaKartu = daftar.map((item) => buatKartu(item));

    daftarProyek.innerHTML = semuaKartu.join("");

    jumlahProyek.textContent =
        `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}


// 6. FILTER PROYEK DAN TOMBOL AKTIF
function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);

    if (!tombol) return;

    tombol.addEventListener("click", () => {
        const tombolAktif = document.querySelector(".tombol-filter.aktif");

        if (tombolAktif) {
            tombolAktif.classList.remove("aktif");
        }

        tombol.classList.add("aktif");

        if (kategori === "Semua") {
            tampilkanProyek(proyek);
        } else {
            const hasilFilter = proyek.filter((item) => {
                return item.kategori === kategori;
            });

            tampilkanProyek(hasilFilter);
        }
    });
}


// Jalankan filter hanya pada halaman Proyek
if (daftarProyek && jumlahProyek) {
    muatProyek();

    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-javascript", "JavaScript");
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "eldaaprilia07-oss";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");


async function ambilRepo() {
    statusRepo.textContent = "Memuat...";

    try {
        const response = await fetch(alamatRepo + pilihan);

        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        const repos = await response.json();

        repos.forEach((repo) => {
            const item = document.createElement("li");
            const tautan = document.createElement("a");

            tautan.href = repo.html_url;
            tautan.target = "_blank";
            tautan.textContent = `${repo.name} (${repo.language || "Tidak diketahui"}, ${repo.stargazers_count} bintang)`;

            item.appendChild(tautan);
            daftarRepo.appendChild(item);
        });

        statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;

    } catch (error) {
        statusRepo.textContent = "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
        console.error(error);
    }
}

if (daftarRepo) {
    ambilRepo();
}
