import { UserAdminEntity } from '@app/common/entities';
import { UniqueFieldUserInterface } from '@app/common/interfaces';
import { AppHttpBadRequest, UserError } from '@app/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserAdminEntity)
    private readonly userAdminRepo: Repository<UserAdminEntity>,
  ) {}

  async validateOrThrowError(
    data: UniqueFieldUserInterface,
  ): Promise<UserAdminEntity> {
    const checkUser = await this.userAdminRepo.findOne({
      where: data,
    });

    if (!checkUser) {
      throw new AppHttpBadRequest(UserError.ERROR_USER_NOT_EXISTTING);
    }

    return checkUser;
  }

  async findOne(username: string) {
    return await this.userAdminRepo.findOne({
      where: {
        username: username,
      },
    });
  }

  async createAdminUser(username: string, password: string) {
    await this.userAdminRepo.save({
      username: username,
      password: password,
      isRoot: true,
    });
  }
}
