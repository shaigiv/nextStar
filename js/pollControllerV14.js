var PollController = function() {
	//---------------------------------------------------------------------------------
	//singleton
	// https://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern
	//---------------------------------------------------------------------------------
	if ( arguments.callee._singletonInstance )
	    return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;
	var self=this;
	//---------------------------------------------------------------------------------
	//public function
	//---------------------------------------------------------------------------------
	self._init = function(){
		if(!self._callBackFunction) self._callBackFunction=function(data){$("body").append(data);};
		self._poll();
	};

	self._setCallBackFunction=function(func){
		self._callBackFunction=func;
	};

	self._setUrl=function(url){
		self._url=url;
	};


	//---------------------------------------------------------------------------------
	//private function
	//---------------------------------------------------------------------------------
	self._poll=function(){
        $.ajax({ 
           	url: self._url+"?V="+Date.now(), 
           	dataType: "json",
           	type: "GET",
           	timeout: self._timeOut,
           	success: function(json){
           		if (json.index!=self._index){
	           		self._index=json.index;
	           		if (self._callBackFunction) self._callBackFunction(json.data);
           		}
           	}
        });
        setTimeout(self._poll,self._timeOut);
	};
	//---------------------------------------------------------------------------------
	//private attribute
	//---------------------------------------------------------------------------------
	self._callBackFunction=null;
	self._index=-1;
	self._url='';
    self._timeOut=3000;
};