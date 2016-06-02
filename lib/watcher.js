var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');
var processFile = require("./processFile");

var id3 = require('id3js');

var files = [];
var extracting = false;

function start()
{
    // Initialize watcher. 
    var watcher = chokidar.watch('incoming_songs', {
      ignored: /[\/\\]\./,
      persistent: true
    });

    watcher.on('add', addFileToExtract);
}


function addFileToExtract(pathfiles)
{
    files.push(pathfiles);
    console.log(files);
    extract();
}

function extract(){
    if (extracting || files.length == 0)
        return;

    extracting = true;

    pathfiles = files.pop();

    //console.log("Extracting : " + path);
    if(path.extname(pathfiles) == ".mp3" || path.extname(pathfiles) == ".MP3"){
        id3({ file: pathfiles, type: id3.OPEN_LOCAL }, function(err, tags){

            if (err){
                console.log("Error: " + err);
                return;
            }

            //console.log(tags.album);
            console.log("Extracted " + path);
            processFile(pathfiles,tags);
            extracting = false;
            setTimeout(extract, 100);
        });
    }else{
        fs.rename(pathfiles, "garbage/" + path.basename(pathfiles));
        console.log("a envoyer dans garbage");
    }
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
        extracting = true;
        path = files.pop();
        console.log("traitement du fichier...");
        id3({ file: 'incoming_songs/' + path.basename(file), type: id3.OPEN_LOCAL }, function(err, tags) {
            if(err){
                console.log(err);
                console.log(file);
                return;
                /*var picStream = fs.createReadStream('incoming_songs/' + path.basename(file)).pipe(fs.createWriteStream('incoming_songs/copy-' + path.basename(file)));
                picStream.on('close',function(){
                    fs.unlink('incoming_songs/' + path.basename(file));
                });*/

            }else{
                processFile(file,tags);
                extracting = false;
            }

        });
    }
    else
    {
        fs.rename(file, "garbage/" + path.basename(file));
        console.log("a envoyer dans garbage");
    }

}


module.exports = {start : start};