import { Phases } from "./PhaseTypes";
import { PlayerColor } from "./PlayerTypes";

export enum CardTypes {
  CosmicCards = 'cosmicCards',
  Races = 'races',
  DestinyCards = 'destinyCards',
}

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

export enum DestinyCardEnum {
  PlayerCard = 'playerCard',
  SpecialCard = 'specialCard',
  Joker = 'joker'
}

export type DestinyCardType = {
  id: number,
} & (
  {
    type: DestinyCardEnum.PlayerCard,
    color: PlayerColor
  } | 
  {
    type: DestinyCardEnum.Joker,
  } |
  {
    type: DestinyCardEnum.SpecialCard,
  }
);

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