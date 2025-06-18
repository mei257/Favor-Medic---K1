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
        if (this.value === "keluarga") {
            formKeluarga.style.display = "block";
        } else {
            formKeluarga.style.display = "none";
        }
    });

    submitBtn.addEventListener("click", function (e) {
        const pilihan = pasienSelect.value;
        const jam = jamInput.value.trim();
        const tanggal = tanggalInput.value.trim();

        if(!tanggal){
            alert("Silakan pilih tanggal konsultasi terlebih dahulu.");
            return;
        }
        if (!pilihan) {
            alert("Silakan pilih pasien terlebih dahulu.");
            return;
        }
        if (!jam) {
            alert("Silakan pilih jam janji terlebih dahulu.");
            return;
        }

        if (pilihan === "keluarga") {
            // Validasi input keluarga
            const nama = document.querySelector('input[name="nama_keluarga"]').value.trim();
            const nik = document.querySelector('input[name="nik"]').value.trim();
            const gender = document.querySelector('input[name="jenis-kelamin"]:checked');

            if (!nama || !nik || !gender) {
                alert("Silakan lengkapi data keluarga (nama lengkap, NIK, tempat lahir, tanggal lahir, jenis kelamin, berat badan, tinggi badan, golongan darah dan).");
                return;
            }
        }

        alert("Form berhasil disubmit!");
        // Lanjut submit form jika semua valid
        
    });
});
