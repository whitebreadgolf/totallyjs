'use strict';

define([

  /**
  	* @requires jsingleton
	* @requires jcontroller/subcontrollers/listenerController
	* @requires jcontroller/jcontroller
    */
	'jsingleton',
	'jcontroller/subcontrollers/listenerController',
	'jcontroller/jcontroller'

], function(js, listener, jc){

	//regex's for checking tag elements and handler types
	var TAG_ELEMENTS = /(id|class|href|action|method|type|value|rel|for|style|title|name|width|height|alt)/i;
	var LISTENER_TYPES = /(click|mouseover|mouseout|mouseup|mousemove)/;
	var LISTENER_ELEMENTS = /(controller|helper)/i;

	//regex for templating
	var TEMPLATE_REPLACE = /\{\{([^\}]+)\}\}/g;

  /**
	* Tag Content Parser Module - parses the tag content and identifiers
	
	* @exports jview/tags/tagContentParser
	*/
	var tcp = {

	  /**
		* Function to get all the inter html of a tag in text for display
		
		* @function allContent
		* @alias jview/tags/tagContentParser.allContent
		
		* @param {Object[]} _content - all tag object within the current tag object
		* @param {string} _viewObj - a jview object
		* @returns {string} plaintext dom
		*/
		allContent: function (content, viewObj){

			//actual html to be returned
			var allDomText = "";

			for(var i = 0; i < content.length; i++){
				if(content[i] instanceof Object){
					
					if(content[i].TYPE !== undefined && content[i].TYPE === 'placeholder'){
						allDomText += js.singleton.views[content[i].name].render(viewObj);
					}
					else{ allDomText += content[i].render(viewObj); }
				}
				else{ allDomText += this.getTextOrPlaceholder(content[i], viewObj); }
			}

			//return html text
			return allDomText;
		},

	  /**
		* Function to inject variables in plaintext
		
		* @function getTextOrPlaceholder
		* @alias jview/tags/tagContentParser.getTextOrPlaceholder
		
		* @param {Object[]} _content - all tag object within the current tag object
		* @param {string} _viewObj - a jview object
		* @returns {string} inner html text 
		*/
		getTextOrPlaceholder: function(_content, _viewObj){

			//string replacement for the placeholders
			_content = _content.replace(TEMPLATE_REPLACE, function(res){
				var _var = res.substr(2, res.length-4);
				if(_viewObj[_var] !== undefined){
					return _viewObj[_var];
				}
				else{ return '*undefined varaible '+ _var +'*' }	
			});

			/* OLD METHOD OF STRING REPLACEMENT */
			
			//flags
			// var flag1 = false;
			// var flag2 = false;
			// var flag3 = false;
			// var _var = '';
			// var startPoint = 0;

			// var i=0;
			// while(i < content.length){
			// 	if(flag1){
			// 		if(flag2){	
			// 			if(flag3){
			// 				if(content.charAt(i) == ']'){ 
			// 					//closed correctly, add string to list of vars
			// 					if(viewObj[_var]){
			// 						content = content.substring(0, startPoint) + viewObj[_var] + content.substring(i+1, content.length);
			// 						i = startPoint + (_var.length - 1);
			// 					}
			// 					else{
			// 						throw 'undefined variable defined in view ' + viewObj.title;
			// 					}						

			// 					//set all flags and string back to original value
			// 					_var = ''; flag1 = false; flag2 = false; flag3 = false;
			// 				}
			// 				else{
			// 					//not closed correctly or just a bracket, keep adding characters
			// 					_var += content.charAt(i); flag3 = false;
			// 				}
			// 			}
			// 			else{ if(content.charAt(i) == ']'){ flag3 = true; } else{ _var += content.charAt(i); }}		
			// 		}
			// 		else{ if(content.charAt(i) == '['){ flag2 = true; } else{ flag1 = false; }}	
			// 	}
			// 	else if(content.charAt(i) == '['){ flag1 = true; startPoint = i; }
			// 	i++;
			// }

			/* END OLD METHOD */

			return _content;
		},

	  /**
		* Function to get all of the identifiers of an html tag (ie. id and class)
		
		* @function getIdentifiers
		* @alias jview/tags/tagContentParser.getIdentifiers
		
		* @param {string} _identifier - string holding all tag identifiers
		* @returns {string} all plaintext tag identifiers 
		*/
		getIdentifiers: function (_identifier){

			//empty tag element string
			var tagWrite = '';

			//go through each element in the identifier object
			for(var elem in _identifier){

				if(elem.search(TAG_ELEMENTS) > -1){
					tagWrite += this.getIdentifiersHelper(_identifier[elem], elem); 
				}
				else if(elem.search(LISTENER_ELEMENTS) > -1 && elem.search(LISTENER_TYPES) > -1){
					tagWrite += this.addTagListener(_identifier[elem], elem, _identifier['id']); 
				}

				else{ throw 'unidentified tag in view'; }
			}
			
			//return the tag elements with additions
			return tagWrite;
		},

	  /**
		* Function to format a string to put in html tag
		
		* @function getIdentifiersHelper
		* @alias jview/tags/tagContentParser.getIdentifiersHelper
		
		* @param {string} _value - value for tag identifier
		* @param {string} _tagElem - specific tag identifiers
		* @returns {string} formatted tag identifier
		*/
		getIdentifiersHelper: function(_value, _tagElem){ return ' '+_tagElem+'='+this.addQuotes(_value); },

	  /**
		* Function to add a listener if it is specified by a tag identifier
		
		* @function addTagListener
		* @alias jview/tags/tagContentParser.addTagListener
		
		* @param {string} _value - value for tag identifier
		* @param {string} _tagElem - specific tag identifiers
		* @param {string} _id - id if it exists
		* @returns {string} all plaintext tag identifiers 
		*/
		addTagListener: function(_value, _tagElem, _id){

			//check if there's an existing id 
			var newId;
			if(_id === undefined){ newId = '1234'; }
			else{ newId = _id; }

			var elemTypes = _tagElem.split('-');

			//get controller name and function
			var controllerNames = _value.split('.');

			if(elemTypes[1] === 'controller'){

				listener(elemTypes[0], function(e){
					jc.callController(controllerNames[0], controllerNames[1]);
				}, true).bindToElement('#' + newId);
			}

			//decide if we add an id to the identifier string
			if(_id === undefined){ return ' id="'+newId+'"'; }
			else{ return ''; }
		},

	  /**
		* Function to append quotation marks to a variable if needed
		
		* @function addQuotes
		* @alias jview/tags/tagContentParser.addQuotes
		
		* @param {string} _term - variable with or without quotation marks
		* @returns {string} variable surrounded by quotations
		*/
		addQuotes: function(_term){
			if(_term.charAt(0) === '"'){
				return _term;
			}
			else{ return '"' + _term + '"'; }
		}
	};

	//export tag content parser object
	return tcp;
});