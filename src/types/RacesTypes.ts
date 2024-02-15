import { Phases } from "./PhaseTypes";

export enum ActivationTypesEnum {
  Any = 'any',
  Offense = 'offense',
  NotOffense = 'not-offense',
  Defense = 'defense',
  NotDefense = 'not-defense',
  MainPlayer = 'main-player',
  MainPlayerOrAlly = 'main-player-or-ally',
}

export type RaceType = {
  name: string,
  phases: Phases[],
  activationType: ActivationTypesEnum,
  isRequired: boolean,
};
