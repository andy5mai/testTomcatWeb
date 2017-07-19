package com.andy.testweb.servlet;

import javax.servlet.http.HttpServlet;

public class BaseServlet extends HttpServlet {
  protected HttpServlet httpServlet;
  
  public BaseServlet(HttpServlet httpServlet) {
    this.httpServlet = httpServlet;
  }

}
