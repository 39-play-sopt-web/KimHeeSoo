export const formatSeconds = (ms) => (ms / 1000).toFixed(2); //toFixed(자릿수): 소수점 아래 자릿수를 고정한 문자열로 변환
export const formatDate = (iso) => new Date(iso).toLocaleString('ko-KR'); // 현재 시각 저장

