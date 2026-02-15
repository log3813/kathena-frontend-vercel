// src/shared/components/auth/RoleGuard.tsx 가이드 7번 내용
'use client';

import { ReactNode } from 'react';

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  // 현재는 테스트를 위해 무조건 보여주도록 설정 (나중에 로그인 연동 시 수정)
  const userRole = 'ADMIN'; 
  
  if (!allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}