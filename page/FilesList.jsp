<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="../../js/jquery-3.2.0.min.js"></script>
<script type="text/javascript" src="../../js/angular.min.js"></script>
<script type="text/javascript" src="../../js/gen.js"></script>
<style>
    div.step {
        border-style: solid;
        border-width: 1px;
    }
    
    div:nth-child(2n) {
        background: palegoldenrod;
    }
    
    input.url {
        width:95%;
    }
	
	span.block {
		display:block;
	}
</style>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
    <div id="root">
    </div>
    <input type="text" id="path" value="D:\" />
    <input type="button" ng-click="getFilesList($event)" value="get files list" />
    <textarea id="result">
    </textarea>
    <table>
        <tr ng-repeat="filePath in filePaths">
            <td><input type="checkbox" id="path" name="path"  value="filePath.path">{{filePath.path}}</td>
        </tr>
    </table>
    {{selectedFilePaths}}
</div>
<script type="text/javascript">
var app = angular.module('myApp', []);

var myCtrl = app.controller('myCtrl', function($scope, $http, $compile) {
    
    $scope.filePaths = [];
    
    $scope.selectedFilePaths = null;
    
    $scope.getFilesList = function($event) {
        var sendUrl = 'http://localhost:8091/main/api/fileslist';
        var path = angular.element('#path').val();
        
        result = angular.element("#result");
        
        //var httpResult =
        $http({
            method : "POST",
            url : sendUrl,
            params : {path},
        }).then(function mySuccess(response) {
            var resultContent = JSON.stringify(response.data.data)
            var resultBoolean = false;
            if (response.data.result === true) {
              resultBoolean = true;
              
              if (response.data.data.length != 0) {
                $scope.filePaths = response.data.data;
              }
            } else {
              $scope.filePaths = null;
            }
            
            result.html("result : " + resultBoolean + ", " + resultContent);
            
            //return response.data;
        }, function myError(response) {
            console.log(response.statusText);
            result.html(JSON.stringify(response.data));
            divStep.append(result);
            //return [];
        });
    }
    
    $scope.compile = function(ngElement) {
        $compile(ngElement);
    }
});
                 
</script>
</body>
</html>