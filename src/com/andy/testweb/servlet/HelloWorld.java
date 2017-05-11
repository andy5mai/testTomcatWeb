package com.andy.testweb.servlet;

import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.http.*;

public class HelloWorld extends HttpServlet{

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
                      throws ServletException, IOException {
      resp.getWriter().println("Hello, World");
  }
  
}
