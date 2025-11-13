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
COPY uploads /app/uploads


# Copy source and build jar
COPY src src
RUN ./gradlew bootJar -x test --no-daemon

# === Stage 2: Run the app ===
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/build/libs/*.jar app.jar
COPY --from=build /app/uploads /app/uploads


EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
