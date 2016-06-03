angular.module("mydirectives", [])
.directive("row", function(){
    return {
        restrict : 'A',
        replace : true,
        templateUrl: "row.html"
    };
});