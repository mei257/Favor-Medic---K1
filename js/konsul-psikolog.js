document.addEventListener("DOMContentLoaded", () => {
    const pasienSelect = document.getElementById("pasienSelect");
    const formKeluarga = document.getElementById("form-tambahkeluarga");
    const tanggalInput = document.getElementById("tanggal");
    const jamInput = document.getElementById("jam");
    const submitBtn = document.getElementById("submitBtn");


    const today = new Date().toISOString().split("T")[0];
    tanggalInput.value = today;
    formKeluarga.style.display = "none";

    pasienSelect.addEventListener("change", function () {
    const pilihan = this.value;

    if (pilihan === "keluarga") {
        formKeluarga.style.display = "block";
        document.getElementById("data-diri-sendiri").style.display = "none";
    } else if (pilihan === "dirisendiri") {
        formKeluarga.style.display = "none";
        autoFillDiriSendiri();
    } else {
        formKeluarga.style.display = "none";
        document.getElementById("data-diri-sendiri").style.display = "none";
    }
});


function autoFillDiriSendiri() {
    const data = JSON.parse(localStorage.getItem("userData"));
    const dataContainer = document.getElementById("data-diri-sendiri");

    if (!data) {
        alert("Data diri tidak ditemukan, silakan melakukan registrasi akun terlebih dahulu.");
        dataContainer.style.display = "none";
        return;
    }

    // Tampilkan container
    dataContainer.style.display = "block";

    // Hanya isi jika data tersedia, jika tidak kosongkan saja
    document.getElementById("namaDiri").innerText = data.nama || "";
    document.getElementById("nikDiri").innerText = data.nik || "";
    document.getElementById("ttlDiri").innerText = (data.tempatLahir && data.tanggalLahir) 
        ? `${data.tempatLahir}, ${data.tanggalLahir}` 
        : "";
    document.getElementById("genderDiri").innerText = data.gender || "";
    document.getElementById("beratDiri").innerText = data.beratBadan ? `${data.beratBadan} kg` : "";
    document.getElementById("tinggiDiri").innerText = data.tinggiBadan ? `${data.tinggiBadan} cm` : "";
    document.getElementById("goldarDiri").innerText = data.golonganDarah || "";
    document.getElementById("alergiDiri").innerText = data.alergi || "";
}

    submitBtn.addEventListener("click", function (e) {
        const pilihan = pasienSelect.value;
        const jam = jamInput.value.trim();
        const tanggal = tanggalInput.value.trim();

        if(!tanggal){
            alert("Silakan pilih tanggal konsultasi terlebih dahulu.");
            return;
        }

        const todayDate = new Date(today);
        const selectedDate = new Date(tanggal);
        if (selectedDate < todayDate){
            alert("Tanggal Konsultasi tidak boleh di masa lalu.");
            return;
        }
        if (!pilihan) {
            alert("Silakan pilih pasien terlebih dahulu.");
            return;
        }
        if (!jam) {
            alert("Silakan pilih jam konsultasi terlebih dahulu.");
            return;
        }

        if (pilihan === "keluarga") {
            // Validasi input keluarga
            const nama = document.querySelector('input[name=nama_keluarga]').value.trim();
            const nikInput = document.getElementById("nik");
            const nik = nikInput.value.trim();
            const tempatLahir = document.querySelector('input[name=tempat_lahir]').value.trim();
            const tanggalLahir = document.querySelector('input[name=tanggal_lahir]').value.trim();
            const gender = document.querySelector('input[name="jenis-kelamin"]:checked');
            const berat = document.querySelector('input[name=berat-badan]').value.trim();
            const tinggi = document.querySelector('input[name=tinggi-badan]').value.trim();
            const goldar = document.querySelector('select[name=goldar-pasien]').value;

            if (!nama || !nik || !tempatLahir || !tanggalLahir || !gender || !berat || !tinggi || !goldar) {
                alert("Silakan lengkapi semua data keluarga.");
                return;
            }
            if (isNaN(nik) || nik.length !== 16)
            {
                alert("NIK harus berupa angka 16 digit.");
                return;
            }
            if (isNaN(berat) || Number(berat) <= 0) {
                alert("Berat harus berupa angka lebih dari 0 (nol).");
                return;
            }
            if (isNaN(tinggi) || Number(tinggi) <= 0) {
            alert("Tinggi harus berupa angka lebih dari 0 (nol).");
        }
    }
        alert("Form berhasil disubmit!");
        // Lanjut submit form jika semua valid
        
    });
});
