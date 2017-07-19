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
/*
    div.step {
        border-style: solid;
        border-width: 1px;
    }
    
    div:nth-child(2n) {
        background: palegoldenrod;
    }
    */
    
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
        height:850px;
        width:900px;
        overflow: scroll;
    }
    
    .css_table {
        display:table;
    }
    .css_tr {
        display: table-row;
    }
    .css_td_ckbox {
        display: table-cell;
        border: 3px;
        border-style: ridge;
        background-color:lightcyan;
        width:5px;
    }
    
    .css_td_name {
        display: table-cell;
        border: 3px;
        border-style: ridge;
        background-color:lightcyan;
        width:30%;
    }
    
    .css_td_path {
        display: table-cell;
        border: 3px;
        border-style: ridge;
        background-color:lightcyan;
        width:70%;
    }
    
    .ui-datepicker {
         background-color: yellow;
         border: 1px solid #555;
         color: black;
    }
    
    .dir-picked {
        border: 3px inset #555;
        padding: 3px;
        background-color:yellow;
    }
    
    .dir-unpicked {
        border: 3px inset #555;
        padding: 3px;
    }
</style>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl" >
    <input type="text" id="path" value="C:\tccwork" />
    <div>start date : <input type="text" id="modifiedStartDate" value="" /></div>
    <div>end date : <input type="text" id="modifiedEndDate" value="" /></div>
    <div>file name : <input type="text" id="fileName" value="" /></div>
    <input type="button" ng-click="getFilesList($event)" value="get files list" />
    <input type="button" ng-click="getZipFile($event)" value="compress selected files" />
    <a href="{{zipFilePath}}">{{zipFilePath}}</a>
    <textarea id="result">
    </textarea>
    <div class="Block">
      <div class="FilesList InlineBlock">
        <div class="css_table">
            <div ng-repeat="filePath in filePaths" class="css_tr">
                <div class="css_td">
                  <input type="checkbox" id="path" name="path"  value="{{filePath.path}}" ng-checked="isFileSelected(filePath.path)" ng-click="pickFile($event, filePath.isDir)" >
                </div>
                <div ng-if="filePath.isParentDir == true" class="css_td_ckbox">
                    <a href="" path="{{filePath.path}}" ng-click="clickDirPath($event)">...</a>
                </div>
                <div ng-if="filePath.isParentDir == false && filePath.isDir == true" class="css_td_name">
                    <a href="" path="{{filePath.path}}" ng-click="clickDirPath($event)">{{filePath.name}}</a>
                </div>
                <div ng-if="filePath.isDir == false" class="css_td_name">
                  {{filePath.name}}
                </div>
                <div class="css_td_path">
                  {{filePath.path}}
                </div>
            </div>
        </div>
      </div>
    <div class="FilesList InlineBlock">
       <table>
          <tr>
            <td ng-repeat="dir in commonFileDirs track by $index" class="dir-picked" ng-click="pickCommonDir($event)">{{dir}}</td>
          </tr>
       </table>
      <table>
          <tr ng-repeat="filePath in selectedFiles.paths">
              <td>
                <input type="checkbox" id="path" name="path"  value="{{filePath}}" ng-click="pickFile($event, selectedFiles.isDir[$index])" checked>
              </td>
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
    
    $scope.selectedFiles = {
      paths : [],
      isDir : []
    };
    
    $scope.commonFileDirs = [];
    
    $scope.zipFilePath = "";
    
    $scope.isFileSelected = function(filePath) {
      return $scope.selectedFiles.paths.indexOf(filePath) > -1;
    }
    
    $scope.clickDirPath = function($event) {
      angular.element('#path').val($event.target.getAttribute("path"));
      $scope.getFilesList($event);
    }

    $scope.getFilesList = function($event) {
        var sendUrl = 'http://localhost:8091/main/api/fileslist';
        var path = angular.element('#path').val();
        var fileName = angular.element('#fileName').val();
        var modifiedStartDate = angular.element('#modifiedStartDate').val();
        var modifiedEndDate = angular.element('#modifiedEndDate').val();
        
        result = angular.element("#result");
        
        //var httpResult =
        $http({
            method : "POST",
            url : sendUrl,
            params : {path, fileName, modifiedStartDate, modifiedEndDate}
        }).then(function mySuccess(response) {
            var resultContent = JSON.stringify(response.data.data)
            var resultBoolean = false;
            if (response.data.result === true) {
              resultBoolean = true;
              
              if (response.data.data.length != 0) {
                $scope.filePaths = response.data.data[0];
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
      var selectedFilePaths = $scope.selectedFiles.paths;
      
      var selectedCommonDirs = $('.dir-picked');
      var commonDirPath = "";
      for(var i = 0; i < selectedCommonDirs.length; i++) {
        if (i > 0) {
          commonDirPath += '\\';
        }
        commonDirPath += selectedCommonDirs[i].innerText;
      }
      
      result = angular.element("#result");
      
      //var httpResult =
      $http({
          method : "POST",
          url : sendUrl,
          params : { selectedFilePaths, commonDirPath}
      }).then(function mySuccess(response) {
          var resultContent = JSON.stringify(response.data.data)
          var resultBoolean = false;
          if (response.data.result === true) {
            resultBoolean = true;
            
            if (response.data.data.length != 0) {
              $scope.zipFilePath = response.data.data[0];
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
    
    $scope.pickFile = function($event, $isDir) {
      if ($event.target.checked == true) {
        $scope.selectedFiles.paths.push($event.target.value);
        $scope.selectedFiles.isDir.push($isDir);
        
        var fileDirs = $event.target.value.split('\\');
        if ($isDir == false) {
          fileDirs.splice(fileDirs.length - 1, 1);
        }
        
        var i;
        if ($scope.commonFileDirs.length <= 0) {
          for(dir of fileDirs) {
            $scope.commonFileDirs.push(dir);
          }
          
          return;
        } else {
          for(i = 0; i < $scope.commonFileDirs.length; i++) {
            if ($scope.commonFileDirs[i] != fileDirs[i]) {
              if (i == 0) {
                alert("There is no any common dir !");
              }
              $scope.commonFileDirs.splice(i, $scope.commonFileDirs.length - i +1)
              break;
            }
          }
        }
      } else {
        var $targetIndex = $scope.selectedFiles.paths.indexOf($event.target.value);
        if ($targetIndex <= -1) {
          alert("can't find this element to unselected! element target value is " + $event.target.value);
        } else {
          $scope.selectedFiles.paths.splice($targetIndex, 1);
          $scope.selectedFiles.isDir.splice($targetIndex, 1);
          
          if ($scope.selectedFiles.paths.length <= 0) {
            $scope.commonFileDirs = [];
          } else {
            $scope.commonFileDirs = $scope.selectedFiles.paths[0].split('\\');
            if ($isDir == false) {
              $scope.commonFileDirs.splice($scope.commonFileDirs.length - 1, 1);
            }
            
            if ($scope.selectedFiles.paths.length > 1) {
              var fileDirs;
              for(filePath of $scope.selectedFiles.paths) {
                fileDirs = filePath.split('\\');
                for(i = 0; i < $scope.commonFileDirs.length; i++) {
                  if ($scope.commonFileDirs[i] != fileDirs[i]) {
                    if (i == 0) {
                      alert("There is no any common dir !");
                    }
                    $scope.commonFileDirs.splice(i, $scope.commonFileDirs.length - i +1)
                  }
                }
              }
            }
          }
        }
      }
    }
    
    $scope.pickCommonDir = function($event) {
      var jqElement;
      var jqTarget = $($event.target);
      
      for(element of jqTarget.prevAll()) {
        jqElement = $(element);
        jqElement.removeClass("dir-unpicked").addClass("dir-picked");
      }
      
      for(element of jqTarget.nextAll()) {
        jqElement = $(element);
        jqElement.removeClass("dir-picked").addClass("dir-unpicked");
      }
      
      jqTarget.removeClass("dir-unpicked").addClass("dir-picked");
    }
    
    $scope.unpickFile = function($event) {
      /*
      if ($event.checked == false) {
        $scope.selectedFilePaths.remove[$scope.selectedFilePaths.indexOf(filePath.path)]
      } else
        */
      console.log("");
    }
    
    $scope.compile = function(ngElement) {
        $compile(ngElement);
    }
});
                 
</script>
</body>
</html>