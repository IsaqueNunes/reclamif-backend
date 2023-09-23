import { Injectable } from '@nestjs/common';
import { ClaimantService } from '../claimant/claimant.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private claimantService: ClaimantService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.claimantService.findByEmail(email);

    if (!(await compare(password, user.password))) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
