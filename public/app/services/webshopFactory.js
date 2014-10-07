(function (){

	angular.module('jsWebshop').factory('webshopFactory', ['$window', '$log', 
		function ($window, $log){
		
		var totalPrice = 0;
		var totalItems = 0;
		var basket = [];
		var items = {};
		var defaultCategory = "kitchen";
		var currentCategory = "";

		function setStorage(){
			localStorage.setItem('basket', JSON.stringify(basket));
		}

		return {

			getTotalItems: function(){
				return totalItems;
			},
			setItems: function(data){
				items = data;
			},
			getItems: function(){
				return items;
			},
			getItemInfo: function(cat, item){
				return {price: items[cat][item].price, name: items[cat][item].title};
			},
			setCategory: function(c){
				currentCategory = c;
			},
			getDefaultCategory: function(){
				return defaultCategory;
			},
			addToBasket: function(no, item){
				$log.log("Adding");

				for (var i = 0, bl = basket.length; i < bl; i++){
					if (basket[i].item === item){
						basket[i].no += no;
						setStorage();
						return;
					}
				}
				basket.push({no: no, item: item, cat: currentCategory});
				setStorage();
			},
			getBasket: function(){
				return basket;
			},
			updateBasketItem: function(no, item){
				$log.log("Updating");

				if (no === 0){
					return this.deleteFromBasket(item);
				}

				for (var i = 0, inl = basket.length; i < inl; i++){
					if (basket[i].item === item){
						basket[i].no = no;
						setStorage();
						return;
					}
				}
			},
			deleteFromBasket: function(item){
				$log.log("Deleting");

				for (var i = 0, inl = basket.length; i < inl; i++){
					if (basket[i].item === item){
						basket.splice(i, 1);
						setStorage();
						return;
					}
				}
			},
			setTotal: function(){
				totalItems = 0;
				totalPrice = 0;
				for (var i = 0, bl = basket.length; i < bl; i++){
					totalItems += basket[i].no;
					totalPrice += basket[i].no * items[basket[i].cat][basket[i].item].price;
				}
			},
			talk: function(){
				$log.log("Total: "+totalPrice);
				$log.log("Number of items: "+totalItems);
				for (var i = 0, inl = basket.length; i < inl; i++){
					$log.log("Item: "+ basket[i].item);
					$log.log("No: "+ basket[i].no);
					$log.log("Price: "+items[basket[i].cat][basket[i].item].price);
					$log.log("##########");
				}
				$log.log("----------------------------");
			},
			getStorage: function(){
				basket = JSON.parse(localStorage.getItem('basket')) || [];	
			},
			deleteStorage: function(){
				localStorage.removeItem('basket');
			}
		
		};
	}]);

})();