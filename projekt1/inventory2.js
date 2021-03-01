const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Model = require('./model');


//Get all items
router.get('/', (req, res, next) => {
    Model.find().exec()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            console.log(error);
            const err = new Error(error);
            err.status = error.status || 500;
            
            next(err);
        });
});


//Get specific Item
router.get('/:id', (req, res, next) => {
    const id = req.params.id;    
    Model.findById(id)
        .populate('room')
        .exec()
        .then(document => {
            res.status(200).json(document);
        })
        .catch(error => {
            console.log(error);
            const err = new Error(error);
            err.status = error.status || 500;
            
            next(err);
        });
});


//Posts new items
router.post('/', (req, res, next) =>{

    const model = new Model({
        _id: req.body._id,
        StockHel: req.body.StockHel,
        StockTur: req.body.StockTur,
        StockJyv: req.body.StockJyv
    });

    model.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : "Item successfully created!",
                Item: model
            });
        })
        .catch(error => {
            console.log(error);
            const err = new Error(error);
            err.status = error.status || 500;
            
            next(err);
        });
});

//Deleting specifik items
router.delete('/:id', (req, res, next) => {
    const id = req.params.id

    Model.findById(id)
    .populate('room')
    .exec()
    .then(document => {
            Model.remove({_id: req.params.id}).exec()
            .then(result => {
                res.status(200).json({
                    message: "Item deleted",
                })
            })
            .catch(error => {
                console.log(error);
                const err = new Error(error);
                err.status = error.status || 500;
                
                next(err);
            });
    })
    .catch(error => {
        console.log(error);
        const err = new Error(error);
        err.status = error.status || 500;
        
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id

    
    Model.findById(id)
    .populate('room')
    .exec()
    .then(document => {

        //Old stock
        const hel = document.StockHel;
        const tur = document.StockTur;
        const jyv = document.StockJyv;

        //Out going stock
        const rhel = req.body.StockHel;
        const rtur =  req.body.StockTur;
        const rjyv = req.body.StockJyv;

        //New stock
        const newHel = hel - rhel;
        const newTur = tur - rtur;
        const newJyv = jyv - rjyv;
        print(newHel);
        print(newTur);
        print(newJyv);

        Model.update({_id: req.params.id}, {StockHel: newHel}, {StockTur: newTur}, {StockJyv: newJyv} )
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Inventory updated!"
            });
        })
        .catch(error => {
            console.log(error);
            const err = new Error(error);
            err.status = error.status || 500;
            
            next(err);
        });
    })
    .catch(error => {
        console.log(error);
        const err = new Error(error);
        err.status = error.status || 500;
        
        next(err);
    });
});

module.exports = router;