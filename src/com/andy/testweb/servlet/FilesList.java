package com.andy.testweb.servlet;

import java.io.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.andy.file.FileManager;
import com.andy.util.ApiResult;
import com.andy.util.ZipUtil;
import com.google.gson.Gson;

public class FilesList extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//    resp.getWriter().println("doGet is not available");
    //resp.getWriter().println(new Gson().toJson(getFileList()));
//    req.getRequestDispatcher("/page/FilesList.jsp").forward(req, resp);
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    
    String path = req.getParameter("path");
    
    List<File> filesList = getFileList(path);
    
    boolean getFilesListResult = (filesList != null);
    ApiResult result = new ApiResult(getFilesListResult, filesList);
    
    resp.setContentType("text/html; charset=UTF-8");
    resp.getWriter().println(new Gson().toJson(result));

    //resp.getWriter().println(new Gson().toJson(strs));
    //req.getRequestDispatcher("/page/FilesList.jsp").forward(req, resp);
    
  }

  private List<File> getFileList(String path) {
    
    List<File> filesResult = new ArrayList<File>();
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
      fileManager.getDirFilesByModifiedTimeRange(dir, startTimeMillis, endTimeMillis, filesResult);

      if (filesResult.size() <= 0) {
        System.out.println("there are no any files");
        return filesResult;
      }

    } catch (Exception exc) {
      exc.printStackTrace();
    }
    
    return filesResult;
  }
  
  private String[] getFileList(List<File> filesResult, FileManager fileManager) {
    String[] filePaths = new String[0];
    File file;
    filePaths = new String[filesResult.size()];
    for (int i = 0; i < filesResult.size(); i++) {
      // System.out.println("file : " + file.getPath());
      file = filesResult.get(i);
      filePaths[i] = file.getPath();
      fileManager.setPathWeights(file);
    }

    System.out.println("commonWeight : " + fileManager.getCommonWeight() + ", commonFile : " + fileManager.getCommonFile().getPath());
    System.out.println("filePaths Json : " + new Gson().toJson(filePaths));
    
    return filePaths;
  }
  
  private File getZipFile(List<File> filesList) {
    String workingDir = System.getProperty("user.dir");
    File tempZipFile = null;
    
    try {
    
      FileManager fileManager = new FileManager();
      String strTempFilePath = ".\\\\temp";
      
      File tempFile = new File(strTempFilePath);
      
      fileManager.deleteDirectory(tempFile);
      tempFile.mkdir();
      String commonFilePath = fileManager.getCommonFile().getPath().replaceAll("\\\\", "/");
      for (File fileTemp : filesList) {
  
        tempFile = new File(fileTemp.getParent().replaceAll("\\\\", "/").replaceFirst(commonFilePath, strTempFilePath).replaceAll("/", "\\\\"));
        tempFile.mkdirs();
        tempFile = new File(tempFile.getPath() + File.separator + fileTemp.getName());
        // // tempFile.createNewFile();
        fileManager.copyFile(fileTemp, tempFile);
      }
      
      tempZipFile = new File(workingDir + File.separator + "tempZip.zip");
      if (tempZipFile.exists()) {
        tempZipFile.delete();
      }
      
      ZipUtil.makeZip(fileManager.getCommonFile(), tempZipFile);
    } catch (Exception exc) {
      exc.printStackTrace();
    }
    
    return tempZipFile;
  }
}
