import { Phases } from "./PhaseTypes";

export enum CosmicCardType {
  Encounter = 'encounter',
  Artifact = 'artifact',
  Flare = 'flare',
  Reinforcement = 'reinforcement',
}

export enum EncounterCardType {
  Attack = 'attack',
  Negotiate = 'negotiate',
  Morph = 'morph',
}

export type CosmicCard = {
  id: number,
} & (
  {
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType
    attackValue?: number,
  } | {
    type: CosmicCardType.Artifact | CosmicCardType.Flare,
    phases: Phases[],
  } | {
    type: CosmicCardType.Reinforcement,
    reinforcementValue: number
  }
);