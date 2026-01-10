package org.example.delasursa.service.implementations;


import lombok.extern.slf4j.Slf4j;
import org.example.delasursa.common.dto.enums.ImageCategory;
import org.example.delasursa.common.exceptions.ImageStorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
public class ImageStoreService {

    @Value("${app.upload.dir:/uploads/}")
    private String baseUploadDir;

    @Value("${app.upload.uri:/uploads/}")
    private String baseUploadUri;

    public  String saveImage(MultipartFile file, Integer ownerId, ImageCategory category) {
        if (file == null || file.isEmpty()) {
            throw new ImageStorageException("Imaginea este goală sau lipsă");
        }

        String originalFilename = Path.of(file.getOriginalFilename()).getFileName().toString();
        String extension = getExtension(originalFilename);
        String uniqueName = UUID.randomUUID() + (extension.isEmpty() ? "" : "." + extension);

        Path uploadDir = Paths.get(baseUploadDir, category.getFolderName(),String.valueOf(ownerId));

        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
                log.info("✅ Created new upload directory: {}", uploadDir.toAbsolutePath());
            }

            Path destination = uploadDir.resolve(uniqueName);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            log.info("💾 Saved {} image for owner {} at: {}",category.getFolderName(), ownerId, destination.toAbsolutePath());
            return baseUploadUri + (baseUploadUri.endsWith("/") ? "" : "/") +
                    category.getFolderName() + "/" + ownerId + "/" + uniqueName;

        } catch (IOException e) {
            throw new ImageStorageException("Eroare la salvarea imaginii (" + category + ") pentru ID: " + ownerId, e);
        }
    }

    public  void deleteImage(String imagePath) {
        if (imagePath == null || imagePath.isBlank()) {
            throw new ImageStorageException("Calea imaginii este goală sau invalidă.");
        }

        try {

            String relativePath = imagePath.replace(baseUploadUri, "");
            if(relativePath.startsWith("/")) relativePath = relativePath.substring(1);

            Path fullPath = Paths.get(baseUploadDir, relativePath);

            boolean deleted = Files.deleteIfExists(fullPath);
            if (deleted) {
                log.info("🗑️ Deleted image: {}", fullPath);
            } else {
                log.warn("⚠️ Image not found for deletion: {}", fullPath);
            }
        } catch (IOException e) {
            throw new ImageStorageException("Eroare la ștergerea imaginii: " + imagePath, e);
        }
    }

    public  String replaceImage(MultipartFile newFile, String oldImagePath, Integer ownerId, ImageCategory category) {
        if (newFile == null || newFile.isEmpty()) {
            return oldImagePath;
        }

        if (oldImagePath != null && !oldImagePath.isBlank()) {
            deleteImage(oldImagePath);
        }

        return saveImage(newFile, ownerId,category);
    }



    private static String getExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }
}
