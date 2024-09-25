export class UserCreate {
   constructor(
      public email: string,
      public name: string,
      public role: string,
      public password: string
   ) {}
}
export class User {
   // public email: string;
   // public id: string;
   // public role: string;
   // public name: string;
   // private _token: string;
   // private _tokenExpirationDate: Date;

   constructor(
      public email: string,
      public id: string,
      public role: string,
      public name: string,
      private _token: string,
      private _tokenExpirationDate: Date
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

   get tokenExpirationDate() {
      if (
         !this._tokenExpirationDate ||
         new Date() > this._tokenExpirationDate
      ) {
         return null;
      }
      return this._token;
   }
}
