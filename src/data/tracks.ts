export type Track = {
  id: string;
  title: string;
  artist?: string;
  src: string;
};

const musicUrl = (file: string) => `${import.meta.env.BASE_URL}music/${file}`;

export const tracks: Track[] = [
  {
    id: "i-gotta-feeling",
    title: "I Gotta Feeling",
    artist: "Black Eyed Peas",
    src: musicUrl("i-gotta-feeling.mp3"),
  },
  {
    id: "eoo",
    title: "EoO",
    artist: "Bad Bunny",
    src: musicUrl("eoo.mp3"),
  },
  {
    id: "immortals",
    title: "Immortals",
    artist: "Fall Out Boy",
    src: musicUrl("immortals.mp3"),
  },
  {
    id: "power",
    title: "Power",
    artist: "Kanye West",
    src: musicUrl("power.mp3"),
  },
  {
    id: "maps",
    title: "Maps",
    artist: "Maroon 5",
    src: musicUrl("maps.mp3"),
  },
  {
    id: "this-love",
    title: "This Love",
    artist: "Maroon 5",
    src: musicUrl("this-love.mp3"),
  },
  {
    id: "song-cry",
    title: "Song Cry",
    artist: "Jay-Z",
    src: musicUrl("song-cry.mp3"),
  },
  {
    id: "temperature",
    title: "Temperature",
    artist: "Sean Paul",
    src: musicUrl("temperature.mp3"),
  },
  {
    id: "hyaena",
    title: "HYAENA",
    artist: "Travis Scott",
    src: musicUrl("hyaena.mp3"),
  },
];
