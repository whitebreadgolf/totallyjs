'use strict';

define([

  /**
	* @requires jsingleton 
	*/
	'jsingleton'

	], function(js){

	var HASH = '#';

  /**
	* Location Object Module - directly changes the location object on the window

	* @exports jrouter/location/locationObject
	*/	
	var location = {

	  /**
		* Function for finding the route after the hash 

		* @function routeAfterHash
		* @alias jrouter/location/locationObject.routeAfterHash

		* @returns {string} the substring after the hash character in the current url
		*/
		routeAfterHash: function(){

			var splitUrl = this.getUrl().split(HASH);

			//should get the string after hash
			return splitUrl[splitUrl.length - 1];
		},

	  /**
		* Function for changing the route with edits

		* @function changeRoute
		* @alias jrouter/location/locationObject.changeRoute

		* @param {string} _toRoute - route to swap into the location object
		*/
		changeRoute: function(_toRoute){ this.setUrl(this.getUrlOrigin() + this.getUrlPathname() + HASH + _toRoute); },

	  /**
		* Function determining if the route contains a hash

		* @function hasHash
		* @alias jrouter/location/locationObject.hasHash

		* @returns {boolean} whether the url contains that hash character or not
		*/
		hasHash: function(){ if(this.getUrl().indexOf(HASH) === -1){ return false; } else{ return true; }},

	  /**
		* Function for finding the route after the hash 

		* @function routeAfterHash
		* @alias jrouter/location/locationObject.routeAfterHash
		*/
		addHash: function(){ this.setUrl(this.getUrl() + HASH + '/'); },

	  /**
		* Function to get the whole url

		* @function getUrl
		* @alias jrouter/location/locationObject.getUrl

		* @returns {string} the full url
		*/
		getUrl: function(){ return window.location.toString(); },

	  /**
		* Function to get the origin of the url

		* @function getUrlOrigin
		* @alias jrouter/location/locationObject.getUrlOrigin

		* @returns {string} the origin of the url
		*/
		getUrlOrigin: function(){ return window.location.origin.toString(); },

	  /**
		* Function to get the pathname of the url

		* @function getUrlPathname
		* @alias jrouter/location/locationObject.getUrlPathname

		* @returns {string} the path of the current url
		*/
		getUrlPathname: function(){ return window.location.pathname; },

	  /**
		* Function to set the url directly

		* @function setUrl
		* @alias jrouter/location/locationObject.setUrl
		*/
		setUrl: function(_url){ window.location = _url; }
	};

	//export location object
	return location;
});