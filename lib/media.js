var express = require('express');
var db = require("./db");

var fs = require("fs");
var path = require("path");
var router = express.Router();

// retourne tous les élements de la table
router.get("/", function(req, res){

    db.getAll(function(data){

		res.json( data );

    });


});

// retourne l'élement de la table avec l'id fourni
router.get("/:id", function(req, res){
	var id = req.params.id;

	db.get(id, function(data){
		res.json( data );
    });

});

// ajout un nouvel élément
router.post("/", function(req, res){
    
    db.insert(req.body.title,req.body.album, req.body.artist, req.body.year, function(data){

		res.json(data);

    } );


});

// modifie l'élement correspondant à l'id
router.put("/:id", function(req, res){
    db.update(req.params.id,req.body.title,req.body.album, req.body.artist, req.body.year, function(data){

		res.json(data);

    } );
});

// supprime l'élement correspondant à l'id
router.delete("/:id", function(req, res){
	var id = req.params.id;
	db.get(id, function(data){
		res.json( data );
		console.log( 'albums/' + data.album + '/' + data.filename);
		fs.unlink( 'albums/' + data.album + '/' + data.filename ,function(){
			db.remove(req.params.id, function(data){
				res.json(data);
			});
		});
	});
});

module.exports = router;











