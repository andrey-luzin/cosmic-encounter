import React, { FC, useCallback, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import isEmpty from 'lodash/isEmpty';

import { ISelectOption, Select } from '@/components/FormComponents/Select';
import { Button } from '@/components/FormComponents/Button';
import { Input } from '@/components/FormComponents/Input';

import { playersOptions } from './const';
import { MIN_PLAYERS_COUNT, MAX_PLAYERS_COUNT } from '@/const';

import TrashIcon from '../../../../public/icons/trash.svg';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';
import { PlayerType } from '@/types/PlayerTypes';
import { getRandomObjects } from '@/helpers';

interface FieldGroupProps {
  id: string;
  selectedOption: ISelectOption | null;
  inputValue: string;
}

type HotseatModeProps = {
  onStart: () => void,
};

export const HotseatMode: FC<HotseatModeProps> = ({ onStart }) => {
  const { state, dispatch } = useStore();

  const [fieldGroups, setFieldGroups] = useState<FieldGroupProps[]>([
    { id: nanoid(), selectedOption: playersOptions[0], inputValue: '' },
    { id: nanoid(), selectedOption: playersOptions[1], inputValue: '' },
    { id: nanoid(), selectedOption: playersOptions[2], inputValue: '' },
  ]);

  const [error, setError] = useState<string>('');

  const handleHotseatStart = useCallback(() => {
    const inputValues = fieldGroups.map(group => group.inputValue.trim());

    // TODO: return error checking
    // if (!inputValues.every(value => value)) {
    //   return setError("Заполнены не все имена игроков");
    // }
    // if (!(new Set(inputValues).size === inputValues.length)) {
    //   return setError("Дубли в именах игроков");
    // }
    setError('');
    onStart();

    // TODO: replace to useGameStateHook ?
    const filteredFields = fieldGroups.filter(group => group.inputValue);
    // list for generation turn orders
    const iteratedPlayersList = Array.from({ length: filteredFields.length }, (_, k) => k);

    const reducedField = filteredFields.reduce((cur, group) => {
      // generate random numbers, take index 0 and remove it from array
      const randomNumber = getRandomObjects(iteratedPlayersList)[0];
      iteratedPlayersList.splice(0, 1);

      return ({
        ...cur,
        [group.inputValue]: {
          name: group.inputValue,
          color:  group.selectedOption?.value,
          turnOrder: randomNumber
        }
      });
    }, {});
    
    if (!isEmpty(reducedField)) {
      dispatch({
        type: ActionTypes.SET_GAME_STATE,
        payload: {
          playersCount: filteredFields.length,
          players: reducedField,
        },
      });
    }
  }, [dispatch, fieldGroups, onStart]);

  const getAvailableOptions = useMemo((): ISelectOption[] => {
    const selectedOptions = fieldGroups.map(group => group.selectedOption?.value);
    return playersOptions.filter((option) => !selectedOptions.includes(option.value));
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
          options={getAvailableOptions || playersOptions}
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

