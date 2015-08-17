'use strict';

define([

  /**
	* @requires jsingleton 
	* @requires jcontroller/subcontrollers/listener/listenerObject
	* @requires jcontroller/subcontrollers/listener/listenerQueues
	*/
	'jsingleton',
	'jcontroller/subcontrollers/listener/listenerObject',
	'jcontroller/subcontrollers/listener/listenerQueues'

], function(js, listenerObject, listenerQueue){

  /**
	* Listner Controller Module - listener function to add listeners to elements
	* @exports jcontroller/subcontrollers/listenerController

	* @param {string} _type - type of listener to be added
	* @param {function} _handler - handler function specified
	* @param {Boolean} _propagating - whether the event should be propagated

	* @returns {Object} listener object to allow the binding of listeners to objects
	*/	
	var listener = function(_type, _handler, _propagating){

		//initial error checking
		if(_type === undefined){ throw 'listener needs type'; }

		//check specific type of listener
		else if(_type !== 'click' && _type !== 'mouseout' && _type !== 'mousemove' && _type !== 'mouseover' ){ throw 'not a valid listener type'; }
		if(_handler === undefined){ throw 'listener needs handler'; }

		return{
			
		  /**
			* The type of listener

			* @public
			*/
			type: _type,

		  /**
			* The userspecified handler function

			* @public
			*/
			handler: _handler,

		  /**
			* If the event should propagate

			* @public
			*/
			propagating: _propagating,

		  /**
			* Function used to bind an element to a listener function
			
			* @function bindToElement
			* @alias jcontroller/subcontrollers/listenerController.bindToElement

			* @param {string} _name - the name of the element to be binded
			*/
			bindToElement: function(_name){

				var that = this;

				//error on input
				if(_name === undefined){ throw 'bindToElement needs a class or id name'; }

				//class of element
				if(_name.charAt(0) === '.'){ 
					if(listenerQueue.classListenerQueue[_name.substr(1,_name.length)] !== undefined){
						listenerQueue.classListenerQueue[_name.substr(1,_name.length)][that.type] = { 
							handler: that.handler, propagating: that.propagating 
						};
					}
					else{
						listenerQueue.classListenerQueue[_name.substr(1,_name.length)] = {};
						listenerQueue.classListenerQueue[_name.substr(1,_name.length)][that.type] = { 
							handler: that.handler, propagating: that.propagating 
						};
					}
				}

				//id of element
				else if(_name.charAt(0) === '#'){
					if(listenerQueue.idListenerQueue[_name.substr(1,_name.length)] !== undefined){
						listenerQueue.idListenerQueue[_name.substr(1,_name.length)][that.type] = { 
							handler: that.handler, propagating: that.propagating 
						};
					}
					else{
						listenerQueue.idListenerQueue[_name.substr(1,_name.length)] = {};
						listenerQueue.idListenerQueue[_name.substr(1,_name.length)][that.type] = { 
							handler: that.handler, propagating: that.propagating 
						};
					}	
				}

				//error on input
				else{ throw 'element must be identified by a element or class'; }
			}
		};
	};

	return listener;
});