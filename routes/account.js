const express = require('express');
const { Router } = express
const Container = require('../Utils/conteiner');
const knex = require('knex');
const knexConfig = require('../knexfile')
const dataBase = knex(knexConfig)
const tableName = 'productos'
const router = Router();


router.get('/',async (req,res)=>{
    try{
        let prods = await dataBase(tableName).select()
        console.log(prods);
        res.render('main',{
            prods:prods
        })
    }catch(err){
        console.log(err);
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        let prods = await dataBase(tableName)
            .select()
            .where('id', id);
        res.render('main',{
            prods:prods
        })
        }catch(err){
        console.log(err);
    }
})

router.put('/:id',async(req,res)=>{
    const body = req.body;
    const id = req.params.id;
    const _newProd = {
        nombre: body.nombre,
        precio: body.precio,
        uru: body.uru
    }
    console.log(_newProd);
    try{
        const _result = await dataBase(tableName)
            .where({id: id})
            .update(_newProd,id)
        res.send({_newProd, id: _result});
        } catch (err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await dataBase(tableName)
        .where({id: id})
        .del()
        res.send('Producto eliminado');
    }catch (err) {
        res.send(err);
    }
})

module.exports = router