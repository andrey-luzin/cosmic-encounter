import { Phases } from "@/types/PhaseTypes";

export const steps = [
  {
    phase: Phases.StartingTheTurn,
    name: 'Начало хода',
    isActive: true
  },
  {
    phase: Phases.Regroup,
    name: 'Перегруппировка',
    isActive: false
  },
  {
    phase: Phases.Destiny,
    name: 'Судьба',
    isActive: false
  },
  {
    phase: Phases.Launch,
    name: 'Запуск',
    isActive: false
  },
  {
    phase: Phases.Alliance,
    name: 'Союзы',
    isActive: false
  },
  {
    phase: Phases.Planning,
    name: 'Планирование',
    isActive: false
  },
  {
    phase: Phases.Reveal,
    name: 'Раскрытие',
    isActive: false
  },
  {
    phase: Phases.Resolution,
    name: 'Результат',
    isActive: false
  },
];