var express = require('express');
const { route } = require('express/lib/application');
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
];

dataCardBike = [

];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { dataBike });
});

router.get('/shop', function(req, res, next) {
  /* on veut savoir si un bike qu'on ajout est deja dans notre tableau. Si oui on addition +1 au quantite de cette object, si non on cré un nouveau object*/
  var findBike = dataCardBike.find(bike => parseInt(req.query.new) === bike.bikeIndex);
  if (findBike) {
    dataCardBike[dataCardBike.indexOf(findBike)].quantity += 1;
  } else {
    dataCardBike.push({
      bikeIndex: parseInt(req.query.new),
      quantity: 1,
    });
  }
  res.render('shop', { dataBike, dataCardBike});
});

router.get("/delete-shop", function(req, res, next) {
  /* on veut trouver l'index du velo qui correspond dans le tableau qu'on veut supprimer */
  var removeBike = dataCardBike.find(bike => parseInt(req.query.remove) === bike.bikeIndex);
  /* on supprime un element a l'index coresspondant */
  dataCardBike.splice(dataCardBike.indexOf(removeBike), 1);

  res.render("shop", { dataBike, dataCardBike });
});

router.post('/shop', function(req, res, next) {
  /* on veut trouver le velo dont la quantite doit changer */
  var findBike = dataCardBike.find(bike => parseInt(req.body.index) === bike.bikeIndex);
  /* quand on a trouvé le velo qui correspond on peut redefinir la quantite que se trouve dans la requete du client */
  dataCardBike[dataCardBike.indexOf(findBike)].quantity = parseInt(req.body.qty);

  res.render("shop", { dataBike, dataCardBike })
});


module.exports = router;
