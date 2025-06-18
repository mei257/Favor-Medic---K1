document.addEventListener("DOMContentLoaded", function () {
    // Ambil data
    let cart = JSON.parse(localStorage.getItem("keranjang")) || [];

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    // Modal elements
    const modal = document.getElementById("checkout-modal");
    const closeButton = document.querySelector(".close-button");
    const checkoutForm = document.getElementById("checkout-form");

    // Display Data
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Keranjang masih kosong.</p>";
            cartTotal.textContent = "Rp 0";
            cartTotal.parentElement.style.display = "none";
            checkoutButton.style.display = "none";
            return;
        } else {
            cartTotal.parentElement.style.display = "block";
            checkoutButton.style.display = "inline-block";
        }

        cart.forEach((item, index) => {
            const itemTotal = item.harga * item.jumlah;
            total += itemTotal;

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <div>
                    <strong>${item.nama}</strong><br>
                    Jumlah: ${item.jumlah}<br>
                    Harga: Rp ${item.harga.toLocaleString()}
                </div>
                <div>
                    <p>Total: Rp ${itemTotal.toLocaleString()}</p>
                    <button onclick="hapusItem(${index})">Hapus</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        cartTotal.textContent = "Rp " + total.toLocaleString();
    }

    // Hapus item dari keranjang
    window.hapusItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("keranjang", JSON.stringify(cart));
        renderCart();
    };

    // Buka modal checkout saat tombol ditekan
    checkoutButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Tutup modal saat klik tombol close (x)
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Tutup modal saat klik di luar modal content
    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // Submit form checkout
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Pembayaran Berhasil! Terima kasih telah berbelanja.");

        // Simpan ke riwayat pesanan
        let riwayat = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];
        const timestamp = new Date().toLocaleString();

        riwayat.push({
            waktu: timestamp,
            items: [...cart] // salin isi keranjang
        });

        localStorage.setItem("riwayatPesanan", JSON.stringify(riwayat));

        //  Kosongkan keranjang
        localStorage.removeItem("keranjang");
        cart = [];

        //  Render ulang & tutup modal
        renderCart();
        modal.style.display = "none";
        checkoutForm.reset();
    });

    renderCart();
});
