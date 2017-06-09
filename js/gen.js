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
	
	getNewP() {
		return angular.element('<p></p>');
	}
	
	getNewSpanLine() {
		return angular.element('<span class="block"></span>');
	}
	
	getNewSpan(text) {
		return angular.element('<span>' + text + '</span>');
	}
	
	includeTextSpan(text, funcObj) {
		var oriContainer = this.container;
		this.container = this.getNewSpanLine();
		if (text == null) {
		  this.genSpan();
		} else {
		  this.genTextSpan(text);
		}
		
		funcObj.exec(this.container);
		
		oriContainer.append(this.container);
		this.container = oriContainer;
	}
	
	genP(id) {
		if (id != undefined) {
			this.container.append(angular.element('<p id="' + id + '"></p>'));
		} else {
			this.container.append(angular.element('<p></p>'));
		}
		return this;
	}
	
	genTextSpan(text) {
	  var spanElement = this.genSpan();
		spanElement.text(text);
		
		return this;
	}
	
	genSpan() {
	  var spanElement = angular.element('<span></span>');
	  this.container.append(spanElement);
	  
	  return spanElement;
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
	  
	  var funcObj = {
	      id : id,
        value : value,
        clickFunc : clickFunc,
        exec : function(container) {
          var btn = angular.element('<button ng-click="' + clickFunc + '">' + value + '</button>');
          
          container.append(btn);
        }
	  }
        
	  this.includeTextSpan(text, funcObj);
	  
    return this;
  }
	
	static addElmtBtn($event) {
	  console.log($event);
	}
}