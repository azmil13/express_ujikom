const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');

// CREATE: Menambahkan data ke dalam tabel kategoris
router.get('/api/v1/produk', produkController.get);
router.get('/api/v1/produk/:id', produkController.findOne);
router.post('/api/v1/produk/add', produkController.create);
router.put('/api/v1/produk/edit/:id', produkController.update);
router.delete('/api/v1/produk/delete/:id', produkController.delete);

module.exports = router;