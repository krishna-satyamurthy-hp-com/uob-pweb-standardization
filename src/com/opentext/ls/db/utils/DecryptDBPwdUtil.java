package com.opentext.ls.db.utils;

import com.interwoven.livesite.common.io.FileUtil;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

public class DecryptDBPwdUtil {
  private File mKeyPropsFile = null;
  private String mPassword = null;
  
  public void setKeyPropsFile(File keyProps)
  {
    this.mKeyPropsFile = keyProps;
  }
  
  public File getKeyPropsFile()
  {
    return this.mKeyPropsFile;
  }
  
  public void setPassword(String pw)
  {
    this.mPassword = pw;
  }
  
  public String getPassword()
  {
    return this.mPassword;
  }
  
  public void execute()	{
    try
    {
      Properties props = new Properties();
      
      FileInputStream fis = new FileInputStream(this.mKeyPropsFile);
      props.load(fis);
      fis.close();
      
      File keyFile = new File(props.getProperty("loc"));
      if (keyFile.isFile())
      {
        String key = FileUtil.readText(keyFile);
        
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword(key);
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.initialize();
        
        System.out.println(encryptor.encrypt(this.mPassword));
      }
      else
      {
        System.out.println("Cannot find key");
      }
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
  }
  
  
  protected String decrypt()	{
	  String decPwd = "";    
	  try
	    {
	      Properties props = new Properties();
	      
	      FileInputStream fis = new FileInputStream(this.mKeyPropsFile);
	      props.load(fis);
	      fis.close();
	      
	      File keyFile = new File(props.getProperty("loc"));
	      if (keyFile.isFile())
	      {
	        String key = FileUtil.readText(keyFile);
	        
	        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
	        encryptor.setPassword(key);
	        encryptor.setAlgorithm("PBEWithMD5AndDES");
	        encryptor.initialize();
	        
	        decPwd = encryptor.decrypt(this.mPassword);
	      }
	      else
	      {
	        System.out.println("Cannot find key");
	      }
	    }
	    catch (Exception e)
	    {
	      e.printStackTrace();
	    }
	  return decPwd;
	  }
}

