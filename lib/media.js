var express = require('express');
var db = require("./db");

var fs = require("fs");
var path = require("path");
var router = express.Router();

var processFile = require("./processFile");

router.get("/", function(req, res){
    db.getAll(function(data){
		res.json( data );
    });
});

router.get("/:id", function(req, res){
	var id = req.params.id;
	db.get(id, function(data){
		res.json( data );
    });
});

router.post("/", function(req, res){
    db.insert(req.body.title,req.body.album, req.body.artist, req.body.year, function(data){
		res.json(data);
    });
});

router.put("/:id", function(req, res){
	var id = req.params.id;
	var reqMetadata = {
		album: 'test'
	};

	db.get(id, function(data){
		processFile.moveFolder(req,data, function(){
			db.update(req.params.id,req.body.title,req.body.album, req.body.artist, req.body.year, function(data){
				res.json(data);
			});
		});
	});
});

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