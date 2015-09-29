'use strict';

define([

  /**
  	* @requires jmodel/ajax/ajax
  	* @requires jloader/jsync
  	* @requires jrouter/jrouter
	*/
	'jmodel/ajax/ajax', 
	'jloader/jsync', 
	'jrouter/jrouter'

], function(ajax, sync, jr){

	//file extention regex
	var FILE_EXTENTION = /\.[^\.a-z]{0,3}/i;

  /**
	* JLoader Module - used to load user project files into the application

	* @exports jloader/jloader
	*/	
	var jl = {

	
	  /**
		* Function to load all of our defined scripts

		* @function processConfigSettings
		* @alias jloader/jloader.processConfigSettings

		* @param {Object} _configObject - user specified configuration object
		*/
		processConfigSettings: function(_configObject){

			//check if files are configured, not false
			if(_configObject.files){ this.loadFilesInFolder(_configObject.root, _configObject.files); }
		},

	  /**
		* Function to iterate through the user specified configuration object

		* @function loadFilesInFolder
		* @alias jloader/jloader.loadFilesInFolder

		* @param {string} _folder - folder path from source
		* @param {Object} _files - object of inner files and folders
		*/
		loadFilesInFolder: function(_folder, _files){
			for(var file in _files){

				//check if object or string naming file
				if(_files[file] instanceof Object){

					var filePath;

					//check if we need to strip the root
					if(_files[file].root.charAt(0) === '/'){ filePath = _files[file].root.substring(1, _files[file].root.length); }
					if(_files[file].root.charAt(_files[file].root.length-1) === '/'){ filePath = _files[file].root.substring(0, _files[file].root.length-1); }
					else{ filePath = _files[file].root; }

					//recursive call to subfolder
					this.loadFilesInFolder(_folder+'/'+filePath, _files[file].files);
				}
				else{

					var fileName;

					//check to see if we need to add .js
					var file_extention = _files[file].search(FILE_EXTENTION);
					if(file_extention > -1){ fileName = _files[file]; }
					else{ fileName = _files[file] + '.js'; }

					//make the server request
					sync.loadingStatus++;
					sync.start = true;
					this.loadFileIntoApp(_folder, fileName);
				}
			}
		},

	  /**
		* Function for refreshing our route with try/catch

		* @function loadFileIntoApp
		* @alias jloader/jloader.loadFileIntoApp

		* @param {string} _filePath - path to the file to be loaded
		* @param {string} _fileName - name of the files to be loaded
		*/
		loadFileIntoApp: function(_filePath, _fileName){
			ajax.call('GET', window.location.origin+'/'+_filePath+'/'+_fileName, {}, function(data){
				
				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement('script');

				//put script into index.html
				script.innerHTML = data;
				head.appendChild(script);
				sync.loadingStatus--;

				//when last script is loaded
				if(sync.loadingStatus === 0){

					//initializing router
					jr.initialize();
				}
			});
		}
	};

	//return jloader 
	return jl;
});

