package com.andy.util;

public class MapUtil {
  
  public static <T> T getParamValue(Object obj, T clazz) {
    
    if (obj == null || !(obj.getClass().isAssignableFrom(clazz.getClass()))) return null;
    
    return clazz;
  }

}
