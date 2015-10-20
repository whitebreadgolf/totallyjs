
//home controller
app.controller({name: 'homeController'}, function(view, model){

return {
	home:function(){

		//bind data to view
		view('home').addData('title', 'home');

		//set the grid data in the grid
		view('home').addData('griddata', model('person').getAll());

		//render view
		view('home').render();
	},

	main:function(){

		//bind data to view
		view('main').addData('title', 'main');

		//render view
		view('main').render();
	}, 

	addPerson: function(){
		model('person').add({age: 23, height: 100, weight: 123, name: 'karl'});

		this.home();
	},

	deletePerson: function(){
		model('person').delete({ where: {name: 'karl'}});

		this.home();
	},

	updatePerson: function(){
		model('person').updateAll({ update: {age: 24}, where: {name: 'karl'} });

		this.home();
	}
};

});
