document.addEventListener("DOMContentLoaded", function () {
  const riwayatContainer = document.getElementById("riwayat-items");

  // Ambil data riwayat dari localStorage
  const riwayat = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];

  if (riwayat.length === 0) {
    riwayatContainer.innerHTML = "<p>Belum ada pesanan yang dilakukan.</p>";
    return;
  }

  // Tampilkan riwayat
  riwayat.forEach((order, i) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("riwayat-item");

    // Format tanggal
    const tanggal = new Date(order.waktu).toLocaleDateString("id-ID", {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    // Hitung total
    const total = order.items.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);

    // Tampilkan pesanan
    orderDiv.innerHTML = `
      <div>
        <strong>Pesanan #${i + 1}</strong><br>
        Tanggal: ${tanggal}<br>
        Total: Rp ${total.toLocaleString()}
        <ul>
          ${order.items.map(item => `
            <li>${item.nama} (${item.jumlah}x) - Rp ${item.harga.toLocaleString()}</li>
          `).join("")}
        </ul>
      </div>
    `;

    riwayatContainer.appendChild(orderDiv);
  });
});
