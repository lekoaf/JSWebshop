(function (){
	var app = angular.module('jsWebshop', ['ngRoute']);

	app.config(['$routeProvider', function ($routeProvider){
		$routeProvider
			.when('/', {
				controller: 'itemController',
				templateUrl: 'app/views/items.html'
			})
			.when('/basket', {
				controller: 'basketController',
				templateUrl: 'app/views/basket.html'
			})
			.otherwise({redirectTo: '/'});
	}]);
})();