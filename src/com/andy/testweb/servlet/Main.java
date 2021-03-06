package com.andy.testweb.servlet;

import java.io.*;
import java.util.GregorianCalendar;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class Main extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//    resp.getWriter().println("doGet is not available");
    //resp.getWriter().println(new Gson().toJson(getFileList()));
    
    String[] uris = req.getPathInfo().split("/");
    
    if (uris[1].equals("api")) {
      System.out.println("Main api should not use doGet...");
    } else if (uris[1].equals("page")) {
      req.getRequestDispatcher("/" + uris[1] + "/" + uris[2] + ".jsp").include(req, resp);
    } else {
      req.getRequestDispatcher(req.getPathInfo()).include(req, resp);
    }
    
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    
    String[] uris = req.getPathInfo().split("/");
    
    if (uris[1].equals("api") && uris.length >= 3) {
      if (uris[2].equals("fileslist")) {
        new FilesList(this).doPost(req, resp);
      } else if (uris[2].equals("compressfiles")) {
        new CompressFiles(this).doPost(req, resp);
      }
      
      return;
    }
    
    System.out.println("Main.java doPost..." + new GregorianCalendar().getTimeInMillis());
    
  }
}
