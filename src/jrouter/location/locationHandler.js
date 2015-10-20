'use strict';

define([

  /**
  	* @requires jcontroller/jcontroller
  	* @requires jloader/jsync
	* @requires jsingleton 
	* @requires	jcontroller/render
	* @requires jrouter/location/locationObject
	*/
	'jcontroller/jcontroller', 
	'jloader/jsync',
	'jsingleton',
	'jcontroller/render',
	'jrouter/location/locationObject'

], function(jc, sync, js, render, location){

  /**
	* Location Handler Module - used to parse and insert strings into the route

	* @exports jrouter/location/locationHandler
	*/	
	var lh = {

	  /**
		* Function for refreshing our route with try/catch

		* @function refreshRoute
		* @alias jrouter/location/locationHandler.refreshRoute
		*/
		refreshRoute: function(){

			//try ro route based on url
			try{ this.preRouteStringHandler(); }

			//check to see if we are still loading scripts and suppress error if we are
			catch(err){

				//we finished loading scripts and we sill can't find the route
				if(sync.loadingStatus === 0){ throw err; }
				else{ throw 'project files not loaded'; }
			}
		},

	  /**
		* Function to hand the route after the hash to the string handler

		* @function preRouteStringHandler
		* @alias jrouter/location/locationHandler.preRouteStringHandler
		*/
		preRouteStringHandler: function(){

			//handle the route string
			this.routeStringHandler(location.routeAfterHash());
		},

	  /**
		* Function for handling our route string and calling the correct controller or rendering the correct view

		* @function routeStringHandler
		* @alias jrouter/location/locationHandler.routeStringHandler

		* @param {string} _route - the path attached to the current route
		*/
		routeStringHandler: function(_route){

			//this shouldn't happen uless the unload event doesnt fire
			if(_route.length > 0 && _route.charAt(0) !== '/'){ throw 'invalid route'; }

			//check reroutes
			if(js.singleton.routes['reroute'] !== undefined){
				for(var reroute in js.singleton.routes['reroute']){
					if(_route === js.singleton.routes['reroute'][reroute].from){ this.rerouteStringHandler(js.singleton.routes['reroute'][reroute].to); return; }
				}
			}

			//contains a . indicating a controller function
			if(js.singleton.routes[_route] !== undefined && js.singleton.routes[_route].indexOf('.') > -1){

				//get controller name and function
				var controllerNames = js.singleton.routes[_route].split('.');

				//call the specified controller function and return
				if(controllerNames.length === 2){ jc.callController(controllerNames[0], controllerNames[1]); return;}
			}

			//specified routename and coorisponding view

			var specifiedView = js.singleton.views[js.singleton.routes[_route]];

			//if the route isn't specified
			if(specifiedView === undefined){ 
				var otherwiseView = js.singleton.views[js.singleton.routes['otherwise']];
				if(otherwiseView === undefined){throw 'route not found';}
				render.renderAll(otherwiseView);
			}

			//render the specified view
			render.renderAll(specifiedView);
		},

	  /**
		* Function to change the route to the rerouted string

		* @function rerouteStringHandler
		* @alias jrouter/location/locationHandler.rerouteStringHandler

		* @param {string} _toRoute - the new route
		*/
		rerouteStringHandler: function(_toRoute){ location.changeRoute(_toRoute); }
	};

	//return location handler object
	return lh;
});