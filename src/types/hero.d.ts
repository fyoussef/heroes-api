export namespace Hero {
  export type HeroGetAllOutput = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export type HeroCreateInput = {
    name: string;
    description: string;
  };
}
