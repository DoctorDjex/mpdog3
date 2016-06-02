var fs = require('fs');
var db = require('./db');
var path = require('path');

// le ficher correspondant est ouvert
function processFile(file,tags)
{
    var album;
    var title;

    if(!( tags.album == null || tags.album.trim() == '' )){
        album = tags.album.replace(/\0[\s\S]*$/g,'');
    }else{
        album = 'inconnu';
    }
    console.log("album: " + album);

    if(!( tags.title == null || tags.title.trim() == '' )){
        title = tags.title.replace(/\0[\s\S]*$/g,'');
    }else{
        title = 'inconnu';
    }
    console.log("title :" + title);

    createFolder(file,album,title);
    //console.log(tags);

    /*fs.readFile(file, 'utf8', function(error, content){
        if (error)
        {
            if (error.errno == -2)
                console.log("Le nom du fichier est incorrect");
            else
                console.log(error);
            return;
        }

        console.log(content);

        //var lines = content.split("\n");



        var parts;
        var album;
        var artist;

       lines.forEach(function(line){

            parts = line.split("-");
            album = parts[0].trim();
            artist = parts[1].trim();
            createFolder(album, artist);
        });

    });*/
}

function createFolder(file,album,title)
{
    fs.mkdir("albums/" + album, function(error){
       //if (error)
       //{
       //   console.log(error)
       //};

      fs.rename(file,"albums/" + album + '/' + path.basename(file) );
    // extraire le tagID3
      
      //db.insert(album, artist);

     db.insert(album,title);
        
      //db.insert("testalbum","testartist");

    });
}


module.exports = processFile;




