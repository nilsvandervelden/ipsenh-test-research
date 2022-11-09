import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { PerformanceService } from '../../performance.service';
import { CalculationService } from '../calculations/calculation.service';
import { performance } from 'perf_hooks';

describe('AppController', () => {
  let startTime;
  let appController: AppController;
  let performanceService: PerformanceService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PerformanceService],
    }).compile();

    performanceService = app.get<PerformanceService>(PerformanceService);
    appController = app.get<AppController>(AppController);

    performanceService.startAverageCPULoadMeasurement();
    startTime = performance.now();
  });

  afterAll(() => {
    const averageCPULoad = performanceService.getAverageCPULoad();
    const endTime = performance.now();
    console.log('_____________App.Controller_____________ ');
    console.log('Test duration: ');
    console.log(endTime - startTime);
    console.log('Average cpu load: ');
    console.log(averageCPULoad);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
