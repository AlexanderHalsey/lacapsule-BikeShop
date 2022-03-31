var panierResponsive = req => {
    /* si le requete est vide on retourn un objet vide */
    if (Object.keys(req.query).length === 0) return [[], ""];
  
    /* creer une list */
    var indexes = req.query.i || [];
    var quantities = req.query.q;
  
    /* dans les instances ou on a que un index et un quantité, ils sont des Integers et il faut changer leur type
    */
    if (!(indexes instanceof Array)) indexes = [indexes];
    if (!(quantities instanceof Array)) quantities = [quantities];
  
    /* creer un variable dataCardBike qu'on peut utiliser pour faire des boucles dans le panier */
    var dataCardBike = indexes.map(function(e,i) {
      return {
        bikeIndex: parseInt(e),
        quantity: parseInt(quantities[i]),
      }
    });
  
    /* si le index de "new" n'est pas dans dataCardBike on crée un nouveau object qui contient cette index et on commence avec un value de 1 pour "quantity", sinon on rajoute simplement au bike existent
    */
    if (req.query.new) {
      var findBike = dataCardBike.find(bike => parseInt(req.query.new) === bike.bikeIndex);
      if (findBike) {
        findBike.quantity += 1; 
      } else { 
        dataCardBike.push({
          bikeIndex: parseInt(req.query.new),
          quantity: 1,
        });
      };
    };
  
    /* si le le query "remove" existe on trouve  l'index du velo indique, on trouve cette index en dataCardBike et on le supprime */
    if (req.query.remove) {
      var removeBike = dataCardBike.find(bike => parseInt(req.query.remove) === bike.bikeIndex);
      /* */
      dataCardBike.splice(dataCardBike.indexOf(removeBike), 1);
    };
  
    /* on crée le url qui va nous permettre de suivre les manipulations du commande depuis les deux pages
    */
    url = "";
    for (let bike of dataCardBike) {
      if (!(dataCardBike[0] === bike)) url += "&";
      url += `i=${bike.bikeIndex}&q=${bike.quantity}`
    };
    return [dataCardBike, url];
  }