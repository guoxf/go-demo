var myModel = angular.module('myModel', ['elvinTable.table','elvinTable.localization']);
myModel.value('curd', 'hello');
myModel.provider('providerTest', [

	function() {
		this.$get = [

			function() {
				return {
					message: "Hello Provider!"
				};
			}
		];
	}
]);
myModel.factory('factoryTest', [

	function() {

		return {
			message: "Hello Factory!"
		};
	}
]);
myModel.service('serviceTest', [

	function() {
		return {
			message: "Hello Service!!"
		};
	}
]);
myModel.constant('constantTest', {
	message: "Hello Constat"
});
myModel.directive('ngCurd', ['$http', 'providerTest', 'factoryTest', 'serviceTest', 'constantTest',
	function($http, providerTest, factoryTest, serviceTest, constantTest) {

		var template = "<a>" + providerTest.message + "</a>";
		template += "<a>" + factoryTest.message + "</a>";
		template += "<a>" + serviceTest.message + "</a>";
		template += "<a>" + constantTest.message + "</a>";
		return {
			restrict: 'EA',
			template: template,
			scope: {
				config: '='
			},
			link: function(scope, element, attrs) {
				scope.$watch('config', function(config) {
					debugger
				});
				/*$http.get("/CURD/getConfig", {
					params: {
						name: 'curd'
					}
				}).success(function(data) {
					scope.SysCurd = data.SysCurd;
					scope.SysCurdField = data.SysCurdField;
				});*/
			}
		};
	}
]);
myModel.controller('PageConfigCtrl', ['$scope', '$http', 'curd',
	function($scope, $http, curd) {
		$scope.tableConfig = {test:'11',name:'CurdField',baseUrl:'/CURD/'};
	}
]);