import { Token } from "@entities/Token";

export default interface ITokenRepository {
  generate(userId: string): Promise<Token>;
}
