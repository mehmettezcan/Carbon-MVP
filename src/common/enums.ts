export enum ScopeKind { SCOPE1 = 'SCOPE1', SCOPE2 = 'SCOPE2' }
export const SOURCE_SCOPE: Record<string, ScopeKind> = {
  STATIONARY_FUEL: ScopeKind.SCOPE1,
  MOBILE_FUEL: ScopeKind.SCOPE1,
  FUGITIVE: ScopeKind.SCOPE1,
  PROCESS: ScopeKind.SCOPE1,
  ELECTRICITY: ScopeKind.SCOPE2,
};
