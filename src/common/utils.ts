import { SOURCE_SCOPE, ScopeKind } from './enums';
import { SourceType } from '@prisma/client';

export function computeEmissionKg(activityValue: number, emissionFactorKgPerUnit: number) {
  return activityValue * emissionFactorKgPerUnit;
}
export function inferScope(type: SourceType): ScopeKind {
  return (SOURCE_SCOPE as any)[type] ?? ScopeKind.SCOPE1;
}
