import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculationService {
  constructor() {}

  //adding values
  sum(a: number, b: number): number {
    return a + b;
  }
  
  //diff between values
  diff(a: number, b: number): number {
    return a - b;
  }
  
  //multiplying values
  mul(a: number, b: number): number {
    return a * b;
  }
  
  //dividing values
  div(a: number, b: number): number {
    return a / b;
  }
  
  //modulus values
  mod(a: number, b: number): number {
    return a % b;
  }
}