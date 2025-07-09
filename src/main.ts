type Person = {
  readonly id: number,
  readonly name: string,
  birthYear: number,
  deathYear?: number,
  biography: string,
  image: string
}

type ActressNationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"

type Actress = Person & {
  mostFamousMovie: [string, string, string],
  awards: string,
  nationality: ActressNationality,
}