import { Phases } from "./PhaseTypes";

export enum CosmicCardsEnum {
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

export type CosmicCardType = {
  id: number,
} & (
  {
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType
    attackValue?: number,
  } | {
    type: CosmicCardsEnum.Artifact | CosmicCardsEnum.Flare,
    phases: Phases[],
  } | {
    type: CosmicCardsEnum.Reinforcement,
    reinforcementValue: number,
    phases: Phases[],
  }
);