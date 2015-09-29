'use strict';

define([

  /**
  	* @requires jsingleton
	*/
	'jsingleton'

], function(js){
	
	var EXP_DATA = 'expected_data';

  /**
	* Ajax Module - module for performing network requests

	* @exports jmodel/ajax/ajax
	*/
	var ajax = {

	  /**
		* Function to make a basic ajax call

		* @function call
		* @alias jmodel/ajax/ajax.call

		* @param {string} _type - type of request
		* @param {string} _route - path of the route to be called
		* @param {Object} _reqData - data to be included either as a route parameter or route query
		* @param {function} _callback - function to execute after request is complete
		*/
		call: function(_type, _route, _reqdata, _callback){

			//init the req object
			var req;
			if (window.XMLHttpRequest !== undefined){ req = new XMLHttpRequest(); }
			else{ req = new ActiveXObject('Microsoft.XMLHTTP'); }

			//when we get a response that is successufll 
			req.onreadystatechange = function(){ if(req.readyState === 4 && req.status === 200){ 
				var result;
				try{ result = JSON.parse(req.responseText); }
				catch(error){ result = req.responseText; }
				_callback(result); 
			}}

			//set up params binded to the url
			var reqstring = '?';
			for(var i in _reqdata){ reqstring += i + '=' + JSON.stringify(_reqdata[i]) + '&'; }

			//send request asychronously
			req.open(_type, _route + reqstring, true); req.send();
		},

	  /**
		* Function to make an abstracted ajax call unique to restful web interfaces

		* @function smart
		* @alias jmodel/ajax/ajax.smart

		* @param {string} _type - type of restful request
		* @param {string} _modelName - name of the model for which the data is being sent
		* @param {Object} _data - data to be included either as a route parameter or route query
		* @param {function} _callback - function to execute after request is complete
		*/
		smart: function(_type, _modelName, _data, _callback){
			
			//type map
			var reqTypeMap = {
				add: 'PUT',
				get: 'GET',
				getAll: 'GET',
				update: 'PUT',
				delete: 'DELETE'
			};

			//check the data
			for(var i in js.singleton.models[_modelName].backend.config.routes[_type][EXP_DATA]){
				if(_data[js.singleton.models[_modelName].backend.config.routes[_type][EXP_DATA][i]] === undefined){ 
					throw 'expected data ' + js.singleton.models[_modelName].backend.config.routes[_type][EXP_DATA][i] + ' not found'; 
				}
			}

			//add stuff to the backend
			var reqData = this.insertDataInRoutes(_data, _modelName, _type);
			this.call(reqTypeMap[_type], reqData.route, reqData.params, _callback);
		},

	  /**
		* Function to make an abstracted ajax call unique to restful web interfaces

		* @function insertDataInRoutes
		* @alias jmodel/ajax/ajax.insertDataInRoutes
		
		* @param {Object} _data - data to be included either as a route parameter or route query
		* @param {string} _modelName - name of the model for which the data is being sent
		* @param {string} _method - type of restful request
		* @returns {Object} _data separated by its method of sending (parameter or query)
		*/
		insertDataInRoutes: function(data, modelName, method){
			var backend = js.singleton.models[modelName].backend.config;
			var routeString = backend.routes[method].route;
			var splitRoute = routeString.split('|');
			var newRouteString = '';
			for(var j in splitRoute){

				//didnt find a route parameter
				if(splitRoute[j].indexOf('/') === -1 && splitRoute[j] !== ''){

					//it should be in data
					if(data[splitRoute[j]] === undefined){ throw 'undefined data in route'; }
					newRouteString += data[splitRoute[j]];
				}
				//found formatted part of route
				else{ newRouteString += splitRoute[j]; }
			}

			var allParams = {};
			for(var i in backend.routes[method].params){ allParams[backend.routes[method].params[i].name] = data[backend.routes[method].params[i].name]; }

			return {route: newRouteString, params: allParams};
		}
	};
	
	//export ajax object
	return ajax;
});