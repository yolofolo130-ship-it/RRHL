import usaFlag from "@/assets/flags/USA.png";
import mexicoFlag from "@/assets/flags/Mexico.png";
import drFlag from "@/assets/flags/DR.png";
import canadaFlag from "@/assets/flags/Canada.png";
import irelandFlag from "@/assets/flags/Ireland.png";
import prFlag from "@/assets/flags/PR.png";
import ukraineFlag from "@/assets/flags/Ukraine.png";
import jamaicaFlag from "@/assets/flags/Jamaica.png";

// Maps a flag/country name to its icon image. Drop the image in
// src/assets/flags/, import it below, and add an entry — then set
// `flag: "<name>"` on a player in players.ts to use it.
export const flagIcons: Record<string, string> = {
  USA: usaFlag,
  Mexico: mexicoFlag,
  DR: drFlag,
  Canada: canadaFlag,
  Ireland: irelandFlag,
  PR: prFlag,
  Ukraine: ukraineFlag,
  Jamaica: jamaicaFlag,
};
