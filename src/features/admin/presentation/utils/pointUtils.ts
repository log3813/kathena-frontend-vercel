export const POINT_STEP = 5;
export const MIN_POINTS = -999999;
export const MAX_POINTS = 999999;


// 숫자 입력값 검증 및 포맷팅
export const sanitizeNumberInput = (value: string): string => {
    if (value === '') return '';
    
    // 숫자와 마이너스 기호만 허용
    let filtered = value.replace(/[^0-9-]/g, '');
    
    // 마이너스 기호는 맨 앞에만 허용
    if (filtered.includes('-')) {
        const isNegative = filtered.startsWith('-');
        filtered = filtered.replace(/-/g, '');
        filtered = isNegative ? `-${filtered}` : filtered;
    }
    
    return filtered;
};

// 포인트 값 유효성 검사
export const isValidPoint = (value: string): boolean => {
    if (value === '' || value === '-') return false;
    const num = Number(value);
    return !isNaN(num) && num >= MIN_POINTS && num <= MAX_POINTS;
};

// 포인트 포맷팅
export const formatPoints = (points: number): string => {
    return points.toLocaleString();
};