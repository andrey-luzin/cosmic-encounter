import { Phases } from '@/types/PhaseTypes';
import { ActivationTypesEnum, RaceType } from '@/types/RacesTypes';

export const racesCards: RaceType[] = [
  {
    id: 1,
    name: "Варвар",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.Offense,
    isRequired: true,
  },
  {
    id: 2,
    name: "Избранный",
    phases: [Phases.Reveal],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 3,
    name: "Клон",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 4,
    name: "Громила",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: true,
  },
  {
    id: 5,
    name: "Карманник",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 6,
    name: "Хакер",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 7,
    name: "Лузер",
    phases: [Phases.Planning],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 8,
    name: "Гигант",
    phases: [Phases.Launch, Phases.Alliance, Phases.Reveal],
    activationType: ActivationTypesEnum.MainPlayerOrAlly,
    isRequired: true,
  },
  {
    id: 9,
    name: "Скряга",
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution
    ],
    activationType: ActivationTypesEnum.Any,
    isRequired: false,
  },
  {
    id: 10,
    name: "Мутант",
    phases: [Phases.Alliance],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 11,
    name: "Наблюдатель",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.MainPlayerOrAlly,
    isRequired: true,
  },
  {
    id: 12,
    name: "Тик-Так",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.Any,
    isRequired: true,
  },
  {
    id: 13,
    name: "Оракул",
    phases: [Phases.Planning],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: true,
  },
  {
    id: 14,
    name: "Пацифист",
    phases: [Phases.Reveal],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: true,
  },
  {
    id: 15,
    name: "Паразит",
    phases: [Phases.Alliance],
    activationType: ActivationTypesEnum.NotMainPlayer,
    isRequired: false,
  },
  {
    id: 16,
    name: "Резервист",
    phases: [Phases.Reveal],
    activationType: ActivationTypesEnum.MainPlayerOrAlly,
    isRequired: false,
  },
  {
    id: 17,
    name: "Колдун",
    phases: [Phases.Planning],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 18,
    name: "Авантюрист",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.Offense,
    isRequired: false,
  },
  {
    id: 19,
    name: "Меняла",
    phases: [Phases.Planning],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
  },
  {
    id: 20,
    name: "Вакуум",
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution
    ],
    activationType: ActivationTypesEnum.Any,
    isRequired: true,
  },
  {
    id: 21,
    name: "Стервятник",
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution
    ],
    activationType: ActivationTypesEnum.Any,
    isRequired: true,
  },
  {
    id: 22,
    name: "Воин",
    phases: [Phases.Reveal],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: true,
  },
  {
    id: 23,
    name: "Воля",
    phases: [Phases.Destiny],
    activationType: ActivationTypesEnum.Offense,
    isRequired: true,
  },
  {
    id: 24,
    name: "Зомби",
    phases: [
      Phases.StartingTheTurn, Phases.Regroup, Phases.Destiny, Phases.Launch,
      Phases.Alliance, Phases.Planning, Phases.Reveal, Phases.Resolution
    ],
    activationType: ActivationTypesEnum.Any,
    isRequired: true,
  },
  {
    id: 25,
    name: "Цитадель",
    phases: [Phases.Planning],
    activationType: ActivationTypesEnum.Any,
    isRequired: false,
  },
  {
    id: 26,
    name: "Диктатор",
    phases: [Phases.Destiny],
    activationType: ActivationTypesEnum.NotOffense,
    isRequired: true,
  },
  {
    id: 27,
    name: "Картежник",
    phases: [Phases.Reveal],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: false,
    isDisable: true,
  },
  {
    id: 28,
    name: "Злыдень",
    phases: [Phases.Alliance],
    activationType: ActivationTypesEnum.MainPlayer,
    isRequired: true,
  },
  {
    id: 29,
    name: "Машина",
    phases: [Phases.Resolution],
    activationType: ActivationTypesEnum.Offense,
    isRequired: false,
  },
];
