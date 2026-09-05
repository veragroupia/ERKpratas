'use client';

import { signOut } from 'next-auth/react';
import { Icon } from '../ui/Icon';

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        marginTop: 16,
        minHeight: 52,
        borderRadius: 14,
        background: 'transparent',
        border: '1px solid var(--acao-acento-bg)',
        color: 'var(--acento)',
        fontSize: 14.5,
        fontWeight: 600,
        cursor: 'pointer',
      }}
      className="logout-btn"
    >
      <Icon name="sair" size={17} />
      Sair da conta
    </button>
  );
}
