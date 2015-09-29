'use strict';

/* Set Constants */

//0 --> xs
var XS_VIEW = 0;

//1 --> sm
var SM_VIEW = 1;

//2 --> md
var MD_VIEW = 2;

//3 --> lg
var LG_VIEW = 3;

//4 --> xl
var XL_VIEW = 4;


define([

  /**
    * @requires jcontroller/render
	* @requires jview/viewSize
    */
	'jcontroller/render',
	'jview/viewSize'

], function(render, viewSize){

  /**
	* View Change Module - for initializing all window listeners to store view size
	
	* @exports jview/viewChange
	*/
	var viewChange = {

	   /*
		* Media Queries and Listeners
		* 5 sizes:
			xs --> (640) 
			sm --> (760), 
			md --> (960), 
			lg --> (1200), 
			xl --> (1200+)
		*/

	  /**
		* Function to change view size to xs view
		
		* @function xsMaxChange
		* @alias jview/viewChange.xsMaxChange
		
		* @param {Object} _rs - holds match media data
		*/
		xsMaxChange: function(_rs){ if(_rs.matches){ viewSize.view_size = XS_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to xs view
		
		* @function xsMinChange
		* @alias jview/viewChange.xsMinChange
		
		* @param {Object} _rs - holds match media data
		*/
		xsMinChange: function(_rs){ if(_rs.matches){ viewSize.view_size = XS_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to sm view
		
		* @function smMaxChange
		* @alias jview/viewChange.smMaxChange
		
		* @param {Object} _rs - holds match media data
		*/
		smMaxChange: function(_rs){ if(_rs.matches){ viewSize.view_size = SM_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to sm view
		
		* @function smMinChange
		* @alias jview/viewChange.smMinChange
		
		* @param {Object} _rs - holds match media data
		*/
		smMinChange: function(_rs){ if(_rs.matches){ viewSize.view_size = SM_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to md view
		
		* @function mdMaxChange
		* @alias jview/viewChange.mdMaxChange
		
		* @param {Object} _rs - holds match media data
		*/
		mdMaxChange: function(_rs){ if(_rs.matches){ viewSize.view_size = MD_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to md view
		
		* @function mdMinChange
		* @alias jview/viewChange.mdMinChange
		
		* @param {Object} _rs - holds match media data
		*/
		mdMinChange: function(_rs){ if(_rs.matches){ viewSize.view_size = MD_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to lg view
		
		* @function lgMaxChange
		* @alias jview/viewChange.lgMaxChange
		
		* @param {Object} _rs - holds match media data
		*/
		lgMaxChange: function(_rs){ if(_rs.matches){ viewSize.view_size = LG_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to lg view
		
		* @function lgMinChange
		* @alias jview/viewChange.lgMinChange
		
		* @param {Object} _rs - holds match media data
		*/
		lgMinChange: function(_rs){ if(_rs.matches){ viewSize.view_size = LG_VIEW; render.renderAll(); }},

	  /**
		* Function to change view size to xl view
		
		* @function xlMinChange
		* @alias jview/viewChange.xlMinChange
		
		* @param {Object} _rs - holds match media data
		*/
		xlMinChange: function(_rs){ if(_rs.matches){ viewSize.view_size = XL_VIEW; render.renderAll(); }},

	  /**
		* Function to add listeners to window media changes
		
		* @function initialize
		* @alias jview/viewChange.initialize
		*/
		initialize: function(){
			window.matchMedia('(max-width: 640px)').addListener(this.xsMaxChange);
			window.matchMedia('(max-width: 760px)').addListener(this.smMaxChange);
			window.matchMedia('(max-width: 960px)').addListener(this.mdMaxChange);
			window.matchMedia('(max-width: 1200px)').addListener(this.lgMaxChange);

			window.matchMedia('(min-width: 1px)').addListener(this.xsMinChange);
			window.matchMedia('(min-width: 641px)').addListener(this.smMinChange);
			window.matchMedia('(min-width: 761px)').addListener(this.mdMinChange);
			window.matchMedia('(min-width: 961px)').addListener(this.lgMinChange);
			window.matchMedia('(min-width: 1201px)').addListener(this.xlMinChange);
		}
	};
	
	//export viewchange object
	return viewChange;
});


