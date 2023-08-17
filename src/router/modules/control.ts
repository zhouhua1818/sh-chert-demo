import { $t } from "@/plugins/i18n";

export default {
  path: "/control",
  redirect: "/control/403",
  meta: {
    icon: "informationLine",
    title: $t("menus.control"),
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/control/gauge",
      name: "Gauge",
      component: () => import("@/views/control/gauge.vue"),
      meta: {
        title: $t("menus.gauge")
      }
    },
    {
      path: "/control/line",
      name: "Line",
      component: () => import("@/views/control/line.vue"),
      meta: {
        title: $t("menus.line")
      }
    },
    {
      path: "/control/heatmap",
      name: "Heatmap",
      component: () => import("@/views/control/heatmap.vue"),
      meta: {
        title: $t("menus.heatmap")
      }
    },
    {
      path: "/control/barBrush",
      name: "BarBrush",
      component: () => import("@/views/control/barBrush.vue"),
      meta: {
        title: $t("menus.barBrush")
      }
    }
  ]
} as RouteConfigsTable;
