export function max(a: number, b: number) {
    // if(a>b) return a;
    // if(b>a) return b;
    // return a;
    return a>b ? a : b;
}

export function FizzBuzz(n: number) {
    if(n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
    if(n % 3 === 0) return 'Fizz';
    if(n % 5 === 0) return 'Buzz';
    return n.toString();
}