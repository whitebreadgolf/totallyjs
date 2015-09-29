'use strict';

define([

  /**
	* @requires jsingleton 
	* @requires jrouter/location/locationHandler
	* @requires jloader/jsync
	* @requires jrouter/location/locationObject
	*/
	'jsingleton', 
	'jrouter/location/locationHandler',
	'jloader/jsync',
	'jrouter/location/locationObject'

], function(js, lh, sync, location){

  /**
	* JRouter Module - used to initialize the functionallity of the router, set the current route, and add routes to the application

	* @exports jrouter/jrouter
	*/	
	var jr = {
	
	  /**
		* Function used to init all listeners for routing

		* @function initialize
		* @alias jrouter/jrouter.initialize
		*/
		initialize: function(){

			//add lister to the hash change to detect routes
			window.addEventListener('hashchange', function(event){ lh.refreshRoute(); }, false);

			//put a hash at the end of the loaded route
			window.addEventListener('load', function(event){

				if(location.hasHash()){ lh.refreshRoute(); }
				else{ location.addHash(); }

			}, false);

		    /*

			 If we add the load event after it has triggered we perform the same operation manually, 
			 this may happen depending on how fast our files load / how many we load

			 */

			if(location.hasHash()){ lh.refreshRoute(); }
			else{ location.addHash(); }
		},

	  /**
		* Function used for setting a single route

		* @function setRoute
		* @alias jrouter/jrouter.setRoute

		* @param {Object} _routeObject - an expected data object decribing a route
		*/
		setRoute: function(_routeObject){
			if(_routeObject !== undefined && _routeObject.route !== undefined && _routeObject.view !== undefined){
				if(_routeObject.route.length > 0 && _routeObject.route.charAt(0) !== '/' && _routeObject.route !== 'otherwise'){ _routeObject.route = '/'+_routeObject.route;}

				//declare the route explicitly
				js.singleton.routes[_routeObject.route] = _routeObject.view;
			}
			else if(_routeObject !== undefined && _routeObject.reroute !== undefined && _routeObject.to !== undefined){

				//init the rerout selector if it hasn't already
				js.singleton.routes['reroute'] = js.singleton.routes['reroute'] || [];
				js.singleton.routes['reroute'].push({from: _routeObject.reroute, to: _routeObject.to});
			}
			else if(_routeObject !== undefined && _routeObject.route !== undefined && _routeObject.controller !== undefined){

				if(_routeObject.route.length > 0 && _routeObject.route.charAt(0) !== '/'){ _routeObject.route = '/'+_routeObject.route;}

				//add the controller 
				js.singleton.routes[_routeObject.route] = _routeObject.controller;
			}
		}
	};

	//export jrouter object
	return jr;
});