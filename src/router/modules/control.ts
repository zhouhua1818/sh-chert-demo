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
    },
    {
      path: "/control/bar3D",
      name: "Bar3D",
      component: () => import("@/views/control/bar3D.vue"),
      meta: {
        title: $t("menus.bar3D")
      }
    },
    {
      path: "/control/calendarPie",
      name: "Pie",
      component: () => import("@/views/control/calendarPie.vue"),
      meta: {
        title: $t("menus.calendarPie")
      }
    },
    {
      path: "/control/calendar",
      name: "calendar",
      component: () => import("@/views/control/calendar.vue"),
      meta: {
        title: $t("menus.calendar")
      }
    }
  ]
} as RouteConfigsTable;
