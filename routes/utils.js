const { dataBike } = require("./infos");

const update_shipping = (tabl) => {
  for (obj of tabl) {
    var total = obj.quantity * dataBike[obj.bikeIndex].prix
    if (total > 4000) {
      obj.shipping = {
        standard: 0,
        express: 100,
        relay: 50+20*obj.quantity,
      };
    } else if (total > 2000) {
      obj.shipping = {
        standard: 15*obj.quantity,
        express: 15*obj.quantity+100,
        relay: 50+20*obj.quantity,
      };
    } else {
      obj.shipping = {
        standard: 30*obj.quantity,
        express: 30*obj.quantity+100,
        relay: 50+20*obj.quantity
      };
    }
  }
  return
}

module.exports = { update_shipping };