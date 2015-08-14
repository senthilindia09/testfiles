sessionStorage.setItem('isLogin', "false");

var techColorCont = angular.module('tColorControllers', []);
techColorCont.controller('mainController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) { 
debugger;
    $scope.login = {};
    $rootScope.gustBook = {};
    $rootScope.stateInfoList = [];
    $rootScope.isNavVisible = false;
    $scope.$on('$routeChangeStart', function(event, current) {
        $scope.isChangeClass = "";
    });
    $scope.$on('$routeChangeSuccess', function(event, current) {
        $scope.isChangeClass = "active";
    });
    if(sessionStorage.getItem('isLogin') == "false") {
         window.location.href = "#/loginPage";
    }
    $scope.logout = function() {
        sessionStorage.setItem('userName', " ");
        sessionStorage.setItem('isLogin', "false");
        $rootScope.isNavVisible = false;
        window.location.href = "#/loginPage";
    }    
    $scope.gustBook = function() {
        window.location.href = "#/gustBook";
    }
}]);
 
techColorCont.controller('loginController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) { 
 
    $scope.login = {};
    $scope.submitForm = function() {
        
        $http.get('json/login.json').
        success(function(data, status, headers, config) {
            angular.forEach(data, function(index) {
                if($scope.login.userName == index.username && $scope.login.Password == index.password) {
                    sessionStorage.setItem('userName', $scope.login.userName);
                    sessionStorage.setItem('isLogin', "true");
                    
                }
            });

            if(sessionStorage.getItem('isLogin') == "true") {
                $rootScope.isNavVisible = true;
                window.location.href = "#/success";
            }
            else {
                window.location.href = "#/error";
            }
        }).
        error(function(data, status, headers, config) {
          // log error
        });
    }

  }]);
  
  
  techColorCont.controller('successController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $http.get('json/state.json').
        success(function(data, status, headers, config) {
            $rootScope.stateInfoList = data;
            //alert(JSON.pare(data));
        }).
        error(function(data, status, headers, config) {
          // log error
        });

  }]);
techColorCont.controller('stateInfoController', ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
        $scope.stateNameInfo = $routeParams.stateName;
        angular.forEach($rootScope.stateInfoList, function(index) {
            if($scope.stateNameInfo == index.name)
                $scope.stateDetailInfo = index;
        });
        
  }]);
techColorCont.controller('gustBookController', ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
            
        $scope.saveMsg = function() {            
          $rootScope.gustBook[$scope.gBook.mobile] = $scope.gBook.msg;
        }
        
  }]);
 