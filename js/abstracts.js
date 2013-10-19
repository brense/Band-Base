var AbstractApp = Backbone.Router.extend({
	views: {},
	readyCallback: null,
	triggerTemplatesLoaded: function(){
		var done = true;
		for(var view in this.views){
			if($('#template-' + this.views[view].template).length < 1)
				done = false;
		}
		if(done)
			this.readyCallback();
	},
	ready: function(callback){
		this.readyCallback = callback;
	}
});

var AbstractView = Backbone.View.extend({
	initialize: function(){
		if($('#template-' + this.template).length < 1){
			var template = this.template;
			$.get('tpl/' + template + '.tpl', function(html){
				$('body').append('<script id="template-' + template + '" type="text/mustache-template">' + html + '</script>');
				app.triggerTemplatesLoaded();
			});
		}
	},
	render: function(){
		this.$el.html(Mustache.render("<template>", this));
		return this;
	}
});