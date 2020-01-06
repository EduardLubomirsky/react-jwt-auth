export default class Environment {
  static get nodeEnv(): string {
    return process.env.NODE_ENV;
  }
  static get secret(): string {
    return process.env.SECRET;
  }
  static get httpPort(): string {
    return process.env.HTTP_PORT;
  }
  static get httpsPort(): string {
    return process.env.HTTPS_PORT;
  }
  static get tokenExpiresIn(): number {
    return parseFloat(process.env.TOKEN_EXPIRES_IN);
  }
  static get connectionString(): string {
    return (
      process.env.DB_CONNECTION_STRING
    );
  }
}
