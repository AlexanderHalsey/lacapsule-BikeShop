var express = require('express');
var router = express.Router();


var dataBike = [
  {
    nom: "BIKO45",
    prix: 679,
    image: "images/bike-1.jpg",
  },
  {
    nom: "ZOOK7",
    prix: 799,
    image: "images/bike-2.jpg",
  },
  {
    nom: "LIKO89",
    prix: 839,
    image: "images/bike-3.jpg",
  },
  {
    nom: "GEWO8",
    prix: 1249,
    image: "images/bike-4.jpg",
  },
  {
    nom: "KIWIT",
    prix: 899,
    image: "images/bike-5.jpg",
  },
  {
    nom: "NASAY",
    prix: 1399,
    image: "images/bike-6.jpg",
  },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { dataBike });
});

var dataCardBike = [
  { quantity: 2, bikeIndex: 0 },
  { quantity: 1, bikeIndex: 1 },
  { quantity: 1, bikeIndex: 4 },  
]

router.get('/shop', function(req, res, next) {
  res.render('shop', { dataBike, dataCardBike });
});

module.exports = router;
