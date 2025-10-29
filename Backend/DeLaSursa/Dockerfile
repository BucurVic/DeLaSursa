# === Stage 1: Build the Spring Boot app ===
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy Gradle files and pre-fetch dependencies (for caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
RUN ./gradlew dependencies --no-daemon || true

# Copy source and build
COPY src src
RUN ./gradlew bootJar -x test --no-daemon

# === Stage 2: Run the application ===
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]