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
      res.json(categoryData);
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
    res.json(categoryID);
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
  //creating a function to update category using id as its value
  Category.update({
      category_name: req.body.category_name
  },
  { 
    where: {
      id: req.params.id
    }
  })
  .then(updatedData => {
    if (!updatedData) {
      res.status(404).json({message:'There is no category with this ID!'});
      return;
    }
    res.json(updatedData);
  })
   .catch((err) => {
    res.json(err);
   });
});

router.delete('/:id', (req, res) => {
  //creating a function to delete a category using its id value
   Category.destroy({
      where: {
        id: req.params.id
      }
   })
    .then(deletedData => {
       if (!deletedData) {
          res.status(404).json({message:'There is no category with this ID!'});
          return;
       }
       res.json(deletedData);
    })
    .catch((err) => {
      res.json(err);
     });
});

module.exports = router;
