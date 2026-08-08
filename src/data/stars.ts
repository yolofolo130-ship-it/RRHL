import type { AbilityInfo } from "./types";
import quickReleaseIcon from "@/assets/x-factor-logos/Quick-Release-AllStars.png";
import warriorIcon from "@/assets/x-factor-logos/Warrior-AllStars.png";
import truculenceIcon from "@/assets/x-factor-logos/Truculence-AllStar.png";
import oneTIcon from "@/assets/x-factor-logos/One-T-AllStars.png";
import wheelsIcon from "@/assets/x-factor-logos/Wheels-AllStars.png";
import dialedInIcon from "@/assets/x-factor-logos/Dialed-In-AllStars.png";
import spongeIcon from "@/assets/x-factor-logos/Sponge-AllStars.png";

// Maps a Star ability name to its icon + description. Star is a tier below
// X-Factor (typically ~88-93 OVR). Drop the image in
// src/assets/x-factor-logos/ (shared with X-Factor icons), import it
// below, and add an entry — then set `star: "<name>"` on a player in
// players.ts to use it. Clicking the badge on a player's page shows the
// description.
export const starAbilities: Record<string, AbilityInfo> = {
  "Quick Release": {
    icon: quickReleaseIcon,
    description:
      "Players with this ability are known for getting shots off before goalies have time to react. Their lightning-fast release makes their backhand and forehand shots especially dangerous, catching goalies off guard and giving them less time to get set and make the save.",
  },
  Warrior: {
    icon: warriorIcon,
    description:
      "Players with this ability are known for their toughness and ability to stay in the play through heavy contact. They can absorb body checks and block shots without losing as much stamina, while also recovering from the slowing effects of big hits faster. Their resilience makes them difficult to knock off their game, even under constant pressure.",
  },
  Truculence: {
    icon: truculenceIcon,
    description:
      "Players with this ability are known for getting into a rhythm and becoming more dangerous with every successful play. Each consecutive skating or scoring play builds momentum, improving their speed, acceleration, and shooting ability while they stay in the zone. The longer they keep the streak alive, the harder they become to slow down or contain.",
  },
  "One-T": {
    icon: oneTIcon,
    description:
      "Players with this ability are known for being dangerous threats around the net, capable of delivering powerful and accurate one-timers that can catch goalies off guard. Their ability to consistently find the back of the net makes them a constant threat whenever they have an opportunity to shoot.",
  },
  Wheels: {
    icon: wheelsIcon,
    description:
      "Players with this ability are known for their explosive speed and ability to blow past defenders in open ice. Once they build momentum and reach top speed, their increased acceleration and speed make them extremely difficult to catch, allowing them to turn small openings into dangerous scoring opportunities.",
  },
  "Dialed In": {
    icon: dialedInIcon,
    description:
      "Players with this ability are known for getting into a rhythm and becoming harder to beat with every save. Each consecutive save sharpens their reactions and improves their accuracy, allowing them to stay locked in and make increasingly difficult stops as the pressure builds.",
  },
  Sponge: {
    icon: spongeIcon,
    description:
      "Players with this ability are known for swallowing up shots and keeping rebounds to a minimum. They react quickly after making a save, allowing them to cover loose pucks before opposing players can capitalize and quickly regain control of the crease.",
  },
};
