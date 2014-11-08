'use strict';
var app = angular.module('fireVue');

app.controller('searchCtrl', function($scope, $location, hirevueService){
	$scope.test = "Please upload a CSV* to preform the search";

	$scope.logout = function(){
		hirevueService.logout().then(function(){
			console.log('Successfully logged out');
			$location.path('/login');
		})
	}

	$scope.showExample = function(){
		$scope.showExample = false;
	};

	$scope.getMyData = function(){
		hirevueService.getMyData()
		.then(function(response){
			$scope.data = response;
			alert('Data has been loaded');
		})
	}

	$scope.csvResults = function(){
		hirevueService.csvResults()
		.then(function(res){
			$scope.data = res;
		})
	}

	$scope.getMyData();


	// Parse local CSV files

	var inputType = "string";
	var stepped = 0, rowCount = 0, errorCount = 0, firstError;
	var start, end;
	var firstRun = true;
	var maxUnparseLength = 10000;

	var start, end;
	var firstRun = true;

	$('#submit').click(function()
	{

		var config = buildConfig();
		var input = $('#input').val();

		// Allow only one parse at a time
		$(this).prop('disabled', true);

		if (!firstRun)
			console.log("--------------------------------------------------");
		else
			firstRun = false;

		var inputType = "local";

		if (inputType == "local")
		{
			if (!$('#files')[0].files.length)
			{
				alert("Please choose at least one file to parse.");
				
			}
			
			$('#files').parse({
				config: config,
				before: function(file, inputElem)
				{
					start = now();
					console.log("Parsing file...", file);
				},
				error: function(err, file)
				{
					console.log("ERROR:", err, file);
					firstError = firstError || err;
					errorCount++;
				},
				complete: function()
				{
					end = now();
					printStats("Done with all files");
				}
			});
		}
		else
		{
			start = now();
			var results = Papa.parse(input, config);
			console.log("Synchronous results:", results);
			if (config.worker || config.download)
				console.log("Running...");
		}
	});

$('#insert-tab').click(function()
{
	$('#delimiter').val('\t');
});

function printStats(msg)
{
	if (msg)
		console.log(msg);
	console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
	console.log("  Row count:", rowCount);
	if (stepped)
		console.log("    Stepped:", stepped);
	console.log("     Errors:", errorCount);
	if (errorCount)
		console.log("First error:", firstError);
}


function buildConfig()
{
	return {
		delimiter: $('#delimiter').val(),
		header: $('#header').prop('checked'),
		dynamicTyping: $('#dynamicTyping').prop('checked'),
		preview: parseInt($('#preview').val() || 0),
		step: $('#stream').prop('checked') ? stepFn : undefined,
		encoding: $('#encoding').val(),
		worker: $('#worker').prop('checked'),
		comments: $('#comments').val(),
		complete: completeFn,
		error: errorFn
	};
}


function completeFn(results)
{
	end = now();

	if (results && results.errors)
	{
		if (results.errors)
		{
			errorCount = results.errors.length;
			firstError = results.errors[0];
		}
		if (results.data && results.data.length > 0)
			rowCount = results.data.length;
	}

	printStats("Parse complete");
	console.log("    Results:", results);
	$scope.results = results.data;
	$scope.compare()
	
}

function errorFn(err, file)
{
	end = now();
	console.log("ERROR:", err, file);

}

function now()
{
	return typeof window.performance !== 'undefined'
	? window.performance.now()
	: 0;
}


$scope.gotIt = false;

$scope.compare = function(){
	var fullnameResult = [];

	var resultsToModify = $scope.results
	for(var i=1; i < $scope.results.length; i++){
		var fullname = $scope.results[i][0] + ' ' + $scope.results[i][1];
		fullnameResult.push(fullname);
	}

	var datanames = [];
	for(var i = 0; i < $scope.data.length; i++){
		datanames.push($scope.data[i].fullName)
	}


	$scope.filteredResults = [];
	for(var i = 0; i < fullnameResult.length; i++){
		if(datanames.indexOf(fullnameResult[i]) > -1){
			$scope.filteredResults.push($scope.results[i])
		}
	}
	$scope.gotIt = true;


}

});



