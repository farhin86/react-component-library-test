import {describe, test, it, expect} from "vitest";
import {FizzBuzz, max} from '../src/Utils/intro';

describe('max', () => {
  it('Should return first argument if it is greater', () => {
    //Arrange
    // const a = 2;
    // const b = 1;
    //Act
    // const result = max(a,b);
    //Assert
    expect(max(2,1)).toBe(2);
  })

  it('Should return second argument if it is greater', () => {
    expect(max(3,7)).toBe(7)
  })
})

describe('FizzBuzz', () => {
  
  it('Should return FizzBuzz if it is divisible by 3 and 5',() => {
    expect(FizzBuzz(15)).toBe('FizzBuzz')
  })

  it('Should return "Fizz" if it is divisible by 3',() => {
    expect(FizzBuzz(6)).toBe('Fizz')
  })

  it('Should return "Buzz" if it is divisible by 5',() => {
    expect(FizzBuzz(5)).toBe('Buzz')
  })

  it('Should return the number as string if it is not divisible by 3 or 5', () => {
    expect(FizzBuzz(8)).toBe('8');
  })
})
