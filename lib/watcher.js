var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');
var processFile = require("./processFile");

var id3 = require('id3js');

function start()
{
    // Initialize watcher. 
    var watcher = chokidar.watch('incoming_songs', {
      ignored: /[\/\\]\./,
      persistent: true
    });

    watcher.on('add', onNewFile);
}

function onNewFile(file)
{
    /*if(path.extname(file) == ".txt")
    {
        console.log("traitement du fichier...");
        processFile(file);
    }
    else
    {
        fs.rename(file, "garbage/" + path.basename(file));
        console.log("a envoyer dans garbage");
    }*/

    if(path.extname(file) == ".mp3" || path.extname(file) == ".MP3")
    {
        console.log("traitement du fichier...");
        id3({ file: 'incoming_songs/' + path.basename(file), type: id3.OPEN_LOCAL }, function(err, tags) {
            if(err)
                console.log(err);
            processFile(file,tags);
            
        });
    }
    else
    {
        fs.rename(file, "garbage/" + path.basename(file));
        console.log("a envoyer dans garbage");
    }

}


module.exports = {start : start};