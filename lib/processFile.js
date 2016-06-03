var fs = require('fs');
var db = require('./db');
var path = require('path');

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
    
    if(!( tags.album == null || tags.album.trim() == '' )){
        album = tags.album.replace(/\0[\s\S]*$/g,'');
        album = album.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
    }else{
        album = 'inconnu';
    }

    if(!( tags.year == null || tags.year.trim() == '' )){
        year = tags.year.replace(/\0[\s\S]*$/g,'');
    }else{
        year = 'inconnu';
    }
    
    createFolder(file,title,artist,album, year);
}

function createFolder(file,title,artist,album, year)
{
    fs.mkdir("albums/" + album, function(error){
        fs.rename(file,"albums/" + album + '/' + path.basename(file).replace("'","&quot;") );
        db.insert(title,artist,album, year, path.basename(file));
    });
}

function moveFolder(req,data, callback)
{
    fs.mkdir("albums/" + req.body.album, function(error){
        fs.rename("albums/" + data.album + '/' + data.filename,"albums/" + req.body.album + '/' + req.body.filename, callback() );
    });
}

module.exports = {
    processFile : processFile,
    moveFolder : moveFolder
};