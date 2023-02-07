const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//finding all tags and associated product data
router.get('/', (req, res) => {
  Tag.findAll({
     attributes: ['id', 'tag_name'],
     include: [{
       model: Product,
       attributes: ['id', 'product_name', 'price', 'stock'],
}]
  })
  .then((tagData) => {
    res.json(tagData);
  })
  .catch((err) => {
    res.json(err);
  })
});

//finding one tag by id and associated product data
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    attributes: ['id', 'tag_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'stock', 'price']
    }]
  })
  .then((tagID) => {
    res.json(tagID);
  })
  .catch((err) => {
     res.json(err);
  })
});

//creating a new tag
router.post('/', (req, res) => {
  Tag.create({
    newTag: req.body.newTag
  })
  .then(Data => res.json(Data))
  .catch((err) => {
    res.json(err);
  })
});

//updating a tag's name by its id value
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(updateTag => {
    if (!updateTag) {
      res.status(404).json({message:'There is not tag with this ID!'});
      return;
    }
    res.json(updatedTag);
  })
  .catch((err) => {
    res.json(err);
   });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
