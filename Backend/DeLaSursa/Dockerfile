# === Stage 1: Build the Spring Boot app ===
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy Gradle wrapper and config
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Make gradlew executable
RUN chmod +x gradlew

# Pre-download dependencies
RUN ./gradlew dependencies --no-daemon || true

# Copy sourse images
RUN mkdir -p /app/uploads && chmod -R 755 /app/uploads


CMD ["./gradlew", "bootRun", "--no-daemon"]
