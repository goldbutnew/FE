package ving.spring.ving.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ving.spring.ving.user.dto.FillupDto;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;
    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    public String saveMedia(MultipartFile multipartFile, String Identifier) throws Exception
    {
        try
        {
            String sourceFileName = multipartFile.getOriginalFilename();
            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
            String fileUrl = "https://" + bucket +".s3.ap-northeast-2.amazonaws.com" + "/";
            String destinationFileName = RandomStringUtils.randomAlphabetic(5) + "_" + Identifier  + "."
                    + sourceFileNameExtension;

            String finalUrl = (fileUrl + destinationFileName);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(multipartFile.getContentType());
            metadata.setContentLength(multipartFile.getSize());
            amazonS3Client.putObject(bucket, destinationFileName, multipartFile.getInputStream() ,metadata);
            return finalUrl;
        } catch (Exception e)
        {
            System.err.println(e.getMessage());
            throw new IOException();
        }
    }
}
