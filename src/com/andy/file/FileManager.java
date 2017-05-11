package com.andy.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileManager {

  protected ArrayList<File> listDir = new ArrayList<File>();
  protected Map<String, Integer> mapPathWeights = new HashMap<String, Integer>();
  protected int commonWeight;
  protected File commonFile;
  private DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

  public FileManager() {

  }

  public DateFormat getDateFormat() {
    return this.dateFormat;
  }

  public int getCommonWeight() {
    return this.commonWeight;
  }

  public File getCommonFile() {
    return this.commonFile;
  }

  public void clearResult() {
    this.mapPathWeights.clear();
    this.commonWeight = 0;
    this.commonFile = null;
  }

  public void searchDirFilesByModifiedTimeRange(File fileDir, long startTime, long endTime, List<File> filesResult) {

    if (fileDir.isDirectory() && fileDir.getPath().contains("git")) {
      return;
    }

    File[] files = fileDir.listFiles();

    if (files == null || files.length == 0) {
      return;
    }

    for (File file : files) {
      if (file.isDirectory()) {
        this.searchDirFilesByModifiedTimeRange(file, startTime, endTime, filesResult);
      } else if (file.lastModified() >= startTime && file.lastModified() <= endTime) {
        filesResult.add(file);
      }
    }
  }

  public void setPathWeights(File file) {

    String filePath = file.getParent();
    if (filePath == null || filePath.isEmpty())
      return;

    Integer nWeight = this.mapPathWeights.get(filePath);
    if (nWeight == null) {
      nWeight = 0;
    }

    nWeight++;

    if (nWeight > this.commonWeight) {
      this.commonWeight = nWeight;
      this.commonFile = file.getParentFile();
    }

    this.mapPathWeights.put(filePath, nWeight);

    this.setPathWeights(file.getParentFile());
  }

  public void copyFile(File source, File dest) throws Exception {
    InputStream input = null;
    OutputStream output = null;
    try {
      input = new FileInputStream(source);
      output = new FileOutputStream(dest);
      byte[] buf = new byte[1024];
      int bytesRead;
      while ((bytesRead = input.read(buf)) > 0) {
        output.write(buf, 0, bytesRead);
      }
    } finally {
      input.close();
      output.close();
    }
  }

  public boolean deleteDirectory(File directory) {
    if (directory.exists()) {
      File[] files = directory.listFiles();
      if (null != files) {
        for (int i = 0; i < files.length; i++) {
          if (files[i].isDirectory()) {
            this.deleteDirectory(files[i]);
          } else {
            files[i].delete();
          }
        }
      }
    }
    return (directory.delete());
  }
}
