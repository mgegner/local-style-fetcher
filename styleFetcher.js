var styleFetcher = styleFetcher || (function() {
	
	var _args = {
		/* Configuration */
		styleURL: "https://raw.githubusercontent.com/mgegner/local-style-fetcher/master/example-style.css",
		removeStylesOnStart: true,
		updateLinkTagsOnStart: true,
		reloadStyleTime: 2000,
	};
	var oldTimestamp = (new Date()).getTime();
	var timeStamp = (new Date()).getTime();
	
	return {
		
		removeStyle: function() {
			removeStyles = function(el) {
				el.removeAttribute('style'); 
				if(el.childNodes.length > 0){
					for(var child in el.childNodes){
						if(el.childNodes[child].nodeType == 1){
							removeStyles(el.childNodes[child]);
						}
					}
				}
			};
			removeStyles(document.body);
			for(var i = 0; i < document.styleSheets.length; i++){ 
				document.styleSheets[i].disabled = true;
			}
		},
		
		updateLinkTags: function() {
			var head = document.getElementsByTagName("head")[0];
			var links = head.getElementsByTagName("link");
			var i = 0;
			while(i < links.length) {
				if(links[i].nodeType == 1 && links[i].rel == "stylesheet") {
					head.removeChild(links[i]);
				} else {
					i++;
				}
			};
			this.timeStamp = (new Date()).getTime();
			var newStyle = document.createElement("link");
			newStyle.type = "text/css";
			newStyle.rel = "stylesheet";
			newStyle.id = "newStyle-"+this.timeStamp;
			newStyle.href = _args.styleURL + "?time=" + this.timeStamp;
			document.getElementsByTagName("head")[0].appendChild(newStyle);
		},
		
		reloadNewStyle: function() {
			this.oldTimestamp = this.timeStamp;
			this.timeStamp = (new Date()).getTime();
			var newStyle = document.createElement("link");
			newStyle.type = "text/css";
			newStyle.rel = "stylesheet";
			newStyle.id = "newStyle-" + this.timeStamp;
			newStyle.href = _args.styleURL + "?time=" + this.timeStamp;
			document.getElementsByTagName("head")[0].appendChild(newStyle);
			setTimeout(function() {
				links = document.getElementsByTagName("head")[0].getElementsByTagName("link");
				for(var i = 0; i < links.length; i++) {
					if(links[i].nodeType == 1 && links[i].id == "newStyle-"+this.oldTimestamp) {
						document.getElementsByTagName("head")[0].removeChild(links[i]);
						i = 1000;
					}
				}
			}, 1000);
		},
		
		init: function(Args) {
			if(!!Args) {
				if(Args.styleURL) { _args.styleURL = Args.styleURL; }
				if(Args.removeStylesOnStart) { _args.removeStylesOnStart = Args.removeStylesOnStart; }
				if(Args.updateLinkTagsOnStart) { _args.updateLinkTagsOnStart = Args.updateLinkTagsOnStart; }
				if(Args.reloadStyleTime) { _args.reloadStyleTime = Args.reloadStyleTime; }
			}
			
			if(!!_args.removeStylesOnStart) {
				this.removeStyle();
			}
			if(!!_args.updateLinkTagsOnStart) {
				this.updateLinkTags();
			}
			if(_args.reloadStyleTime > 0) {
				setInterval(this.reloadNewStyle, _args.reloadStyleTime);
			} else {
				this.reloadNewStyle();
			}
		}
		
	};
	
})();