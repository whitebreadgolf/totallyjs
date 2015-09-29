//we can link both views and controllers
app.routes([
	{route: '/home', controller: 'homeController.home'},
	{route: '/main', controller: 'homeController.main'},
	{route: 'otherwise', view: '404'},
	{reroute: '/', to: '/home'}
]);