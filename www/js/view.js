// controlled by index.js

var view = {

	initialize: function(){
		this.$form = $('#connected');
		this.$connect = $('#connect');
		this.allViews = [this.$form, this.$connect];
		this.currentPage = this.$connect;
		this.show(this.currentPage);
	},

	onConnection: function(){
		if(view.currentPage !== view.$form){
			view.show(view.$form);
		}
	},

	onConnectionInterrupt: function(){
		if(view.currentPage !== view.$connect){
			view.show(view.$connect);
		}
	},

	hide: function($el){
		$el.css({
			'display': 'none'
		});
	},

	show: function($el){
		for(var i = 0; i < view.allViews.length; i++){
			view.hide(view.allViews[i]);
		}
		$el.css({
			'display': 'block'
		});
	}

};