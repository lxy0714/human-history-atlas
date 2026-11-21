// echarts 统一按需注册，业务文件只 import 这个文件
// 避免每个图表都 import 'echarts' 导致 tree-shaking 失效
import * as echarts from 'echarts/core';

import {
  BarChart,
  LineChart,
  PieChart,
  GraphChart,
} from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
  CanvasRenderer,
]);

export { echarts };
