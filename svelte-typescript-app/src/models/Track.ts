import type { Artist } from "./Artist";
import type { Album } from "./Album";

export class Track {
  public id: number;
  public title: string;
  public artist: Artist;
  public album: Album;
}
