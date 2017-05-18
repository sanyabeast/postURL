'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(true);
    } else {
    	var PostURL = factory();
    	window.postURL = new PostURL();
    }
}(this, function(){

   	var PostURL = function(){
   		window.addEventListener('hashchange', function(){
   			if (this.onMessage){
   				this.onMessage(this.read());
   			}
   		}.bind(this));

      this.write('');

   	};

   	PostURL.prototype = {
   		splitter : '>>',
   		onMessage : null,
   		write : function(action, data){
   			var message = this.pack(action, data);

   			if (!message){
   				return false;
   			} else {
   				this.add2URL(message);
   				return message;
   			}
   		},
   		read : function(){
   			var href = window.location.href;
   			var message = this.unpack(href);

   			return message;
   		},
   		add2URL : function(data){
   			window.open('#' + data, '_self');
   		},
   		unpack : function(data){
   			if (data.indexOf('#') < 0){
   				return false;
   			} else {
   				var raw = data.split('#')[1];
   				
   				if (raw.indexOf(this.splitter) < 0){
   					return raw;
   				} else {
   					raw = raw.split(this.splitter);

   					try {
   						return {
	   						action : raw[0],
	   						data : JSON.parse(raw[1])
	   					}
   					} catch (err){
   						console.warn(err);
   					}

   				}

   			}
   		},
   		pack : function(action, data){
   			try {
   				var result = '';

	   			if (typeof data == 'undefined'){
	   				result = result + action;
	   			} else {
	   				result = result + action + this.splitter + (typeof data == 'string' ? data : JSON.stringify(data));
	   			}

	   			return result;
   			} catch (err){
   				console.warn(err);
   			}
   		}
   	};

   	return PostURL;

}));