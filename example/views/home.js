//home view
app.view({name: 'home', type: 'jview'}, function($){
	return [
		$.div('#main .pviewContainer', [
			$.div('.pcenter.pviewColumn100', [
				$.h4('#title', ['this is {{title}}'])
			]),	
			$.div('.pcenter.pviewColumn100', [
				$.a('href="#/home"', ['home']), 
				' ', 
				$.a('href="#/main"', ['main'])
			]),
			$.div('.pcenter.pviewColumn100', [
				$.button('#addBtn click-controller=homeController.addPerson', ['Add person']), 
				$.button('#deleteBtn click-controller=homeController.deletePerson', ['Delete person']), 
				$.button('#updateBtn click-controller=homeController.updatePerson', ['Update person'])
			])
		]),
		$.repeat({ 	
			data: 'griddata',
			skeleton: [
				$.div('.gridElem',[
					$.h4('.name', [ 'name: {{name}}' ]),
					$.h4('', [ 'age: {{age}}' ])
				])
			]
		}),
		$.jview({name: 'main'})
	];
});
