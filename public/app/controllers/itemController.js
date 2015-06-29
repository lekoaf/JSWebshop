(function (){
	angular.module('jsWebshop').controller('itemController', ['$scope', '$http', '$log', 
		function ($scope, $http, $log){
		$scope.items = {};
		$scope.categories = [];

		$scope.switchCategory = function(category){

			$http.get('../db/items.json').success(function (items){
				$log.log(items);

				angular.forEach(items, function (val, key){
					$log.log(key);
					$scope.categories.push(key);
					$scope.$emit('categories', $scope.categories);
				});
			
			// Set default category or switch to input category
			category = category || $scope.categories[0];
			$scope.items = items[category];

			}).error(function (data, status, header, config){
				$log.warn(data);
			});
		}

		$scope.$on('currentCategory', function (e, currentCategory){
			$scope.switchCategory(currentCategory);
		})

		$scope.switchCategory();

	}]);
})();