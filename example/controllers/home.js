//home controller
app.controller({name: 'homeController'},{

	home:function(view, model){

		//bind data to view
		view('home').addData('title', 'home');

		//set the grid data in the grid
		view('home').addData('griddata', model('person').getAll());

		//render view
		view('home').render();
	},

	main:function(view, model){

		//bind data to view
		view('main').addData('title', 'main');

		//render view
		view('main').render();
	}, 

	addPerson: function(view, model){
		model('person').add({age: 23, height: 100, weight: 123, name: 'karl'});

		this.home(view, model);
	},

	deletePerson: function(view, model){
		model('person').delete({ where: {name: 'karl'}});

		this.home(view, model);
	},

	updatePerson: function(view, model){
		model('person').updateAll({ update: {age: 24}, where: {name: 'karl'} });

		this.home(view, model);
	}
});
