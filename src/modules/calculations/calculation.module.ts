import { Module } from "@nestjs/common";
import { CalculationService } from "./calculation.service";

@Module({
  imports: [],
  providers: [CalculationService],
  controllers: [],
  exports: [CalculationService],
})
export class CalculationModule {}