export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  }
}

export interface Info {
  name: string;
  img_url: string;
  ability: string[];
}