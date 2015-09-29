'use strict';

//static strings
var CLASS = 'class';
var CLASS_SYM = '.';
var ID = 'id';
var ID_SYM = '#';
var SPACE = ' ';
var BLANK = '';

define([], function(){
	
	//regexs 
	var DOT_REPLACE = /\./g;
	var FIRST_EQUALS = /(=)/i;

  /**
	* View Object Parser Module - for parsing the user specified view object
	
	* @exports viewObjectParser
	*/
	var vop = {

	  /**
		* Function to parse a string into an identifier object for a given tag element
		
		* @function parseIdentifiers
		* @alias viewObjectParser.parseIdentifiers
		
		* @param {string} _identifierString - a tagObject representing a view @see {@link module:jview/tags/tagObject}
		* @returns {Object} contains all the identifiers for a given tag
		*/
		parseIdentifiers: function(_identifierString){

			//pull out identifiers
			var allIdentifiers = _identifierString.split(SPACE);

			var idObject = {};
			for(var i = 0; i < allIdentifiers.length; i++){

				//class or id
				if(allIdentifiers[i].charAt(0) 		=== CLASS_SYM){ idObject[CLASS] = allIdentifiers[i].replace(DOT_REPLACE, SPACE);}
				else if(allIdentifiers[i].charAt(0) === ID_SYM){ idObject[ID] = allIdentifiers[i].substr(1,allIdentifiers[i].length); }
				else if(allIdentifiers[i] 			!== BLANK){

					var divider = allIdentifiers[i].search(FIRST_EQUALS);
					var otherIdentifier = [allIdentifiers[i].substr(0, divider), allIdentifiers[i].substr(divider + 1, allIdentifiers[i].length)];

					if(otherIdentifier.length !== 2){ throw 'invalid identifier in view object'; }
					idObject[otherIdentifier[0]] = otherIdentifier[1].substr(0,otherIdentifier[1].length);
				}
			}

			//return function and recursive call
			return idObject;
		}
	};

	//export view object parser
	return vop;
});