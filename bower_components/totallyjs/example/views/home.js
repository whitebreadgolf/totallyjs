//home view
app.view({name: 'home', type: 'jview', input: 'javascript'}, function($){
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
		$.jgrid({ 	
			name: 'datagrid', 
			columns: {default: 2, xs: 1, sm: 2, md: 5, lg: 5, xl: 10}, 
			gridDataName: 'griddata',
			skeleton: [
				$.h4('.name', [ 'name: {{name}}' ]),
				$.h4('', [ 'age: {{age}}' ])
			]
		}),
		$.jview({name: 'main'})
	];
});