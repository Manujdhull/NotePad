import { Module } from '@nestjs/common';
import { StorageModule } from '@squareboat/nest-storage';
import { ConfigService } from '@nestjs/config';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      autoDeleteFile: true,
    }),
    StorageModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('filesystem');
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [NestjsFormDataModule, StorageModule],
})
export class ProfileStorageModule {}
