package com.opentext.ls.db.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jndi.JndiTemplate;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


import javax.naming.NamingException;
import javax.sql.DataSource;
@Configuration
@EnableTransactionManagement
public class DataSourceConfig {
	private static final Log LOGGER = LogFactory.getLog(DataSourceConfig.class);
    //private String jndiName="wsmportal";
	private String jndiName="wsm";
    @Bean
    public JdbcTemplate jdbcTemplate() throws NamingException {
        return new JdbcTemplate(dataSource());
    }
    public DataSource dataSource() {
        try {
            LOGGER.info("jndi-name: " + jndiName);
            JndiTemplate jndiTemplate = new JndiTemplate();
            return (DataSource) jndiTemplate.lookup(jndiName);
        } catch (NamingException e) {
        	LOGGER.error("Unable to retrive the database connection from JNDI"+e.getCause());
			LOGGER.info("Unable to retrive the database connection from JNDI" + e.getExplanation());
			return null;
        }
    }
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
}
