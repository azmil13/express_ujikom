const express = require('express');
const auth = require('./authRoute');
const user = require('./userRoute');
const galeri = require('./galeriRoute');
const kategori = require('./kategoriRoute');
const kontak = require('./kontakRoute');
const produk = require('./produkRoute')
const router = express.Router();

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Hello World"
    })
})

router.use(auth)
router.use(user)
router.use(galeri)
router.use(kategori)
router.use(kontak)
router.use(produk)
// other route
module.exports = router;
