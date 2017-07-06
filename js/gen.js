class gen {
	
	constructor(root, stepCount, styleName) {
		var divStep = angular.element('<div></div>');
		divStep.attr("id", "step" + stepCount);
		divStep.attr("class", styleName);
		this.container = divStep;
		root.append(this.container);
	}
	
	static get type() { return { isUrl : "isUrl",
							                                    isParam : "isParam",
							                                    isParamsArray : "isParamsArray"}
	}
	
	static set http($http) {
	  this.$http = $http;
	}
	
	getNewP() {
		return angular.element('<p></p>');
	}
	
	getNewSpan(text, clazz) {
	  
	  var element = angular.element('<span></span>');
	  
	  if (text != null) {
	    element.text(text);
	  }
	  
	  if (clazz != null) {
	    element.addClass(clazz);
	  }
	  
		return element
	}
	
	genNewSpan(text, clazz) {
	  this.container.append(this.getNewSpan(text, clazz));
	  return this;
	}
	
	includeTextSpan(text, funcObj, ) {
		
	  var blockSpan = this.getNewSpan(null, 'block');
	  
	  var funcObjContainer = this.getNewSpan(null, null);
    funcObj.exec(funcObjContainer);
    
    blockSpan.append(this.getNewSpan(text, null));
    blockSpan.append(funcObjContainer);
	  
		this.container.append(blockSpan);
	}
	
	genP(id) {
		if (id != undefined) {
			this.container.append(angular.element('<p id="' + id + '"></p>'));
		} else {
			this.container.append(angular.element('<p></p>'));
		}
		return this;
	}
	
	genText(text, id, value, type, className) {
		
		var funcObj = { id : id,
						value : value,
						type : type,
						className : className,
						exec : function(container) {
							var input = angular.element('<input type="text"></input>');
							input.attr("id", this.id);
							input.attr("value", this.value);
							if (this.className != null) input.attr("class", this.className);
							if (this.type != null) input.attr(this.type, true);
							
							container.append(input);
					  }};
		
		this.includeTextSpan(text, funcObj);
		
		return this;
	}
	/*
	genText(id, value) {
		this.container.append(angular.element('<input id="' + id + '" value="' + value + '"/>'));
		return this;
	}
	*/
	
	genLink(spanText, text, id, href, type, className) {
    
    var funcObj = { id : id,
            href : href,
            type : type,
            className : className,
            exec : function(container) {
              var input = angular.element('<a></a>');
              input.attr("id", this.id);
              input.attr("href", this.href);
              input.text(text);
              if (this.className != null) input.attr("class", this.className);
              if (this.type != null) input.attr(this.type, true);
              
              container.append(input);
            }};
    
    this.includeTextSpan(spanText, funcObj);
    
    return this;
  }
  
	genCheckBox(text, id, options, values, defaultValues, type, className) {
		
		var funcObj = { id : id,
			options : options,
			values : values,
			defaultValues: defaultValues,
			type : type,
			className : className,
			exec : function(container) {
				var checkboxElements = [options.length];
				var labels = [options.length];
				
				for(var i = 0; i < options.length; i++) {
					checkboxElements[i] = angular.element('<input type="checkbox" />');
					checkboxElements[i].attr("id", this.id);
					checkboxElements[i].attr("name", this.id);
					checkboxElements[i].text(options[i]);
					checkboxElements[i].attr("value", this.values[i]);
					labels[i] = angular.element('<label></label>');
					labels[i].text(options[i]);
					if (this.className != null)checkboxElements[i].attr("class", this.className);
					if (this.type != null)checkboxElements[i].attr(this.type, true);
				
					for(var j = 0; j < defaultValues.length; j++) {
						if (this.values[i] === defaultValues[j]) {
							checkboxElements[i].attr("checked", "");
							break;
						}
					}
				}
				
				
				for(var k = 0; k < options.length; k++) {
					container.append(checkboxElements[k]);
					container.append(labels[k]);
				}
				//angular.element('#cb1').next('label').text()
			}
		}
						  
		this.includeTextSpan(text, funcObj);
		return this;
	}
	
	genSelect(text, id, options, values, defaultValue, type, className) {
		
		var funcObj = { id : id,
						options : options,
						values : values,
						defaultValue : defaultValue,
						type : type,
						className : className,
						exec : function(container) {
							var selectElement = angular.element('<select></select>');
							selectElement.attr("id", this.id);
							if (this.className != null) selectElement.attr("class", this.className);
              if (this.type != null) selectElement.attr(this.type, true);
							if (options != null && values != null) {
								var optionElement;
								for(var i = 0; i < options.length; i++) {
									optionElement = angular.element('<option>' + options[i] + '</option>');
									optionElement.attr("value", values[i]);
									if (defaultValue == values[i])  optionElement.attr("selected", "");
									selectElement.append(optionElement);
								}
								
								
							}
							
							container.append(selectElement);
						}
		}
					  
		this.includeTextSpan(text, funcObj);
		
		return this;
	}
	
	genClickBtn(text, id, value, clickFunc) {
		var btn = angular.element('<button ng-click="' + clickFunc + '">' + value + '</button>');
		this.container.append(btn);
		return this;
	}
	
	genAddElmtBtn(text, id, value, clickFunc) {
	  
	  var lastSpan = this.container.children()[this.container.children().length - 1];
	  var addElmtBtn = angular.element('<button ng-click="' + clickFunc + '">' + value + '</button>');
	  var addElmtBtnSpan = this.getNewSpan(null, null);
	  addElmtBtnSpan.append(addElmtBtn);
	  
	  $(lastSpan).append(addElmtBtnSpan);
	  
	  return this;
	}
	
	genTextArea(text, id, value, type, className) {
		
		var funcObj = { id : id,
						value : value,
						type : type,
						className : className,
						exec : function(container) {
							var textarea = angular.element('<textarea></textarea>');
							textarea.attr("id", this.id);
							textarea.text(this.value);
							if (this.className != null) textarea.attr("class", this.className);
							if (this.type != null) textarea.attr(this.type, true);
							
							container.append(textarea);
					  }};
		
		this.includeTextSpan(text, funcObj);
		
		return this;
	}
	
	static addElmtBtn($event) {
	  var preElement = $($event.target.parentElement).prev()[0];
	  var oriElement = preElement.children[0];
	  $(preElement).append($(oriElement).clone());
	}
	
	static ajaxSend($event) {
	  var divStep = angular.element($event.currentTarget).parent();
    var urlElement = divStep.find('input[' + gen.type.isUrl + ']').get();
    var sendUrl = urlElement[0].value;
    var paramsElement = divStep.find('[' + gen.type.isParam + ']').get();
    var paramsArrayElement = divStep.find('[' + gen.type.isParamsArray + ']').get();
    var sendParams = {};
    var paramElement;
    for(var index in paramsElement) {
        paramElement = paramsElement[index];
        if (paramElement.type == 'checkbox') {
          sendParams[paramElement.id] = $(paramElement).prop('checked');
          continue;
        }
        sendParams[paramElement.id] = paramElement.value;
    }
    
    for(var index in paramsArrayElement) {
      paramElement = paramsArrayElement[index];
      
      if (sendParams[paramElement.id] == null) {
        sendParams[paramElement.id] = '';
      }
      
      if (paramElement.value === null || paramElement.value === "") {
        continue;
      }
      
      if (sendParams[paramElement.id] != '') {
        sendParams[paramElement.id] = sendParams[paramElement.id] + ',';
      }
      sendParams[paramElement.id] = sendParams[paramElement.id] + paramElement.value;
    }
    
    var result;
    var oldResult = divStep.find('textarea[id=result]').get();
    if (oldResult.length > 0) {
      for (var i = 0; i < oldResult.length; i++) {
        oldResult[i].remove();
      }
    }
    
    result = angular.element("<textarea></textarea>");
    result.attr("id", "result");
    result.addClass("result");
    
    gen.$http({
        method : "POST",
        url : sendUrl,
        params : sendParams,
    }).then(function mySucces(response) {
        result.html(JSON.stringify(response.data));
        divStep.append(result);
    }, function myError(response) {
        console.log(response.statusText);
        result.html(JSON.stringify(response.data));
        divStep.append(result);
    });
	}
}