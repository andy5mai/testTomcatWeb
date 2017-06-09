package com.andy.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipUtil {
  
  public static void makeZip(File srcFile, File targetZip) throws IOException, FileNotFoundException {
    ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(targetZip));
    String dir = "";
    recurseFiles(srcFile, zos, dir);
    zos.close();
  }

  private static void recurseFiles(File file, ZipOutputStream zos, String dir) throws IOException, FileNotFoundException {
    // 目錄
    if (file.isDirectory()) {
      System.out.println("find directory : " + file.getName());
      dir += file.getName() + File.separator;
      String[] fileNames = file.list();
      if (fileNames != null) {
        for (int i = 0; i < fileNames.length; i++) {
          recurseFiles(new File(file, fileNames[i]), zos, dir);
        }
      }
    }
    // Otherwise, a file so add it as an entry to the Zip file.
    else {
      System.out.println("壓縮檔案:" + file.getName());

      byte[] buf = new byte[1024];
      int len;

      // Create a new Zip entry with the file's name.
      dir = dir.substring(dir.indexOf(File.separator) + 1);
      ZipEntry zipEntry = new ZipEntry(dir + file.getName());
      // Create a buffered input stream out of the file
      // we're trying to add into the Zip archive.
      FileInputStream fin = new FileInputStream(file);
      BufferedInputStream in = new BufferedInputStream(fin);
      zos.putNextEntry(zipEntry);
      // Read bytes from the file and write into the Zip archive.

      while ((len = in.read(buf)) >= 0) {
        zos.write(buf, 0, len);
      }

      // Close the input stream.
      in.close();

      // Close this entry in the Zip stream.
      zos.closeEntry();
    }
  }

}
