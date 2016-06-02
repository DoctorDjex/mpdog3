var fs = require('fs');
var db = require('./db');
var path = require('path');

// le ficher correspondant est ouvert
function processFile(file,tags)
{
    var title;
    var artist;
    var album;
    var year;


    if(!( tags.title == null || tags.title.trim() == '' )){
        title = tags.title.replace(/\0[\s\S]*$/g,'');
    }else{
        title = 'inconnu';
    }
    console.log("title :" + title);

    if(!( tags.artist == null || tags.artist.trim() == '' )){
        artist = tags.artist.replace(/\0[\s\S]*$/g,'');
    }else{
        artist = 'inconnu';
    }
    //console.log("artist :" + artist);

    if(!( tags.album == null || tags.album.trim() == '' )){
        album = tags.album.replace(/\0[\s\S]*$/g,'');
    }else{
        album = 'inconnu';
    }
    //console.log("album: " + album);

    if(!( tags.year == null || tags.year.trim() == '' )){
        year = tags.year.replace(/\0[\s\S]*$/g,'');
    }else{
        year = 'inconnu';
    }
    //console.log("year :" + year);

    createFolder(file,title,artist,album, year);
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

function createFolder(file,title,artist,album, year)
{
    fs.mkdir("albums/" + album, function(error){
       //if (error)
       //{
       //   console.log(error)
       //};

      fs.rename(file,"albums/" + album + '/' + path.basename(file) );
    // extraire le tagID3
      
      //db.insert(album, artist);

     db.insert(title,artist,album, year, path.basename(file));
        
      //db.insert("testalbum","testartist");

    });
}


module.exports = processFile;




