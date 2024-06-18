import { Phases } from "@/types/PhaseTypes";

export const steps = [
  {
    phase: Phases.StartingTheTurn,
    name: 'Начало хода',
  },
  {
    phase: Phases.Regroup,
    name: 'Перегруппировка',
  },
  {
    phase: Phases.Destiny,
    name: 'Судьба',
  },
  {
    phase: Phases.Launch,
    name: 'Запуск',
  },
  {
    phase: Phases.Alliance,
    name: 'Союзы',
  },
  {
    phase: Phases.Planning,
    name: 'Планирование',
  },
  {
    phase: Phases.Reveal,
    name: 'Раскрытие',
  },
  {
    phase: Phases.Resolution,
    name: 'Результат',
  },
];