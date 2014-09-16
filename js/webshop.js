var SKWEBSHOP = (function(){

	var totalPrice = 0;
	var totalItems = 0;
	var basket = [];
	var items = {};
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
		addToBasket: function(no, item){
			console.log("Adding");

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
			console.log("Updating");

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
			console.log("Deleting");

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
			console.log("Total: "+totalPrice);
			console.log("Number of items: "+totalItems);
			for (var i = 0, inl = basket.length; i < inl; i++){
				console.log("Item: "+ basket[i].item);
				console.log("No: "+ basket[i].no);
				console.log("Price: "+items[basket[i].cat][basket[i].item].price);
				console.log("##########");
			}
			console.log("----------------------------");
		},
		getStorage: function(){
			basket = JSON.parse(localStorage.getItem('basket')) || [];	
		},
		deleteStorage: function(){
			localStorage.removeItem('basket');
		}
	
	};

})();