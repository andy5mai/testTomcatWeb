package com.andy.util;

import java.io.File;
import java.io.FilenameFilter;

public class FileNameFilter implements FilenameFilter {
  
  private String searchedFileName;
  private boolean noFilter = false;
  private boolean isWholeWord = false;
  
  public FileNameFilter(String searchedFileName, boolean isWholeWord) {
    
    this.searchedFileName = searchedFileName;
    
    if (this.searchedFileName == null || this.searchedFileName.isEmpty() == true) {
      this.noFilter = true;
    }
    
    this.isWholeWord = isWholeWord;
  }

  @Override
  public boolean accept(File dir, String fileName) {
    
    if (this.noFilter == true) return true;
    
    if (this.isWholeWord == true) {
      return fileName.equals(this.searchedFileName);
    }
    
    return fileName.contains(this.searchedFileName);
  }

}
