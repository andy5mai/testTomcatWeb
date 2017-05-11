class gen {
	
	constructor(root, stepCount, styleName) {
		var divStep = angular.element('<div></div>');
		divStep.attr("id", "step" + stepCount);
		divStep.attr("class", styleName);
		this.container = divStep;
		root.append(this.container);
	}
	
	static get type() { return { isUrl : "isUrl",
							     isParam : "isParam" }
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
	
	includeElement(text, funcObj) {
		var oriContainer = this.container;
		this.container = this.getNewSpanLine();
		this.genSpan(text);
		
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
	
	genSpan(text) {
		this.container.append(this.getNewSpan(text));
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
		
		this.includeElement(text, funcObj);
		
		return this;
	}
	/*
	genText(id, value) {
		this.container.append(angular.element('<input id="' + id + '" value="' + value + '"/>'));
		return this;
	}
	*/
	
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
					  
		this.includeElement(0, funcObj);
		
		return this;
	}
	
	genPostBtn(text, id, value, clickFunc) {
		var btn = angular.element('<button ng-click="' + clickFunc + '">' + value + '</button>');
		this.container.append(btn);
		return this;
	}
}