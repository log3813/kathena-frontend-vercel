export const POINT_STEP = 5;
export const MIN_POINTS = -999999;
export const MAX_POINTS = 999999;

export const sanitizeNumberInput = (value: string): string => {
  // Remove all non-numeric characters except leading minus sign
  const sanitized = value.replace(/[^\d-]/g, '');
  
  // Remove minus if it's not at the start
  if (sanitized.includes('-') && sanitized.indexOf('-') !== 0) {
    return sanitized.replace(/-/g, '');
  }
  
  return sanitized;
};

export const isValidPoint = (value: string): boolean => {
  if (!value) return false;
  
  const num = Number(value);
  
  if (isNaN(num)) return false;
  if (num > MAX_POINTS || num < MIN_POINTS) return false;
  
  return true;
};

export const applyBulkPoints = (
  currentPoints: Record<number, number>,
  userIds: number[],
  amount: number
): Record<number, number> => {
  const result = { ...currentPoints };
  
  userIds.forEach(id => {
    const newPoints = applyPoints(currentPoints[id] ?? 0, amount);
    result[id] = newPoints;
  });
  
  return result;
};

export const applyPoints = (currentPoint: number, amount: number): number => {
  const newPoints = currentPoint + amount;
  
  // Clamp to valid range
  return Math.max(MIN_POINTS, Math.min(MAX_POINTS, newPoints));
};
