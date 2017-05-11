<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="../js/jquery-3.2.0.min.js"></script>
<script type="text/javascript" src="../js/angular.min.js"></script>
<script type="text/javascript" src="../js/gen.js"></script>
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
test
<div ng-app="myApp" ng-controller="myCtrl">
    <div id="root">
    </div>
</div>
<script type="text/javascript">
var app = angular.module('myApp', []);

var myCtrl = app.controller('myCtrl', function($scope, $http, $compile) {
    /*
    $http.get("welcome.htm")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
    */
    
    $scope.ajaxSend = function($event) {
        var divStep = angular.element($event.currentTarget).parent();
        var urlElement = divStep.find('input[' + gen.type.isUrl + ']').get();
        var sendUrl = urlElement[0].value;
        var paramsElement = divStep.find('[' + gen.type.isParam + ']').get();
        var sendParams = {};
        var paramElement;
        for(var index in paramsElement) {
            paramElement = paramsElement[index];
            sendParams[paramElement.id] = paramElement.value;
        }
        
        var result;
        var oldResult = divStep.find('textarea[id=result]').get();
        if (oldResult.length > 0) oldResult[0].remove();
        
        result = angular.element("<textarea></textarea>");
        result.attr("id", "result");
        
        $http({
            method : "POST",
            url : sendUrl,
            params : sendParams,
        }).then(function mySucces(response) {
            result.html(JSON.stringify(response.data));
            divStep.append(result);
        }, function myError(response) {
            console.log(response.statusText);
            result.html(JSON.stringify(response.data));
            divStep.append(result);
        });
    }
    
    $scope.compile = function(ngElement) {
        $compile(ngElement);
    }
});

var url = "www.google.com";
var stepCount = 0;

var root = angular.element('#root');
stepCount++;
/*
var genElement = new gen(root, stepCount, 'step')
                 .genText('test input : ', 'test' + stepCount, '456', gen.type.isParam, null)
                 .genSelect('pick one : ', 'select' + stepCount, ["1", "2", "3"], ["4", "5", "6"], true);

stepCount++;
var genElement = new gen(root, stepCount, 'step')
                 .genSelect('pick one : ', 'select' + stepCount, ["7", "8", "9"], ["10", "11", "12"], true)
                 .genText('test input : ', 'test' + stepCount, '456', gen.type.isParam, null).genPostBtn(null, 'btn' + stepCount, "Send", "ajaxSend($event)");
*/
stepCount++;
var genElement;
genElement = new gen(root, stepCount, 'step')
                 .genText('func : ', 'func', '', gen.type.isParam, null)
                 .genText('path : ', 'path', '', gen.type.isParam, null)
                 .genCheckBox('isModified : ', 'isModified', '', gen.type.isParam, null)
                 .genText('url : ', 'url' + stepCount, 'http://localhost:8091/page', gen.type.isUrl, 'url')
                 .genPostBtn(null, 'btn' + stepCount, "Send", "ajaxSend($event)");

</script>
</body>
</html>