package com.opentext.ts.common;

import com.opentext.ls.core.common.UOBBaseConstants;

public class replacetest {
	 public static void main(String[] args) {
	String areavpath = "//iwfvm06039/default/main/component-guide/WORKAREA/shared";
	String seperator = "/";
	areavpath = areavpath.substring(areavpath.indexOf(seperator+seperator)+2,(areavpath.length()));	
	areavpath = areavpath.replaceFirst(areavpath.substring(0, areavpath.indexOf(seperator)), "/iwmnt") ;
	System.out.println("areavpath"+areavpath);
	 }

}
