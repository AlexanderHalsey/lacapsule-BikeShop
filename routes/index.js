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
  /* initialiser ou modifier le variable dataCardBike qui se trouve dans le session */
  if (!req.session.dataCardBike) req.session.dataCardBike = [];
  /* initialiser ou modifier le variable total qui se trouve dans le session */
  if (!req.session.total) req.session.total = 0;

  var dataCardBike = req.session.dataCardBike;
  /* Si on fait un requete avec un ordre pour le panier on va modifier notre tableau */
  if (Object.entries(req.query).length !== 0) {
    req.session.total++;
    /* on veut savoir si un velo qu'on ajout est deja dans notre tableau. */
    var findBike = dataCardBike.find(bike => parseInt(req.query.new) === bike.bikeIndex);
    /* Si le velo est dans le tableau on addition +1 au quantite de cette object, si non on cré un nouveau object avec un valeur de quantité de 1 */
    if (findBike) {
      dataCardBike[dataCardBike.indexOf(findBike)].quantity += 1;
    } else {
      dataCardBike.push({
        bikeIndex: parseInt(req.query.new),
        quantity: 1,
      });
    };
  };

  res.render('index', { dataBike, dataCardBike, total: req.session.total });
});

router.get('/shop', function(req, res, next) {
  /* initialiser ou modifier le variable dataCardBike qui se trouve dans le session */
  if (!req.session.dataCardBike) req.session.dataCardBike = [];
  var dataCardBike = req.session.dataCardBike;
  res.render('shop', { dataBike, dataCardBike });
});

router.get("/delete-shop", function(req, res, next) {
  /* Modifier le variable dataCardBike qui se trouve dans le session */
  var dataCardBike = req.session.dataCardBike;
  /* on veut trouver l'index du velo qui correspond dans notre tableau qu'on veut supprimer */
  var removeBike = dataCardBike.find(bike => parseInt(req.query.remove) === bike.bikeIndex);
  /* on fait un update du total dans notre panier a travers le session */
  req.session.total -= removeBike.quantity;
  /* on supprime un element a l'index correspondant */
  dataCardBike.splice(dataCardBike.indexOf(removeBike), 1);

  res.render("shop", { dataBike, dataCardBike });
});

router.post('/shop', function(req, res, next) {
  /* Modifier le variable dataCardBike qui se trouve dans le session */
  var dataCardBike = req.session.dataCardBike;
  /* on veut trouver le velo qui correspond dans notre tableau dont la quantite doit changer */
  var findBike = dataCardBike.find(bike => parseInt(req.body.index) === bike.bikeIndex);
  /* quand on a trouvé le velo qui correspond on peut redefinir la quantite que se trouve dans la requete du client */
  req.session.total -= dataCardBike[dataCardBike.indexOf(findBike)].quantity;
  dataCardBike[dataCardBike.indexOf(findBike)].quantity = parseInt(req.body.qty);
  req.session.total += parseInt(req.body.qty);

  res.render("shop", { dataBike, dataCardBike })
});


module.exports = router;
