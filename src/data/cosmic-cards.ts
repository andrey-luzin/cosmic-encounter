import { CosmicCardType, CosmicCardsEnum, EncounterCardType } from '@/types/CardTypes';
import { Phases } from '@/types/PhaseTypes';

export const cosmicCards: CosmicCardType[] = [
  {
    id: 1,
    type: CosmicCardsEnum.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },
  {
    id: 2,
    type: CosmicCardsEnum.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },
  {
    id: 3,
    type: CosmicCardsEnum.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },
  {
    id: 4,
    type: CosmicCardsEnum.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },

  {
    id: 12,
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 0,
  },
  {
    id: 13,
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 1,
  },
  {
    id: 14,
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 4,
  },
  {
    id: 15,
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 4,
  },

  {
    id: 51,
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType.Negotiate
  },

  {
    id: 66,
    type: CosmicCardsEnum.Encounter,
    encounterType: EncounterCardType.Morph
  },
  {
    id: 67,
    type: CosmicCardsEnum.Reinforcement,
    reinforcementValue: 2,
  },
];