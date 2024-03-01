const authController = require('./authController');
const userController = require('./userController');
const galeriController = require('./galeriController');
const kategoriController = require('./kategoriController');
const kontakController = require('./kontakController')
const produkController = require ('./produkController')

module.exports = {
    auth: authController,
    user: userController,
    galeri: galeriController,
    kategori: kategoriController,
    kontak: kontakController,
    produk: produkController,
};