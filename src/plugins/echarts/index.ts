import { Bar3DChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";
import {
  BarChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  PieChart,
  ScatterChart
} from "echarts/charts";
import {
  CalendarComponent,
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import type { App } from "vue";

const { use } = echarts;

use([
  PieChart,
  BarChart,
  LineChart,
  GaugeChart,
  HeatmapChart,
  ScatterChart,
  Bar3DChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  LegendComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  CalendarComponent,
  Grid3DComponent
]);

/**
 * @description 按需引入echarts
 * @see {@link https://echarts.apache.org/handbook/zh/basics/import#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6}
 * @see 温馨提示：必须将 `$echarts` 添加到全局 `globalProperties` ，为了配合 https://pure-admin-utils.netlify.app/hooks/useEcharts/useEcharts.html 使用
 */
export function useEcharts(app: App) {
  app.config.globalProperties.$echarts = echarts;
}

export default echarts;
