package com.opentext.ls.db;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jndi.JndiTemplate;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.opentext.ls.core.display.external.BannerListing;

import javax.naming.NamingException;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DataSourceConfig {

	private static final Log LOGGER = LogFactory.getLog(BannerListing.class);

    @Value("${datasource.jndi-name}")
    private String jndiName;

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
            LOGGER.info("For dev --> datasource.url = jdbc:postgresql:uob_fundselector");
            org.apache.tomcat.jdbc.pool.DataSource dataSource = new org.apache.tomcat.jdbc.pool.DataSource();
            dataSource.setUrl("jdbc:mysql://KAPAILJ1CS4LC2:3306/wcm");
            dataSource.setDriverClassName("com.mysql.jdbc.Driver");
            dataSource.setUsername("root");
            dataSource.setPassword("1nterw0ven");
            dataSource.setMaxActive(100);
            dataSource.setMaxIdle(8);
            dataSource.setMinIdle(8);
            dataSource.setInitialSize(10);
            return dataSource;
        }
    }
    
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
}