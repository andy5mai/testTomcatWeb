package com.andy.testweb.servlet;

import java.io.*;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.andy.file.FileManager;
import com.andy.file.FileObj;
import com.andy.util.ApiResult;
import com.andy.util.FileNameFilter;
import com.andy.util.ZipUtil;
import com.google.gson.Gson;

public class CompressFiles extends BaseServlet {
  
  protected FileManager fileManager;
  
  public CompressFiles(HttpServlet httpServlet) {
    super(httpServlet);
  }
  
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("FilesList doGet...");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    Map paramMap = req.getParameterMap();
    String[] selectedFilePaths = (String[])paramMap.get("selectedFilePaths");

    String commonDirPath = req.getParameter("commonDirPath");
    this.fileManager = new FileManager();
    File[] files;
    if (commonDirPath != null && commonDirPath.isEmpty() != true) {
      files = this.fileManager.setCommonFile(selectedFilePaths, commonDirPath);
    } else {
      files = this.setPathWeightsByFileList(selectedFilePaths);
    }
    
    ApiResult result;
    if (files == null) {
      result = new ApiResult(false, "get files failed!");
    } else {
      File zipFile = this.getZipFile(files);
      boolean zipFileResult = (zipFile != null);
      URL url = new URL(req.getRequestURL().toString());
      String downloadUrl;
      String portString = "";
      if (url.getPort() != 80) {
        portString = ":" + url.getPort();
      }
      
      downloadUrl = url.getProtocol() + "://" + url.getHost() + portString+ "//download//" + zipFile.getName();
      result = new ApiResult(zipFileResult, downloadUrl);
    }
    
    resp.setContentType("text/html; charset=UTF-8");
    resp.getWriter().println(new Gson().toJson(result));

    //resp.getWriter().println(new Gson().toJson(strs));
    //req.getRequestDispatcher("/page/FilesList.jsp").forward(req, resp);
    
  }

  private List<FileObj> getFileList(String path) {
    
    List<FileObj> filesResult = new ArrayList<FileObj>();
    try {
      
      File dir = new File(path);

      if (dir.exists() == false) return null;
      
      FileManager fileManager = new FileManager();
      
//      Calendar startTime = Calendar.getInstance();
//      Calendar endTime = Calendar.getInstance();
//      startTime.add(Calendar.MINUTE, -60 * 24 * 2);
//      System.out.println(fileManager.getDateFormat().format(startTime.getTime()));

      long startTimeMillis = 0;
      long endTimeMillis = 0;
//      fileManager.searchDirFilesByModifiedTimeRange(dir, startTimeMillis, endTimeMillis, filesResult);
      
      FileNameFilter fileNameFilter = new FileNameFilter(null, false);
      
      fileManager.getDirFilesByModifiedTimeRange(dir, fileNameFilter, startTimeMillis, endTimeMillis, filesResult);

      if (filesResult.size() <= 0) {
        System.out.println("there are no any files");
        return filesResult;
      }

    } catch (Exception exc) {
      exc.printStackTrace();
    }
    
    return filesResult;
  }
  
//  private String[] setPathWeightsByFileList(List<File> filesResult, FileManager fileManager) {
//    String[] filePaths = new String[0];
//    File file;
//    filePaths = new String[filesResult.size()];
//    for (int i = 0; i < filesResult.size(); i++) {
//      // System.out.println("file : " + file.getPath());
//      file = filesResult.get(i);
//      filePaths[i] = file.getPath();
//      fileManager.setPathWeights(file);
//    }
//
//    System.out.println("commonWeight : " + fileManager.getCommonWeight() + ", commonFile : " + fileManager.getCommonFile().getPath());
//    System.out.println("filePaths Json : " + new Gson().toJson(filePaths));
//    
//    return filePaths;
//  }
  
  private File[] setPathWeightsByFileList(String[] filePaths) {
    
    File[] files = new File[filePaths.length];
    for (int i = 0; i < filePaths.length; i++) {
      files[i] = new File(filePaths[i]);
      this.fileManager.setPathWeights(files[i]);
    }

    System.out.println("commonWeight : " + fileManager.getCommonWeight() + ", commonFile : " + fileManager.getCommonFile().getPath());
    System.out.println("filePaths Json : " + new Gson().toJson(filePaths));
    
    return files;
  }
  
  private File getZipFile(File[] files) {
    String downloadDir = this.httpServlet.getServletContext().getRealPath(File.separator + "download");
    File tempZipFile = null;
    
    try {
    
      String strTempDirPath = ".\\\\temp\\\\";
      
      File tempDir = new File(strTempDirPath);
      File tempFile;
      this.fileManager.deleteDirectory(tempDir);
      tempDir.mkdir();
      String commonFilePath = this.fileManager.getCommonFile().getPath().replaceAll("\\\\", "/");
      for (File fileTemp : files) {
  
        tempFile = new File(fileTemp.getParent().replaceAll("\\\\", "/").replaceFirst(commonFilePath, strTempDirPath).replaceAll("/", "\\\\"));
        tempFile.mkdirs();
        tempFile = new File(tempFile.getPath() + File.separator + fileTemp.getName());
        // // tempFile.createNewFile();
        this.fileManager.copyFile(fileTemp, tempFile);
      }
      
      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
      tempZipFile = new File(downloadDir + File.separator + dateFormat.format(Calendar.getInstance().getTime()) + ".zip");
      if (tempZipFile.exists()) {
        tempZipFile.delete();
      }
      
      ZipUtil.makeZip(tempDir, tempZipFile);
    } catch (Exception exc) {
      tempZipFile = null;
      exc.printStackTrace();
    }
    
    return tempZipFile;
  }
}
