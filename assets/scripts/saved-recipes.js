var config = {
    apiKey: "AIzaSyAh--04dzUCt6Iph2w8xn-cHUMx-Yfj6eM",
    authDomain: "nutrition-36cb1.firebaseapp.com",
    databaseURL: "https://nutrition-36cb1.firebaseio.com",
    storageBucket: "nutrition-36cb1.appspot.com",
    messagingSenderId: "759784210701"
  };

firebase.initializeApp(config);

var database = firebase.database();

var savedRecipes = database.ref("Saved Recipes");

var savedRecipesURI = [];

var keys;

savedRecipes.on("value", function(snapshot) {
	keys = Object.keys(snapshot.val());
	console.log(keys);
	//console.log(uri);
	for (var i = 0; i < keys.length; i++) {
		var uri = snapshot.child(keys[i]).val().recipe;
		var encodedURI =  encodeURIComponent(uri);
		console.log(encodedURI);
		//savedRecipesURI.push(uri)
		//var url = "https://api.edamam.com/search?r=" + uri + "&app_idbcb68bd8" + "&app_key=2a8d5e5d4600120a11ab487124231f6c"
		//console.log(url);
		savedRecipesURI.push(encodedURI);
	}
	console.log(savedRecipesURI)
	recallSavedRecipes();
});
	

		/*$.ajax({
	  	url: url,
	  	method: 'GET',
		}).done(function(response) {
	  	console.log(response);
	  	loadHTML(response);
		}).fail(function(err) {
	  	throw err;
		});
		}
		

})*/

function recallSavedRecipes() {
	for (var i = 0; i < savedRecipesURI.length; i++) {
		var url = "https://api.edamam.com/search?r=" + savedRecipesURI[i] + "&app_idbcb68bd8" + "&app_key=2a8d5e5d4600120a11ab487124231f6c"
	
		$.ajax({
		  	url: url,
		  	method: 'GET',
			}).done(function(response) {
		  	console.log(response);
		  	
				if (i === 0 || i%3 === 0) {
					var newRow = $("<div class = row>");
					var newColumn = $("<div>");
					newColumn.addClass("col-xs-12 col-sm-4 col-md-4 col-lg-4");
					var imageURL = response[0].image;
					var title = response[0].label;
					var returnURL = response[0].url;
					newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
					newRow.append(newColumn);
					$(".results").append(newRow);
				} else {
					var newColumn = $("<div>");
					newColumn.addClass("col-xs-12 col-sm-4 col-md-4 col-lg-4");
					var imageURL = response[0].image;
					var title = response[0].label;
					var returnURL = response[0].url;
					newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );	
					$(".results .row:last-child").append(newColumn);
				}

			}).fail(function(err) {
		  	throw err;
		});
	}
}


/*function loadHTML (response) {
		for (var i = 0; i < savedRecipesURI.length; i++) {
			if (i === 0 || i%3 === 0) {
				var newRow = $("<div class = row>");
				var newColumn = $("<div>");
				newColumn.addClass("col-xs-12 col-sm-4 col-md-4 col-lg-4");
				var imageURL = response.hits[i].recipe.image;
				var title = response.hits[i].recipe.label;
				var returnURL = response.hits[i].recipe.url;
				newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
				
				newRow.append(newColumn);
				$(".results").append(newRow);
			} else {
				var newColumn = $("<div>");
				newColumn.addClass("col-xs-12 col-sm-4 col-md-4 col-lg-4");
				var imageURL = response.hits[i].recipe.image;
				var title = response.hits[i].recipe.label;
				var returnURL = response.hits[i].recipe.url;
				newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
				
				$(".results .row:last-child").append(newColumn);
			}
		
		var newLoadRow = $("<div class = row>");
		var newLoadColumn = $("<div>");
		newLoadColumn.addClass("col-xs-12 col-sm-4 col-md-4 col-lg-4");
		var moreResultsButton = $("<button>");
		moreResultsButton.addClass("btn btn-primary");
		moreResultsButton.attr("id", "load-more-results");
		moreResultsButton.text("Show More Results");
		newLoadColumn.append(moreResultsButton);
		newLoadRow.append(newLoadColumn);
		$(".results").append(newLoadRow);
	}
*/
