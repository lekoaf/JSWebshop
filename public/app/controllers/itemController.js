(function (){
	angular.module('jsWebshop').controller('itemController', ['$scope', '$http', '$log', 
		function ($scope, $http, $log){
		$scope.items = {};
		$scope.categories = [];

		$scope.switchCategory = function(category){

			// Set default category or switch to input category
			category = category || 'kitchen';

			$http.get('../db/items.json').success(function (items){
				$log.log(items);
				$scope.items = items[category];

				angular.forEach(items, function (val, key){
					$log.log(key);
					$scope.categories.push(key);
					$scope.$emit('categories', $scope.categories);
				});

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