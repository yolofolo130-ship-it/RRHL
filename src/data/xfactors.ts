import type { AbilityInfo } from "./types";
import postToPostIcon from "@/assets/x-factor-logos/Post-To-Post-Elite.png";
import backhandBeautyIcon from "@/assets/x-factor-logos/Backhand-Beauty-Elite.png";
import unstoppableIcon from "@/assets/x-factor-logos/Unstoppable-Elite.png";
import ankleBreakerIcon from "@/assets/x-factor-logos/Ankle-Breaker-Elite.png";

// Maps an X-Factor ability name to its icon + description. Drop the image
// in src/assets/x-factor-logos/, import it below, and add an entry — then
// set `xFactor: "<name>"` on a player in players.ts to use it. Clicking
// the badge on a player's page shows the description.
export const xFactorAbilities: Record<string, AbilityInfo> = {
  "Post to Post": {
    icon: postToPostIcon,
    description:
      "Players with this ability are known for their quick reflexes and ability to make unbelievable saves from one side of the crease to the other. They can move across the net faster and stay more accurate while sliding, giving them a better chance to shut down dangerous cross-crease plays. Their sharp reactions also make them especially difficult to beat on one-timers, allowing for more impressive windmill saves and consistent reactions to perfectly timed shots.",
  },
  "Backhand Beauty": {
    icon: backhandBeautyIcon,
    description:
      "Players with this ability are known for delivering quick, powerful backhand shots that can catch opposing players and goalies off guard. They also have the control and precision to make backhand passes with the same accuracy and power as a forehand pass, making them unpredictable playmakers in any situation.",
  },
  Unstoppable: {
    icon: unstoppableIcon,
    description:
      "Players with this ability are known for their physical strength and ability to turn a defensive situation into an advantage. Their reverse hits carry more power, allowing them to catch opposing players off guard, while their increased strength and balance help them fight through push checks without losing position or control of the puck.",
  },
  "Ankle Breaker": {
    icon: ankleBreakerIcon,
    description:
      "Players with this ability are known for their quick hands, creative puck movement, and ability to juke defenders out of position. Successfully using a Deke to beat a defender gives them a brief burst of speed, allowing them to create separation and keep the play moving. Skilled players can leave defenders scrambling to recover after getting caught off guard.",
  },
};
