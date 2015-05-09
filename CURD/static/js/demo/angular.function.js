var functionDemo=angular.module('functionDemo', []);
functionDemo.controller('functionCtrl', ['$scope', function ($scope) {
	var navs=[];
	navs.push({
		name:"angular.bind",
		url:"views/AngularDemo/function/bind.html"
	});
	$scope.navs=navs;
	$scope.currentPage=navs[0];
	$scope.linkClass=function (nav) {
		$scope.currentPage=nav;
	}
}]);