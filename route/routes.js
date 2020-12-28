const { json } = require('body-parser');
const express = require('express') ;
const router = express.Router();

const Item = require('../model/shoppingItem');

// retriving data
router.get('/items', (req, res, next)=> {
Item.find((err, items)=> {
 if(err) {
     res.json(err);
 } else {
     res.json(items);
 }
});
});

// posting data
router.post('/item', (req, res, next)=> {
    let newShoppingItem = new Item ({
        itemName: req.body.itemName,
        itemQuentatiy: req.body.itemQuentatiy,
        itemBought: req.body.itemBought
    });

    newShoppingItem.save((err, item)=> {
  if(err) {
res.json(err);
  } else {
res.json({ msg: 'Item has been added successfully'});
  }
    });
});

// update data
router.put('/item/:id', (req, res, next)=> {
 Item.findOneAndUpdate({_id: req.params.id}, {
     $set:{
        itemName: req.body.itemName,
        itemQuentatiy: req.body.itemQuentatiy,
        itemBought: req.body.itemBought
     }
 },
 function(err, result) {
     if(err) {
  res.json(err);
     } else {
res.json(result);
     }

 }
    
    );

    })

// delete data
router.delete('/item/:id', (req, res, next)=> {
// res.send('delete starting ...');
Item.remove({_id: req.params.id}, function(err, result) {
 if(err) {
     res.json(err);
 } else {
     res.json(result)
 }
})
});







module.exports = router;


