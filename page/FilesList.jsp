<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="../../js/jquery-3.2.0.min.js"></script>
<script type="text/javascript" src="../../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../js/gen.js"></script>
<script type="text/javascript" src="../../js/angular.min.js"></script>

<script type="text/javascript" src="../../js/jquery-ui.min.js"></script>
<link href="../../css/bootstrap.min.css" rel="stylesheet">
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
  
    .Block {
        display: block;
    }
  
    .InlineBlock {
        display: inline-block;
    }
  
    .FilesList {
        height:800px;
        width:700px;
        overflow: scroll;
    }
</style>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl" >
    <input type="text" id="path" value="D:\" />
    <input type="text" id="modifiedStartDate" value="" />
    <input type="text" id="modifiedEndDate" value="" />
    <input type="button" ng-click="getFilesList($event)" value="get files list" />
    <input type="button" ng-click="getZipFile($event)" value="compress selected files" />
    <textarea id="result">
    </textarea>
    <div class="Block">
      <div class="FilesList InlineBlock">
        <table>
            <tr ng-repeat="filePath in filePaths">
                <td>
                  <input type="checkbox" id="path" name="path"  value="{{filePath.path}}" ng-checked="selectedFilePaths.indexOf(filePath.path) !== -1" ng-click="pickFile($event)">
                  <label ng-if="filePath.isParentDir == true">
                      <a href="" path="{{filePath.path}}" ng-click="clickDirPath($event)">...</a>
                  </label>
                  <label ng-if="filePath.isParentDir == false && filePath.isDir == true">
                      <a href="" path="{{filePath.path}}" ng-click="clickDirPath($event)">{{filePath.path}}</a>
                  </label>
                  <label ng-if="filePath.isDir == false">
                      <label>{{filePath.path}}</label>
                  </label>
                </td>
            </tr>
        </table>
      </div>
    <div class="FilesList InlineBlock">
    <table>
        <tr ng-repeat="filePath in selectedFilePaths">
            <td>{{filePath}}</td>
        </tr>
    </table>
    </div>
    </div>
</div>
<script type="text/javascript">
var app = angular.module('myApp', []);

$('#modifiedStartDate').datepicker({ dateFormat: 'yy/mm/dd' });
$('#modifiedEndDate').datepicker({ dateFormat: 'yy/mm/dd' });

var myCtrl = app.controller('myCtrl', function($scope, $http, $compile) {
    
    $scope.filePaths = [];
    
    $scope.selectedFilePaths = [];
    
    $scope.clickDirPath = function($event) {
      angular.element('#path').val($event.target.getAttribute("path"));
      $scope.getFilesList($event);
    }
    
    
    $scope.getFilesList = function($event) {
        var sendUrl = 'http://localhost:8091/main/api/fileslist';
        var path = angular.element('#path').val();
        var modifiedStartDate = angular.element('#modifiedStartDate').val();
        var modifiedEndDate = angular.element('#modifiedEndDate').val();
        
        result = angular.element("#result");
        
        //var httpResult =
        $http({
            method : "POST",
            url : sendUrl,
            params : {path, modifiedStartDate, modifiedEndDate},
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
            //divStep.append(result);
            //return [];
        });
    }
    
    $scope.getZipFile = function($event) {
      var sendUrl = 'http://localhost:8091/main/api/compressfiles';
      var selectedFilePaths = $scope.selectedFilePaths;
      
      result = angular.element("#result");
      
      //var httpResult =
      $http({
          method : "POST",
          url : sendUrl,
          params : {selectedFilePaths},
      }).then(function mySuccess(response) {
          var resultContent = JSON.stringify(response.data.data)
          var resultBoolean = false;
          if (response.data.result === true) {
            resultBoolean = true;
            
            if (response.data.data.length != 0) {
              $scope.zipFilePath = response.data.data;
            }
          } else {
            $scope.zipFilePath = null;
          }
          
          result.html("result : " + resultBoolean + ", " + resultContent);
          
          //return response.data;
      }, function myError(response) {
          console.log(response.statusText);
          result.html(JSON.stringify(response.data));
          //divStep.append(result);
          //return [];
      });
    }
    
    $scope.pickFile = function($event) {
      if ($event.target.checked == true) {
        $scope.selectedFilePaths.push($event.target.value);
        
      } else {
        var $targetIndex = $scope.selectedFilePaths.indexOf($event.target.value);
        if ($targetIndex <= -1) {
          alert("can't find this element to unselected!");
        } else {
          $scope.selectedFilePaths.splice($targetIndex, 1);
        }
      }
    }
    
    $scope.compile = function(ngElement) {
        $compile(ngElement);
    }
});
                 
</script>
</body>
</html>