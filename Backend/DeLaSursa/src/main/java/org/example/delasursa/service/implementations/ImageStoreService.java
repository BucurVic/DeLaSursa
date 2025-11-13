package org.example.delasursa.service.implementations;


import lombok.extern.slf4j.Slf4j;
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

    public  String saveImage(MultipartFile file, Integer producatorId) {
        if (file == null || file.isEmpty()) {
            throw new ImageStorageException("Imaginea este goală sau lipsă pentru producătorul cu ID: " + producatorId);
        }

        String originalFilename = Path.of(file.getOriginalFilename()).getFileName().toString();
        String extension = getExtension(originalFilename);
        String uniqueName = UUID.randomUUID() + (extension.isEmpty() ? "" : "." + extension);

        Path uploadDir = Paths.get(baseUploadDir, String.valueOf(producatorId));

        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
                log.info("✅ Created new upload directory: {}", uploadDir.toAbsolutePath());
            }

            Path destination = uploadDir.resolve(uniqueName);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            log.info("💾 Saved image for producătorul {} at: {}", producatorId, destination.toAbsolutePath());
            return baseUploadUri + "/" +  producatorId + "/" +  uniqueName;

        } catch (IOException e) {
            throw new ImageStorageException("Eroare la salvarea imaginii pentru producătorul cu ID: " + producatorId, e);
        }
    }

    public  void deleteImage(String imagePath) {
        if (imagePath == null || imagePath.isBlank()) {
            throw new ImageStorageException("Calea imaginii este goală sau invalidă.");
        }

        try {
            boolean deleted = Files.deleteIfExists(Paths.get(imagePath));
            if (!deleted) {
                throw new ImageStorageException("Imaginea nu a fost găsită pentru ștergere: " + imagePath);
            }
        } catch (IOException e) {
            throw new ImageStorageException("Eroare la ștergerea imaginii: " + imagePath, e);
        }
    }

    public  String replaceImage(MultipartFile newFile, String oldImagePath, Integer producatorId) {
        if (newFile == null || newFile.isEmpty()) {
            throw new ImageStorageException("Fișierul de imagine nou este gol.");
        }

        String originalFilename = Path.of(newFile.getOriginalFilename()).getFileName().toString();
        if (oldImagePath != null && oldImagePath.endsWith(originalFilename)) {
            return oldImagePath;
        }

        if (oldImagePath != null && !oldImagePath.isBlank()) {
            deleteImage(oldImagePath);
        }

        return saveImage(newFile, producatorId);
    }



    private static String getExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }
}
