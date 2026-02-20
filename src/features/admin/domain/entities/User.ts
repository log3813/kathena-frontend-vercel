export type { UserRole, UserStatus } from '@/shared/types/enums';

// 필요하면 공유 User를 import해서 사용하거나
export type { User } from '@/shared/types';

export interface UserStats {
  pending: number;
  members: number;
  total: number;
}
