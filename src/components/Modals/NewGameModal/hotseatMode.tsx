import React, { FC, useCallback, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

import { ISelectOption, Select } from '@/components/FormComponents/Select';
import { Button } from '@/components/FormComponents/Button';
import { Input } from '@/components/FormComponents/Input';

import { playersCount } from './const';
import { MIN_PLAYERS_COUNT, MAX_PLAYERS_COUNT } from '@/const';

import TrashIcon from '../../../../public/icons/trash.svg';

interface FieldGroupProps {
  id: string;
  selectedOption: ISelectOption | null;
  inputValue: string;
}

type HotseatModeProps = unknown;

export const HotseatMode: FC<HotseatModeProps> = () => {
  const [fieldGroups, setFieldGroups] = useState<FieldGroupProps[]>([
    { id: nanoid(), selectedOption: playersCount[0], inputValue: '' },
    { id: nanoid(), selectedOption: playersCount[1], inputValue: '' },
    { id: nanoid(), selectedOption: playersCount[2], inputValue: '' },
  ]);

  const [error, setError] = useState<string>('');

  const handleHotseatStart = useCallback(() => {
    const inputValues = fieldGroups.map(group => group.inputValue.trim());

    if (!inputValues.every(value => value)) {
      return setError("Заполнены не все имена игроков");
    }
    if (!(new Set(inputValues).size === inputValues.length)) {
      return setError("Дубли в именах игроков");
    }
    setError('');
  }, [fieldGroups]);

  const getAvailableOptions = useMemo((): ISelectOption[] => {
    const selectedOptions = fieldGroups.map(group => group.selectedOption?.value);
    return playersCount.filter((option) => !selectedOptions.includes(option.value));
  }, [fieldGroups]);

  const handleAddBlock = useCallback(() => {
    const newBlock: FieldGroupProps = {
      id: nanoid(),
      selectedOption: getAvailableOptions[0],
      inputValue: '',
    };
    setFieldGroups([...fieldGroups, newBlock]);
  }, [fieldGroups, getAvailableOptions]);

  const renderHotseatFieldsGroup = useCallback((group: FieldGroupProps) => {
    const handleRemoveBlock = () => {
      const updatedBlocks = fieldGroups.filter((block) => block.id !== group.id);
      setFieldGroups(updatedBlocks);
    };
  
    const handleOptionChange = (selectedOption: ISelectOption) => {
      const updatedBlocks = fieldGroups.map((block) =>
        block.id === group.id ? { ...block, selectedOption } : block
      );
      setFieldGroups(updatedBlocks);
    };
  
    const handleInputChange = (inputValue: string) => {
      const updatedBlocks = fieldGroups.map((block) =>
        block.id === group.id ? { ...group, inputValue: inputValue.trim() } : block
      );
      setFieldGroups(updatedBlocks);
    };
  
    return (
      <div className='new-game-modal__fields-group'>
        <Select
          onChange={(e) => e && handleOptionChange(e as ISelectOption)}
          options={getAvailableOptions || playersCount}
          label="Цвет игрока"
          className="new-game-modal__field-select"
          {
            ...group.selectedOption && {
              value: group.selectedOption
            }
          }
        />
        <Input label='Имя игрока' onInput={(e) => handleInputChange(e.target.value)} />
        {
          fieldGroups.findIndex(initGroup => initGroup === group) >= MIN_PLAYERS_COUNT &&
          <Button onClick={handleRemoveBlock} view="warning" size='xs'>
            <TrashIcon />
          </Button>
        }
      </div>
    );
  }, [fieldGroups, getAvailableOptions]);

  return(
    <>
      <Button
        onClick={handleAddBlock}
        className='new-game-modal__add-btn'
        size='s'
        disabled={fieldGroups.length >= MAX_PLAYERS_COUNT}
      >Добавить игрока</Button>
      {fieldGroups.map((group) => {
        return (
          <React.Fragment key={group.id}>
            {renderHotseatFieldsGroup(group)}
          </React.Fragment>
        );
      })}
      {
        error && <p className='new-game-modal__error'>{error}</p>
      }
      <Button onClick={handleHotseatStart}>Начать игру</Button>
    </>
  );
};

