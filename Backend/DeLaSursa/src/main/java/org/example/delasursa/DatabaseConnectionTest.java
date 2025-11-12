package org.example.delasursa;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DatabaseConnectionTest implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseConnectionTest(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {

            Integer result = jdbcTemplate.queryForObject("SELECT count(*) from useri", Integer.class);
            System.out.println("✅ Database connection successful! Query result: " + result);
        } catch (Exception e) {
            System.err.println("❌ Database connection failed:");
            e.printStackTrace();
        }
    }
}
