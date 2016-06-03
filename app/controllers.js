angular.module("mycontrollers", [])
    
.controller("LibrairieController", function($rootScope, $http,$interval){
    function refreshPage(){
        $http.get("/medias").success(function(data){
            $rootScope.songs = data;
            console.log('refresh');
        });
    }
    refreshPage();
    $interval(refreshPage, 3000);
    
    $rootScope.$on("remove", function(event, song){
        
       $rootScope.songs.removeItemByID(song); 
       $http.delete("/medias/" + song.id);
        
    });
})
    
.controller("ContactController", function(){
    
})
    
.controller("SongController", function($scope, $rootScope, $routeParams, $location, $http){
    
    var songid = $routeParams.id;
    var song;
    for (var i = 0; i < $rootScope.songs.length; i++)
    {
        if ($rootScope.songs[i].id == songid)
        {
            song = $rootScope.songs[i];
            break;
        }
    }
    
    if (song)
    {
        $scope.song = angular.copy(song);
    }
    else
        $location.path("/");
   
    
    $scope.onCancel = function()
    {
        $location.path("/"); 
    };
    
    $scope.onSave = function()
    {
        for (var i = 0; i < $rootScope.songs.length; i++)
        {
            if ($rootScope.songs[i].id == songid)
            {
                $rootScope.songs[i] = $scope.song;
                break;
            }
        }
        $http.put("/medias/" + songid, $scope.song ).success( function(){
            $location.path("/");
        })
    }
});