var operator = 'require',
	requeireTpl = new RegExp('\/\/' + operator + ' .*'),
	placeTplStart = '<!-- src -->',
	placeTplEnd = '<!-- endsrc -->',
	placeTpl = new RegExp(placeTplStart + '[\\s\\S]*?' + placeTplEnd, 'm'),
	//TODO make use stric
	templateUseStrict = /./,
	deps = [],
	folder = '',
	baseUrl = '',
	dest = '';

module.exports = function(grunt) {
	
	var current_file = false;
	
	function buildDeps(index, dest) {
		if (! grunt.file.exists(dest)) {
			return false;
		}
		
		fileDeps(folder + index);
		
		
		var scripts = "\n";
		deps.map(function(uri) {
			scripts += '<script type="text/javascript" src="' + baseUrl + uri.replace(folder, '') + '"></script>\n';
		});
		
		
		var dest_data = grunt.file.read(dest).replace(placeTpl, placeTplStart + scripts + placeTplEnd);
		grunt.file.write(dest, dest_data);
	}
	
	function fileDeps(filepath) {
		if (! grunt.file.exists(filepath)) {
			return false;
		}
		
		var file_data = grunt.file.read(filepath),
			lines = file_data.split("\n"),
			n = 0;
		
		
		while (lines[n]) {
			line = lines[n].trim();
			if (line.match(requeireTpl)) {
				dep  = line.replace('//' + operator, '').trim();
				fileDeps(folder + dep);
			}
			else
			//TODO make use strict
			if(line != '' || line != 'use') {
				break;
			}
			
			n++;
		}
		
		if (deps.indexOf(filepath) < 0) {
			deps.push(filepath);
		}
		
	}
	
	function manageDep(dep, filepath) {
		deps[filepath] = deps[filepath] || [];
		deps[filepath].push(dep);
	}
	
	
	grunt.registerTask(
		'operator_require',
		'',
		function() {
			var options = this.options({
				baseUrl: '/',
				folder: '.',
				index: 'index.js',
				dest: './index.html',
				operator: operator
			});
			
			deps = [];
			folder = options.folder;
			operator = options.operator;
			baseUrl = options.baseUrl
			buildDeps(options.index, options.dest);
		}
	);
};