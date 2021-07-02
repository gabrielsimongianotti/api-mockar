import ITokenRepository from './ITokenRepository';
import { sign } from 'jsonwebtoken';

import { Token } from "@entities/Token"

class TokenRepository implements ITokenRepository {
  private userTokens: Token[] = [];

  public async generate(userId: string): Promise<Token> {
    const userToken = new Token({
      token: sign({}, process.env.APP_SECRET as string, { subject: userId, expiresIn: '1d' }),
      user_id: userId
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default TokenRepository;


