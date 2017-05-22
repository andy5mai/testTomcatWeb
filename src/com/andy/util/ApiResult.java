package com.andy.util;

public class ApiResult {

  private boolean result = false;
  private Object  data = null;
  
  public ApiResult(boolean result, Object data) {
    this.result = result;
    this.data = data;
    
  }
  
  public boolean getResult() {
    return this.result;
  }
  
  public Object getData() {
    return this.data;
  }
}
