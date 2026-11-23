import { STORAGE_KEY } from '../constants/game.js' 

// 기록 불러오기
export const loadRecords = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (err) {
        console.log(err);
        return [];
    }
}; // try...catch를 통해 에러가 나도 프로그램이 멈추지 않고 실행할 수 있도록 구현

// 기록 하나 추가
export const saveRecord = (record) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...loadRecords(), record])); // JSON.stringfy : 배열과 객체를 문자열로 변경
    } catch (err) {
        console.log(err);}

};

// 모든 기록 삭제 
export const deleteAllRecords = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.log(err);}
    
}