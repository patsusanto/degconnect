import React, { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_INTERESTS } from '@/constants/interests';

type AccountData = {
  name: string;
  email: string;
  city: string;
  interests: string[];
};

type OnboardingContextValue = {
  account: AccountData;
  hasCompletedOnboarding: boolean;
  completeOnboarding: (nextAccount: AccountData) => void;
  updateInterests: (interests: string[]) => void;
};

const DEFAULT_ACCOUNT: AccountData = {
  name: 'Marco',
  email: 'marco@example.com',
  city: 'Deggendorf',
  interests: DEFAULT_INTERESTS,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<AccountData>(DEFAULT_ACCOUNT);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const value = useMemo(
    () => ({
      account,
      hasCompletedOnboarding,
      completeOnboarding: (nextAccount: AccountData) => {
        setAccount(nextAccount);
        setHasCompletedOnboarding(true);
      },
      updateInterests: (interests: string[]) => {
        setAccount(prev => ({ ...prev, interests }));
      },
    }),
    [account, hasCompletedOnboarding],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const value = useContext(OnboardingContext);

  if (!value) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }

  return value;
}
