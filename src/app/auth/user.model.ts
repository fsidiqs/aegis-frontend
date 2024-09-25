export class User {
   public email: string;
   public id: string;
   public role: string;
   public name: string;
   private _token: string;
   private _tokenExpirationDate: Date;

   constructor(
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
   ) {}

   get token() {
      if (
         !this._tokenExpirationDate ||
         new Date() > this._tokenExpirationDate
      ) {
         return null;
      }
      return this._token;
   }
}
