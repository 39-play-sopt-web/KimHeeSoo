export const shuffle = (array) => {
  const result = [...array]; // 원본 바뀜 방지

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Math.floor(): 소수점 버림
    [result[i], result[j]] = [result[j], result[i]]; // 배열 구조 분해 할당을 통해 두 값 교환
  }
  return result;
};

// start부터 end까지 숫자 배열 생성
export const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i); // 배열 끝에 추가
  }
  return result;
};

