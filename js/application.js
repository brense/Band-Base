resize();
showDashboard();
$(window).resize(function(e){
	resize();
});

$('.filters-toggle').bind('click', function(e){
	e.preventDefault();
	if($('#filters').is(':visible')){
		$('#filters').fadeOut();
		resize();
	} else {
		resize(true);
		$('#filters').fadeIn();
	}
});

$('table.matrix a').bind('click', function(e){
	e.preventDefault();
	$('#popover').show();
});

$('.showMap').bind('click', function(e){
	e.preventDefault();
	if($('#popover').is(':visible'))
		$('#popover').hide();
});

$('.showDashboard').bind('click', function(e){showDashboard(e);});

function showDashboard(e){
	if(e != undefined)
		e.preventDefault();
	
	$('#popover .scroll-container > *').appendTo('.pages');
	$('#dashboardPage').appendTo('#popover .scroll-container');
	
	if(!$('#popover').is(':visible'))
		$('#popover').show();
}

$('.showSitrap').bind('click', function(e){
	e.preventDefault();
	
	$('#popover .scroll-container > *').appendTo('.pages');
	$('#sitrapPage').appendTo('#popover .scroll-container');
	
	if(!$('#popover').is(':visible'))
		$('#popover').show();
});

$('#activity-stream').bind('mouseenter', function(e){
	$('#activity-stream').css('opacity', '0.9');
});

$('#activity-stream').bind('mouseleave', function(e){
	$('#actvity-stream').css('opacity', '0.8');
});

$('#activity-stream > a:first-child').bind('click', function(e){
	e.preventDefault();
	$('#activity-stream').fadeOut();
	$('a.open-activity-stream').fadeIn();
});

$('a.open-activity-stream').bind('click', function(e){
	e.preventDefault();
	$('a.open-activity-stream').fadeOut();
	$('#activity-stream').fadeIn();
});

var map;
var lat = 52.523742;
var long = 5.466866;

var script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&libraries=visualization&callback=initializeMap";
document.body.appendChild(script);

function initializeMap() {
	var mapOptions = {
		zoom: 9,
		center: new google.maps.LatLng(lat, long),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	google.maps.event.addListener(map, 'click', function(e){
		if($('#popover').is(':visible'))
			$('#popover').fadeOut();
	});
}

function resize(filters){
	var top = $('.navbar').outerHeight(true);
	if(filters != undefined && filters == true)
		top += $('#filters').outerHeight(true);
	var height = $(document).outerHeight(true) - top;
	$('#popover').css('height', height + 'px');
	$('#popover').css('top', top + 'px');
	$('#activity-stream > a:first-child').css('margin-top', (top + 10) + 'px');
	$('a.open-activity-stream').css('top', top + 'px');
}

/* backbone classes */
var app;

var Application = AbstractApp.extend({
	routes: {
		"dashboard":"dashboard",
		"dashboard/:stream":"dashboard",
		"dashboard/:stream/:theme":"dashboard",
		"map/:stream":"map",
		"map/:stream/:theme":"map"
	},
	initialize: function(){
		this.views.navigation = new Navigation();
		this.views.dashboard = new Dashboard();
		
		this.ready(function(){
			console.log($('#template-navigation').length);
			console.log($('#template-dashboard').length);
			//this.views.navigation.render();
		});
	},
	dashboard: function(stream, theme){
		this.views.dashboard = new Dashboard();
		
		this.ready(function(){
			this.views.dashboard.render();
		});
	},
	map: function(stream, theme){
		
	}
});

var Navigation = AbstractView.extend({
	template: 'navigation'
});

var Dashboard = AbstractView.extend({
	template: 'dashboard'
});

$(function(){
	Backbone.history.start({pushState: true});
	app = new Application();
});