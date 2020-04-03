export interface IProfile {
    city: string,
    english: English,
    skills: Array<string>
    portfolio?: string,
    github?: string,
    linkedin?: string,
    experience: Boolean,
}

export enum English {
    BASIC,
    INTERMEDIATE,
    ADVANCE
}
