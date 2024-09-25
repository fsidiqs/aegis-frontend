export class Organization {
   public id: string;
   public creatorID: string;
   public name: string;
   public description: string;

   constructor(id: string, name: string, desc: string, creatorID: string) {
      this.name = name;
      this.description = desc;
      this.creatorID = creatorID;
      this.id = id;
   }
}
