export type Track = {
  id: string;
  title: string;
  artist?: string;
  src: string;
};

const musicUrl = (file: string) => `${import.meta.env.BASE_URL}music/${file}`;

export const tracks: Track[] = [
  {
    id: "all-the-stars",
    title: "All The Stars",
    artist: "Kendrick Lamar, SZA",
    src: musicUrl("all-the-stars.mp3"),
  },
  {
    id: "everybody",
    title: "Everybody",
    artist: "Kanye West, Ty Dolla $ign, Charlie Wilson",
    src: musicUrl("everybody-feat-kanye-west-ty-dolla-sign-charlie-wilson.mp3"),
  },
  {
    id: "welcome-to-the-jungle",
    title: "Welcome To The Jungle",
    artist: "Guns N' Roses",
    src: musicUrl("guns-n-roses-welcome-to-the-jungle.mp3"),
  },
  {
    id: "diva",
    title: "Diva",
    artist: "PlaqueBoyMax",
    src: musicUrl("plaqueboymax-diva.mp3"),
  },
  {
    id: "rottweiler",
    title: "Rottweiler",
    artist: "EsDeeKid",
    src: musicUrl("rottweiler.mp3"),
  },
  {
    id: "oh-yeah",
    title: "Oh Yeah",
    artist: "Steve Lacy",
    src: musicUrl("steve-lacy-oh-yeah.mp3"),
  },
  {
    id: "loser",
    title: "Loser",
    artist: "Tame Impala",
    src: musicUrl("tame-impala-loser.mp3"),
  },
];
