package com.opentext.ls.db;

public interface DBIntializer {
//String DRIVER="com.microsoft.sqlserver.jdbc.SQLServerDriver";
//String CON_STRING="jdbc:sqlserver://localhost;user=sa;password=.20admin!;database=KapilDB";
/*String USERNAME="sa";
String PASSWORD="compaq1-2";
String DATABASE_NAME="KapilDB";*/

String DRIVER="com.mysql.jdbc.Driver";
String CON_STRING="jdbc:mysql://localhost:3306;user=root;password=1nterw0ven;database=wcm";

//String DRIVER="com.microsoft.sqlserver.jdbc.SQLServerDriver";
//String CON_STRING="jdbc:sqlserver://SVRT00007687.tus.ams1907.com\\D001:49501;user=WEMS_User;password=WEMSdev@2015!;database=D197LSDS0";

}