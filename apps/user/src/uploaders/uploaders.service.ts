import { ImagesEntity } from '@app/common/entities';
import { saveImage } from '@app/common/helpers/save-file';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UploadersService {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imagesRepo: Repository<ImagesEntity>,
  ) {}
  async singleUpload(file: Express.Multer.File) {
    let url = '';
    url = await saveImage(file, process.env.IMAGE_STATIC_FOLDER);
    await this.imagesRepo.save(
      this.imagesRepo.create({
        imageURL: url,
        name: file.filename,
      }),
    );

    return {
      success: true,
    };
  }

  async bulkUpload(files: Express.Multer.File[]) {
    for (const file of files['files']) {
      let url = await saveImage(file, process.env.IMAGE_STATIC_FOLDER);
      await this.imagesRepo.save(
        this.imagesRepo.create({
          imageURL: url,
          name: file.filename,
        }),
      );
    }
    return {
      success: true,
    };
  }
}
