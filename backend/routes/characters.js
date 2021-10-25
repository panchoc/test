var express = require('express');
var router = express.Router();
const mssql = require('mssql');
const cfg = require('../config');

router.get('/', async (req, res) => {
    let pool = await mssql.connect(cfg.sql);
    let query = await pool.request()
        .query(`SELECT * FROM [got].[dbo].[Character]`);
    pool.close();
    res.status(200).json(query.recordset);
})

router.get('/:char_id', async (req, res) => {
    let pool = await mssql.connect(cfg.sql);
    let query = await pool.request()
        .query(`SELECT * FROM [got].[dbo].[Character] where id = ${req.params.char_id}`);
    pool.close();
    res.status(200).json(query.recordset)
})

router.get('/books/:char_id', async (req, res) => {
    let pool = await mssql.connect(cfg.sql);
    let query = await pool.request()
        .query(`SELECT book FROM [got].[dbo].[Char_Book_View] where char_id = ${req.params.char_id}`);
    pool.close();
    let books = query.recordset.map(elem => elem.book);
    res.status(200).json(books);
})

router.get('/titles/:char_id', async (req, res) => {
    let pool = await mssql.connect(cfg.sql);
    let query = await pool.request()
        .query(`SELECT title FROM [got].[dbo].[Char_title_View] where char_id = ${req.params.char_id}`);
    pool.close();
    let titles = query.recordset.map(elem => elem.title);
    res.status(200).json(titles);
})



module.exports = router;