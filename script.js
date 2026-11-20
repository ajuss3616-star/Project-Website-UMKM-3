// Nomor WhatsApp pemilik usaha
const nomorWhatsApp = "6281337057347";

// Data produk
const daftarProduk = [
    { id: "qty1", nama: "Crepes Cokelat", harga: 5000 },
    { id: "qty2", nama: "Crepes Cokelat Ceres Warna-Warni", harga: 7000 },
    { id: "qty3", nama: "Crepes Nutella Susu", harga: 15000 },
    { id: "qty4", nama: "Crepes Cokelat Pisang", harga: 10000 },
    { id: "qty5", nama: "Crepes Cokelat Oreo", harga: 7000 },
    { id: "qty6", nama: "Crepes Cokelat Keju", harga: 7000 },

    { id: "qty7", nama: "Boba Cokelat", harga: 10000 },
    { id: "qty8", nama: "Es Teh", harga: 5000 },
    { id: "qty9", nama: "Es Cincau", harga: 5000 },
    { id: "qty10", nama: "Es Susu", harga: 5000 },
    { id: "qty11", nama: "Mojito Strawberry", harga: 10000 },
    { id: "qty12", nama: "Yakult Blueberry", harga: 10000 }
];

// Format harga menjadi Rupiah
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Proses form pemesanan
const formPesanan = document.getElementById("orderForm");

if (formPesanan) {
    formPesanan.addEventListener("submit", function(event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();

        let daftarPesanan = "";
        let totalHarga = 0;
        let adaPesanan = false;

        // Membaca jumlah setiap produk
        for (const produk of daftarProduk) {
            const inputJumlah = document.getElementById(produk.id);
            const jumlah = Number(inputJumlah.value);

            // Memeriksa jumlah produk
            if (!Number.isInteger(jumlah) || jumlah < 0) {
                alert("Jumlah produk harus berupa angka bulat dan tidak boleh negatif!");
                inputJumlah.focus();
                return;
            }

            if (jumlah > 0) {
                const subtotal = jumlah * produk.harga;

                daftarPesanan += `\n- ${produk.nama} (${jumlah} x ${formatRupiah(produk.harga)}) = ${formatRupiah(subtotal)}`;

                totalHarga += subtotal;
                adaPesanan = true;
            }
        }

        // Memastikan pembeli memilih produk
        if (!adaPesanan) {
            alert("Silakan pilih minimal satu produk!");
            return;
        }

        // Membuat pesan WhatsApp
        const pesan = `Halo, saya ingin memesan produk Crepes & Choco Milk.

Nama: ${nama}
Email: ${email}

Daftar Pesanan:${daftarPesanan}

Total Pembayaran: ${formatRupiah(totalHarga)}

Terima kasih.`;

        // Membuka WhatsApp
        const linkWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

        window.open(linkWhatsApp, "_blank");
    });
}