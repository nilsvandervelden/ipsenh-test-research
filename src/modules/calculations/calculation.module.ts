import { Module } from "@nestjs/common";
import { CalculationService } from "./calculation.service";
import { AppModule } from '../../app.module';

@Module({
  imports: [],
  providers: [CalculationService],
  controllers: [],
  exports: [CalculationService],
})
export class CalculationModule {}