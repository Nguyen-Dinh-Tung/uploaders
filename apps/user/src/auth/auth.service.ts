import { Injectable } from '@nestjs/common';
import { LoginUserAdminDto } from './dto/login-user-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppHttpException } from '@app/exceptions';
import { UserAdminError } from '@app/exceptions/exceptions/user-admin.errors';
import { UserAdminService } from '../user-admin/user-admin.service';
import { JwtInterface } from '@app/common/interfaces';
@Injectable()
export class AuthService {
  constructor(
    private readonly userAdminService: UserAdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginUserAdminDto) {
    const checkUser = await this.userAdminService.validateOrThrowError({
      username: data.username,
    });

    if (!bcrypt.compare(data.password, checkUser.password)) {
      throw new AppHttpException(UserAdminError.ERROR_WRONG_PASSWORD);
    }

    return {
      docs: {
        token: this.genToken({
          id: checkUser.id,
          expiresIn: process.env.EXPIRES_ADMIN,
        }),
      },
    };
  }

  genToken(data: JwtInterface) {
    return this.jwtService.sign(data);
  }
}
