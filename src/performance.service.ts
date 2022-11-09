import { Injectable } from '@nestjs/common';
import * as os from 'os';


@Injectable()
export class PerformanceService {

  private startCPULoad: os.CpuInfo[] = os.cpus();

  public startAverageCPULoadMeasurement(): void {
    this.startCPULoad = os.cpus();
  }

  public getAverageCPULoad(): number {
    const startCPULoad = this.startCPULoad;
    const totals = os.cpus().reduce(
      function (totals, end, i) {
        const busy =
          end.times.user +
          end.times.sys -
          startCPULoad[i].times.user -
          startCPULoad[i].times.sys;
        totals.total += busy + end.times.idle - startCPULoad[i].times.idle;
        totals.busy += busy;
        return totals;
      },
      { busy: 0, total: 0 },
    );

    const averageCPULoad = (totals.busy / totals.total) * 100;
    return averageCPULoad === averageCPULoad ? averageCPULoad : 0;
  }

}
