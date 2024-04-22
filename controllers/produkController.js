const { response } = require("..");
const db = require("../database/models");
const Produk = db.produk;

exports.get = async (req, res) => {
    try {
        const result = await Produk.findAndCountAll();
        
        res.json({
            message: "Data Produk berhasil diambil.",
            data: result,
        });
    } catch (err) {
        console.error(err); // Tambahkan log error di sini
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil data Produk.",
            data: null,
        });
    }
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne =  (req, res) => {
    Produk.findByPk(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).json({
                message: `produk dengan id=${req.params.id} tidak ditemukan.`,
                data: result,
            });
        }
        res.json({
            message: "Produk berhasil ditemukan.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil Pro.",
            data: null,
        });
    });
};

// CREATE: Menambahkan data ke dalam tabel kategoris
exports.create = (req, res) => {
    // Data yang diperoleh dari inputan oleh pengguna
    const produkData = {
        nama_produk: req.body.nama_produk,
        description: req.body.description,
        harga: req.body.harga,
        stok: req.body.stok,
    };
    // Proses menyimpan ke dalam database
    Produk.create(produkData)
        .then((result) => {
            res.json({
                message: "Produk berhasil dibuat.",
                data: result,   
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat membuat produk.",
                data: null,
            });
        });
};


// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params
exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        // Field untuk memperbarui data produk
        const produkData = {
            nama_produk: req.body.nama_produk,
            description: req.body.description,
            harga: req.body.harga,
            stok: req.body.stok,
            // Tambahkan bidang lain sesuai kebutuhan
        };

        const data = await Produk.update(produkData, {
            where: { id }, 
        });

        const response = await Produk.findByPk(id)
        const result = data ? data : `${id} not found in db`
        res.json({
    
        response}).status(200)
       
    } catch (err) {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat memperbarui produk.",
            data: null,
        });
    }
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
    const id = req.params.id;
    Produk.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Produk berhasil dihapus.",
                data: req.body,
            });
        } else {
            res.json({
                message: `Tidak dapat menghapus Produk dengan id=${id}. Mungkin kategori tidak ditemukan!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menghapus Produk.",
            data: null,
        });
    });
};
