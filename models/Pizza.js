const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
   pizzaName: {
      type: String,
   },
   createdBy: {
      type: String,
   },
   createdAt: {
      type: Date,
   },
   size: {
      type: String,
      default: 'Large',
   },
   toppings: [], //* You could also specify Array in place of the brackets
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;