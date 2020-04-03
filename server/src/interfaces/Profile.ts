export interface IProfile {
  city: string;
  english: English;
  skills: string[];
  portfolio?: string;
  github?: string;
  linkedin?: string;
  experience: boolean;
}

export enum English {
  BASIC,
  INTERMEDIATE,
  ADVANCE,
}
