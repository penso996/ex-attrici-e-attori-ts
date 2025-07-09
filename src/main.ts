type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
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
  most_famous_movie: [string, string, string],
  awards: string,
  nationality: ActressNationality,
}

function isActress(dati: unknown): dati is Actress {
  return (
    typeof dati === "object" && dati !== null &&
    "id" in dati && typeof dati.id === "number" &&
    "name" in dati && typeof dati.name === "string" &&
    "birth_year" in dati && typeof dati.birth_year === "number" &&
    "death_year" in dati && typeof dati.death_year === "number" &&
    "biography" in dati && typeof dati.biography === "string" &&
    "image" in dati && typeof dati.image === "string" &&
    "most_famous_movie" in dati
    && dati.most_famous_movie instanceof Array
    && dati.most_famous_movie.length === 3
    && dati.most_famous_movie.every(m => typeof m === "string") &&
    "awards" in dati && typeof dati.awards === "string" &&
    "nationality" in dati && typeof dati.nationality === "string"
  )
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    if (!response.ok) {
      throw new Error(`Errore HTTP " ${response.status}: ${response.statusText}`)
    }
    const dati: unknown = await response.json();
    if (!isActress(dati)) {
      throw new Error("Formato dati non valido");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero dell'attrice", error);
    } else {
      console.error("Errore sconosciuto", error);
    }
    return null;
  }
}

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/`);
    if (!response.ok) {
      throw new Error(`Errore HTTP " ${response.status}: ${response.statusText}`)
    }
    const dati: unknown = await response.json();
    if (!(dati instanceof Array)) {
      throw new Error("Formato dei dati non valido, non è un array");
    }
    const attriciValide: Actress[] = dati.filter(isActress);
    return attriciValide;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero delle attrici", error);
    } else {
      console.error("Errore sconosciuto", error);
    }
    return [];
  }
}