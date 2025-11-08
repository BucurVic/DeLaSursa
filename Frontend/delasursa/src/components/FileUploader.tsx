import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { textResources as tr } from '../theme/textResources.ts';

interface FileUploaderBoxProps {
    fileTypesDisplay?: string;
    accept?: string;
    multiple?: boolean;
    onFilesSelected?: (files: FileList) => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    opacity: 0,
    border: 0,
    padding: 0,
    margin: 0,
    background: 'transparent',
});

export default function FileUploaderBox({
                                            fileTypesDisplay = 'PNG, JPG, PDF',
                                            accept = '.png,.jpg,.jpeg,.pdf',
                                            multiple = true,
                                            onFilesSelected,
                                        }: FileUploaderBoxProps) {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
            if (onFilesSelected) {
                onFilesSelected(event.target.files);
            }
        }
    };

    return (
        <Box
            component="label"
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                padding: 3,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: 'action.hover',
                    borderColor: 'primary.main',
                    boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}33`,
                },
            }}
        >
            <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
                {tr.uploader.title}
            </Typography>

            {selectedFiles && selectedFiles.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                    {Array.from(selectedFiles).map((file) => (
                        <Typography key={file.name} variant="body2" color="text.secondary">
                            {file.name}
                        </Typography>
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    {tr.uploader.acceptedFiles} {fileTypesDisplay}
                </Typography>
            )}

            <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple={multiple}
                accept={accept}
            />
        </Box>
    );
}
