import { Phases } from "./PhaseTypes";

export enum ActivationTypesEnum {
  Any = 'any',
  Offense = 'offense',
  NotOffense = 'not-offense',
  Defense = 'defense',
  NotDefense = 'not-defense',
  MainPlayer = 'main-player',
  MainPlayerOrAlly = 'main-player-or-ally',
  NotMainPlayer = 'not-main-player',
}

export type RaceType = {
  id: number,
  name: string,
  phases: Phases[],
  activationType: ActivationTypesEnum,
  isRequired: boolean,
  isDisable?: boolean,
};
