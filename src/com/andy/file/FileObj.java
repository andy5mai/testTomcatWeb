package com.andy.file;

import java.io.File;

public class FileObj {
  
//  protected transient File file;
  public String path;
  
  public boolean isDir;
  
  public boolean isParentDir;
  
  public FileObj(File file) {
//    this.file = file;
    this.path = file.getPath();
    this.isDir = file.isDirectory();
  }
  
  public FileObj(File file, boolean isParentDir) {
    this(file);
    this.isParentDir = isParentDir;
  }
  
//  public void setFile(File file) {
//    this.file = file;
//  }
//  
//  public File getFile() {
//    return this.file;
//  }
  
  public String getFilePath() {
//    if (file != null) return this.file.getPath();
    
    return this.path;
  }
  
  public boolean getIsDir() {
    return this.isDir;
  }

}
