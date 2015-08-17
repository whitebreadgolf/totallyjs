'use strict';

define([

  /**
    * @requires jcontroller/subcontrollers/listener/listenerObject
    */
	'jcontroller/subcontrollers/listener/listenerObject'

], function(listenerObject){

  /**
	* Render Module - for rendering a given view object
	
	* @exports jcontroller/render
	*/
	var render = {

	  /**	
		* Object to keep track of the currently rendered view

		* @public
		*/
		currentView: {},

	  /**
		* Function to call to display a view onto the dom directly
		
		* @function renderAll
		* @alias jcontroller/render.renderAll
		
		* @param {Object=} _viewObj - a tagObject representing a view @see {@link module:jview/tags/tagObject}
		*/
		renderAll: function(_viewObj){

			//clear all current listeners registered
			listenerObject.clearListeners();

			//check if there is a viewObj available
			if(_viewObj === undefined){ _viewObj = this.currentView; }
			else{ this.currentView = _viewObj; }

			var renderedText = '';
			var renderedTitle = '';
			
			//get all rendered text plus pass the view object into the render function
			renderedText += _viewObj.render(_viewObj.variables);
			if(_viewObj.TYPE === 'view'){renderedTitle = _viewObj.id}

			//get important document elements
			var myDoc = document.documentElement;
			var myTitle = document.getElementsByTagName('title')[0];
			var myBody = document.getElementsByTagName('body')[0];
			var head = document.getElementsByTagName('head')[0];

			//replace body if available, otherwise just write to the whole doc
			if(myBody !== undefined){ myBody.innerHTML = renderedText; }
			else{ document.write(renderedText); }

			//change or create title
			if(myTitle){ myTitle.innerHTML = renderedTitle; }
			else{
				var title = document.createElement('title');
				title.appendChild(document.createTextNode(renderedTitle));
				head.appendChild(title);
			}

			//todo AFTER the dom is in place 
			listenerObject.addAllListeners();
		}
	};

	//return render object
	return render;
});