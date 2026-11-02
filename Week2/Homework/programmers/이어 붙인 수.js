function solution(num_list) {
    let odd = 0;
    let even = 0;
    
    num_list.forEach((num) => {
        if(num % 2) {
           odd = odd * 10 + num;}
        else {
           even = even * 10 + num;
        }
    });
    return odd + even;
}  