const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  //finding all categories and its associated products
    Category.findAll({
       attributes: ['id', 'category_name'],
       include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }]
    })
    .then((categoryData) => {
      res.join(categoryData);
    })
    .catch((err) => {
      res.json(err);
   });
});

router.get('/:id', (req, res) => {
  //finding a category by its id value and its associated products
   Category.findByPk(req.params.id, {
       attributes: ['id', 'category_name'],
       include: [{
        model: Products,
        attrributes: ['id', 'product_name', 'stock', 'price']
    }]
   })
   .then((categoryID) => {
    res.join(categoryID);
   })
   .catch((err) => {
      res.json(err);
   });
});

router.post('/', (req, res) => {
  //creating new category and a function to catch error
    Category.create ({
       newCategory: req.body.newCategory
    })
    .then(newData => res.json(newData))
    .catch((err) => {
      res.json(err);
   });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
