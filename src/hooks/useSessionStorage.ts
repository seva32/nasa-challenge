const prefix = 'crm-onboarding__';

/**
 * A hook to manage sessionStorage globally instead of operating sessionStorage directly in components.
 *
 * @returns The functions: `getSessionItem`, `setSessionItem` and `clearSessionItem`.
 */
export const useSession = <T extends Record<string, unknown>>() => {
  const getSessionItem = <K extends Extract<keyof T, string>>(key: K): T[K] | null => {
    const value = window.sessionStorage.getItem(`${prefix}${key}`);
    return value === null ? null : JSON.parse(value);
  };

  const setSessionItem = <K extends Extract<keyof T, string>>(key: K, value: T[K]): void => {
    window.sessionStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
  };

  const clearSessionItem = <K extends Extract<keyof T, string>>(key: K): void => {
    window.sessionStorage.removeItem(`${prefix}${key}`);
  };

  return {getSessionItem, setSessionItem, clearSessionItem};
};
