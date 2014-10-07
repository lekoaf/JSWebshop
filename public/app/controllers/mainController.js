(function(){
	angular.module('jsWebshop').controller('mainController', ['$scope', 
		function ($scope){
		$scope.$on('categories', function (e, categories){
			$scope.categories = categories;
		});

		$scope.switchCategory = function(category){
			$scope.$broadcast('currentCategory', category);
		};
	}]);
})();