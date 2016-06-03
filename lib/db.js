var mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user : "root",
    password:"",
    database:"esgi"
});

connection.connect();

function getAll(callback)
{
    connection.query("SELECT * FROM medias", function(error, rows){
        if (error)
        {
            console.log(error);
            return;
        }
        
        callback(rows);
        
    });

}

function get(id, callback)
{
    connection.query("SELECT * FROM medias where id = " + id, function(error, rows){

        if (!callback) return;
        
        if (error)
        {
            console.log(error);
            return;
        }
        
        callback( rows[0] );
        
    });

}

function insert(title,artist,album, year, filename, callback)
{   console.log("inserting");
    connection.query("INSERT INTO medias (title,artist,album, year, filename) VALUES ('" + title + "', '" + artist + "','" + album + "','" + year + "', '" + filename + "')", function(error){

        
        if (!callback) return;

        if (error)
            callback(error);
        else
            callback();
    });
}

function update(id,title,artist,album, year, callback)
{
     connection.query("UPDATE medias SET year = '" + year + "', album = '" + album + "', artist = '" + artist + "', title = '" + title + "'WHERE id = " + id , function(error){
        if (!callback) return;

        if (error)
            callback(error);
        else
            callback();
    });
}

function remove(id, callback)
{
    connection.query("DELETE FROM medias WHERE id = " + id , function(error){

        if (!callback) return;

        if (error)
            callback(error);
        else
            callback();
    });
}



process.on("SIGINT", function(){
    console.log("Bye Bye");
    connection.end();
    process.exit();
});


module.exports = {  
    getAll : getAll, 
    get : get,
    update: update,
    remove : remove,
    insert : insert
};

//connection.end();