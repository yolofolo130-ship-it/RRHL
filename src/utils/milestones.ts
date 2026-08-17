import { recordBook, type TrackableStat } from "@/data/recordBook";
import { skaterPoints } from "@/data/players";
import type { Skater, Goalie } from "@/data/types";

export interface Milestone {
  categoryId: string;
  categoryName: string;
  label: string;
  recordHolder: string;
  recordDisplay: string;
  recordValue: number;
  leaderName: string;
  leaderTeamId: string;
  current: number;
  /** How many more the current leader needs — 0 once tied or broken. */
  remaining: number;
  /** True only when someone OTHER than the record holder has caught up to the record. */
  tied: boolean;
  broken: boolean;
  /** The record holder themself is this stat's current-season leader. */
  isRecordHolder: boolean;
}

function currentLeader(
  stat: TrackableStat,
  skaters: Skater[],
  goalies: Goalie[],
): { name: string; teamId: string; value: number } | null {
  switch (stat) {
    case "goals": {
      const leader = [...skaters].filter((s) => s.gp > 0).sort((a, b) => b.goals - a.goals)[0];
      return leader ? { name: leader.name, teamId: leader.teamId, value: leader.goals } : null;
    }
    case "assists": {
      const leader = [...skaters].filter((s) => s.gp > 0).sort((a, b) => b.assists - a.assists)[0];
      return leader ? { name: leader.name, teamId: leader.teamId, value: leader.assists } : null;
    }
    case "points": {
      const leader = [...skaters]
        .filter((s) => s.gp > 0)
        .sort((a, b) => skaterPoints(b) - skaterPoints(a))[0];
      return leader ? { name: leader.name, teamId: leader.teamId, value: skaterPoints(leader) } : null;
    }
    case "saves": {
      const leader = [...goalies].filter((g) => g.gp > 0).sort((a, b) => b.saves - a.saves)[0];
      return leader ? { name: leader.name, teamId: leader.teamId, value: leader.saves } : null;
    }
    case "shutouts": {
      const leader = [...goalies].filter((g) => g.gp > 0).sort((a, b) => b.shutouts - a.shutouts)[0];
      return leader ? { name: leader.name, teamId: leader.teamId, value: leader.shutouts } : null;
    }
  }
}

/**
 * Compares this season's current stat leaders against the trackable entries
 * in recordBook.ts, closest-to-breaking first. Records without a
 * `trackValue`/`trackStat` (single-game marks, W-L-OTL lines, percentages)
 * are skipped — see the comment on RecordEntry for why.
 */
export function computeMilestones(skaters: Skater[], goalies: Goalie[]): Milestone[] {
  const milestones: Milestone[] = [];

  for (const category of recordBook) {
    for (const entry of category.records) {
      if (entry.trackValue == null || entry.trackStat == null || !entry.value || !entry.holder) {
        continue;
      }
      const leader = currentLeader(entry.trackStat, skaters, goalies);
      if (!leader) continue;

      const remaining = Math.max(entry.trackValue - leader.value, 0);
      const isRecordHolder = leader.name === entry.holder;
      milestones.push({
        categoryId: category.id,
        categoryName: category.name,
        label: entry.label,
        recordHolder: entry.holder,
        recordDisplay: entry.value,
        recordValue: entry.trackValue,
        leaderName: leader.name,
        leaderTeamId: leader.teamId,
        current: leader.value,
        remaining,
        // The record holder sitting on their own number isn't a "tie" —
        // that only means something once someone ELSE catches up to it.
        tied: !isRecordHolder && leader.value === entry.trackValue,
        broken: leader.value > entry.trackValue,
        isRecordHolder,
      });
    }
  }

  return milestones.sort((a, b) => a.remaining - b.remaining);
}
