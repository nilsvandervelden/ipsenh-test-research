import { Test, TestingModule } from "@nestjs/testing";
import { CalculationService } from "../calculations/calculation.service"

describe('CalculationService', () => {
  let calculationService: CalculationService;
  const x = 1;
  const y = 2;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [CalculationService],
    }).compile();

    calculationService = module.get<CalculationService>(CalculationService);
  });

  it('Should be defined', () => {
    expect(calculationService).toBeDefined();
  })

  it('Should return three when sum method is called with one and two', () => {
    const expectedValue = 3;

    const actualValue = calculationService.sum(x, y);

    expect(actualValue).toBe(expectedValue)
    expect(actualValue).not.toBe(expectedValue + 1);
    expect(actualValue).toBeGreaterThan(expectedValue - 1);
    expect(actualValue).toBeLessThan(expectedValue + 1);
    expect(actualValue).toBeCloseTo(expectedValue);
  }) 

  it('Should return -1 when diff method is called with one and two', () => {
    const expectedValue = -1;

    const actualValue = calculationService.diff(x, y);

    expect(actualValue).toBe(expectedValue)
    expect(actualValue).not.toBe(expectedValue + 1);
    expect(actualValue).toBeGreaterThan(expectedValue - 1);
    expect(actualValue).toBeLessThan(expectedValue + 1);
    expect(actualValue).toBeCloseTo(expectedValue);
    expect(typeof actualValue).toBe("number");
  }) 

  it('Should return 2 when mul method is called with one and two', () => {
    const expectedValue = 2;

    const actualValue = calculationService.mul(x, y);

    expect(actualValue).toBe(expectedValue)
    expect(actualValue).not.toBe(expectedValue + 1);
    expect(actualValue).toBeGreaterThan(expectedValue - 1);
    expect(actualValue).toBeLessThan(expectedValue + 1);
    expect(actualValue).toBeCloseTo(expectedValue);
    expect(typeof actualValue).toBe("number");
  }) 

  it('Should return 0.5 when div method is called with one and two', () => {
    const expectedValue = 0.5;

    const actualValue = calculationService.div(x, y);

    expect(actualValue).toBe(expectedValue)
    expect(actualValue).not.toBe(expectedValue + 1);
    expect(actualValue).toBeGreaterThan(expectedValue - 1);
    expect(actualValue).toBeLessThan(expectedValue + 1);
    expect(actualValue).toBeCloseTo(expectedValue);
    expect(typeof actualValue).toBe("number");
  }) 

  it('Should return1 when div method is called with one and two', () => {
    const expectedValue = 1;

    const actualValue = calculationService.mod(x, y);

    expect(actualValue).toBe(expectedValue)
    expect(actualValue).not.toBe(expectedValue + 1);
    expect(actualValue).toBeGreaterThan(expectedValue - 1);
    expect(actualValue).toBeLessThan(expectedValue + 1);
    expect(actualValue).toBeCloseTo(expectedValue);
    expect(typeof actualValue).toBe("number");
  }) 
})
