let jumlah = 1;

function ubahJumlah(delta) {
    jumlah += delta;
    if (jumlah < 1) jumlah = 1;
    document.getElementById("jumlah").textContent = jumlah;
}

function masukkanKeKeranjang() {
    const nama = "Paracetamol";
    const harga = 5000;

    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    let existing = keranjang.find(item => item.nama === nama);

    if (existing) {
        existing.jumlah += jumlah;
    } else {
        keranjang.push({ nama, harga, jumlah });
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    alert(`${jumlah} Paracetamol berhasil ditambahkan ke keranjang.`);

    // Reset jumlah
    jumlah = 1;
    document.getElementById("jumlah").textContent = jumlah;
}
