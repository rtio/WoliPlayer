angular.module('ysons.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
                $http.get(
                    file,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]);

angular.module('ysons',['ysons.service']);

var AppController = function($scope,DataSource) {

    var SOURCE_FILE = "audio.xml";
    
    xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.audios.audio;
    };
    
    setData = function(data) {
        $scope.dataSet = data;
    };
        
    DataSource.get(SOURCE_FILE,setData,xmlTransform);

    $scope.playSound = function(id){
        var audio = document.getElementById(id);
        audio.play();
    }
    $scope.stopSound = function(id){
        var audio = document.getElementById(id);
        audio.pause();
        audio.currentTime = 0;
    }
};