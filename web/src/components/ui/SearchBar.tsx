'use client';

import type { KeyboardEvent } from 'react';
import { Icon } from './Icon';

export function SearchBar({
  placeholder = 'corrente cubana, anel sinete, 60 cm…',
  valor,
  onChange,
  onSubmit,
  botao = 'Buscar',
  semBotao,
  className = '',
}: {
  placeholder?: string;
  valor?: string;
  onChange?: (v: string) => void;
  onSubmit?: (v: string) => void;
  botao?: string;
  semBotao?: boolean;
  className?: string;
}) {
  return (
    <label className={['erk-busca', className].filter(Boolean).join(' ')}>
      <span className="erk-sr">Buscar produto</span>
      <Icon name="busca" />
      <input
        type="search"
        placeholder={placeholder}
        value={valor}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onKeyDown={
          onSubmit
            ? (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') onSubmit(e.currentTarget.value);
              }
            : undefined
        }
      />
      {semBotao ? null : (
        <button type="button" onClick={onSubmit ? () => onSubmit(valor || '') : undefined}>
          {botao}
        </button>
      )}
    </label>
  );
}
