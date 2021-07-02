
import { uuid } from 'uuidv4'

export class Token {
  public readonly id: string;
  public token: string;
  public user_id: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor(props: Omit<Token, 'id' | 'created_at' | 'updated_at'>, id?: string, created_at?: Date, updated_at?: Date) {
    Object.assign(this, props);

    if (!id || !created_at || !updated_at) {
      this.id = uuid();
      this.created_at = new Date();
      this.updated_at = new Date();
    }
  }
}