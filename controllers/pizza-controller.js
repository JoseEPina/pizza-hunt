const { Pizza } = require('../models');

const pizzaController = {
   // the function goes here

   //GET all the Pizzas
   getAllPizza(req, res) {
      Pizza.find({})
         .populate({
            path: 'comments',
            select: '-__v', //The minus sign - in front of the field indicates that we
         }) // don't want it to be returned. If we didn't have it, it would mean that
         // it would return only the __v field.
         .select('-__v') //
         .sort({ _id: -1 })
         .then((dbPizzaData) => res.json(dbPizzaData))
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   // GET one pizza by ID
   getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
         .populate({
            path: 'comments',
            select: '-__v',
         })
         .select('-__v')
         .then((dbPizzaData) => {
            // If no pizza is found, send 404
            if (!dbPizzaData) {
               res.status(404).json({ message: 'No pizza found with this id!' });
               return;
            }
            res.json(dbPizzaData);
         })
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   // POST to add a pizza to the database
   createPizza({ body }, res) {
      Pizza.create(body)
         .then((dbPizzaData) => res.json(dbPizzaData))
         .catch((err) => res.status(400).json(err));
   },

   // PUT to update pizza by ID
   updatePizza({ params, body }, res) {
      Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
         .then((dbPizzaData) => {
            if (!dbPizzaData) {
               res.status(404).json({ message: 'No pizza found with this id!' });
               return;
            }
            res.json(dbPizzaData);
         })
         .catch((err) => res.status(400).json(err));
   },

   // DELETE pizza from database
   deletePizza({ params }, res) {
      Pizza.findOneAndDelete({ _id: params.id })
         .then((dbPizzaData) => {
            if (!dbPizzaData) {
               res.status(404).json({ message: 'No pizza found with this id!' });
               return;
            }
            res.json(dbPizzaData);
         })
         .catch((err) => res.status(400).json(err));
   },
};

module.exports = pizzaController;
