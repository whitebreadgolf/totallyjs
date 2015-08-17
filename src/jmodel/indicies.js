'use strict';

define([

  /**
  	* @requires jsingleton
	*/
	'jsingleton', 

], function(js){

  /**
	* Indicies Module - used to get the indicies of data given search criteria

	* @exports jmodel/indicies
	*/
	var indicies = {

	  /**
		* Function to get all indicies to be deleted updated or fetched

		* @function forData
		* @alias jmodel/indicies.forData

		* @param {Object} _data - search data to get correct indicies
		* @param {string} _modelName - user specified model 
		* @param {boolean} _multi - whether one index is returned or mutiple
		* @returns {Object[]} index or indicies to be deleted updated or fetched
		*/
		forData: function(_data, _modelName, _multi){

			//init array
			var indicies = [];
			
			for(var i in js.singleton.models[_modelName].data){
				
				//check for our conditions
				var flag = true;
				for(var elem in _data){ if(_data[elem] !== js.singleton.models[_modelName].data[i][elem]){ flag = false; }}
				if(flag){ 

					//push 2 types of keys, index in array and actual primary key
					indicies.push({
						real_key: js.singleton.models[_modelName].data[i][js.singleton.models[_modelName].primary_key],
						fake_key: i
					}); 

					//break after first find
					if(!_multi){ break; } 
				}
			}

			//return array
			return indicies;	
		}
	};

	//return indicies object
	return indicies;
});