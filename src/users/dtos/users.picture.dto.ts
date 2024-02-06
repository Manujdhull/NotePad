import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  FileSystemStoredFile,
} from 'nestjs-form-data';

export class PictureDto {
  @MaxFileSize(1e7)
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsFile()
  file: FileSystemStoredFile;
}
