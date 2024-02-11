import { CosmicCard, CosmicCardType, EncounterCardType } from '@/types/CardTypes';
import { Phases } from '@/types/PhaseTypes';

export const cosmicCards: CosmicCard[] = [
  {
    id: 1,
    type: CosmicCardType.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },
  {
    id: 2,
    type: CosmicCardType.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },
  {
    id: 3,
    type: CosmicCardType.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },
  {
    id: 4,
    type: CosmicCardType.Artifact,
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution,
    ],
  },

  {
    id: 12,
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 0,
  },
  {
    id: 13,
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 1,
  },
  {
    id: 14,
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 4,
  },
  {
    id: 15,
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType.Attack,
    attackValue: 4,
  },

  {
    id: 51,
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType.Negotiate
  },

  {
    id: 66,
    type: CosmicCardType.Encounter,
    encounterType: EncounterCardType.Morph
  },
  {
    id: 67,
    type: CosmicCardType.Reinforcement,
    reinforcementValue: 2,
  },
];