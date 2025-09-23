var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as t from "react";
import t__default, { forwardRef, useEffect, useRef, useLayoutEffect, useReducer, useState, cloneElement, isValidElement, createContext, useContext, Component } from "react";
import { StaticRouter } from "react-router-dom/server.mjs";
import { renderToString } from "react-dom/server";
import { useLocation, Link, Outlet, Navigate, useParams, Routes, Route } from "react-router-dom";
import c, { clsx } from "clsx";
import jwt_decode from "jwt-decode";
import FormData$1 from "form-data";
import crypto from "crypto";
import url from "url";
import proxyFromEnv from "proxy-from-env";
import http from "http";
import https from "https";
import util from "util";
import followRedirects from "follow-redirects";
import zlib from "zlib";
import stream, { Readable } from "stream";
import { EventEmitter } from "events";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Avatar as Avatar$1, AvatarImage as AvatarImage$1 } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { Helmet as Helmet$1 } from "react-helmet";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { X, PenSquare, Upload, Loader2, Text, Mail, LogOut, ChevronRight, ChevronLeft, Calendar as Calendar$1 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { differenceInCalendarDays, format, addDays, differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
const u = (t2) => "number" == typeof t2 && !isNaN(t2), d = (t2) => "string" == typeof t2, p = (t2) => "function" == typeof t2, m = (t2) => d(t2) || p(t2) ? t2 : null, f = (t2) => isValidElement(t2) || d(t2) || p(t2) || u(t2);
function g(t2, e, n) {
  void 0 === n && (n = 300);
  const { scrollHeight: o, style: s } = t2;
  requestAnimationFrame(() => {
    s.minHeight = "initial", s.height = o + "px", s.transition = `all ${n}ms`, requestAnimationFrame(() => {
      s.height = "0", s.padding = "0", s.margin = "0", setTimeout(e, n);
    });
  });
}
function h(e) {
  let { enter: a, exit: r, appendPosition: i = false, collapse: l = true, collapseDuration: c2 = 300 } = e;
  return function(e2) {
    let { children: u2, position: d2, preventExitTransition: p2, done: m2, nodeRef: f2, isIn: h2 } = e2;
    const y2 = i ? `${a}--${d2}` : a, v2 = i ? `${r}--${d2}` : r, T2 = useRef(0);
    return useLayoutEffect(() => {
      const t2 = f2.current, e3 = y2.split(" "), n = (o) => {
        o.target === f2.current && (t2.dispatchEvent(new Event("d")), t2.removeEventListener("animationend", n), t2.removeEventListener("animationcancel", n), 0 === T2.current && "animationcancel" !== o.type && t2.classList.remove(...e3));
      };
      t2.classList.add(...e3), t2.addEventListener("animationend", n), t2.addEventListener("animationcancel", n);
    }, []), useEffect(() => {
      const t2 = f2.current, e3 = () => {
        t2.removeEventListener("animationend", e3), l ? g(t2, m2, c2) : m2();
      };
      h2 || (p2 ? e3() : (T2.current = 1, t2.className += ` ${v2}`, t2.addEventListener("animationend", e3)));
    }, [h2]), t__default.createElement(t__default.Fragment, null, u2);
  };
}
function y(t2, e) {
  return null != t2 ? { content: t2.content, containerId: t2.props.containerId, id: t2.props.toastId, theme: t2.props.theme, type: t2.props.type, data: t2.props.data || {}, isLoading: t2.props.isLoading, icon: t2.props.icon, status: e } : {};
}
const v = { list: /* @__PURE__ */ new Map(), emitQueue: /* @__PURE__ */ new Map(), on(t2, e) {
  return this.list.has(t2) || this.list.set(t2, []), this.list.get(t2).push(e), this;
}, off(t2, e) {
  if (e) {
    const n = this.list.get(t2).filter((t3) => t3 !== e);
    return this.list.set(t2, n), this;
  }
  return this.list.delete(t2), this;
}, cancelEmit(t2) {
  const e = this.emitQueue.get(t2);
  return e && (e.forEach(clearTimeout), this.emitQueue.delete(t2)), this;
}, emit(t2) {
  this.list.has(t2) && this.list.get(t2).forEach((e) => {
    const n = setTimeout(() => {
      e(...[].slice.call(arguments, 1));
    }, 0);
    this.emitQueue.has(t2) || this.emitQueue.set(t2, []), this.emitQueue.get(t2).push(n);
  });
} }, T = (e) => {
  let { theme: n, type: o, ...s } = e;
  return t__default.createElement("svg", { viewBox: "0 0 24 24", width: "100%", height: "100%", fill: "colored" === n ? "currentColor" : `var(--toastify-icon-color-${o})`, ...s });
}, E = { info: function(e) {
  return t__default.createElement(T, { ...e }, t__default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z" }));
}, warning: function(e) {
  return t__default.createElement(T, { ...e }, t__default.createElement("path", { d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" }));
}, success: function(e) {
  return t__default.createElement(T, { ...e }, t__default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" }));
}, error: function(e) {
  return t__default.createElement(T, { ...e }, t__default.createElement("path", { d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" }));
}, spinner: function() {
  return t__default.createElement("div", { className: "Toastify__spinner" });
} };
function C(t2) {
  const [, o] = useReducer((t3) => t3 + 1, 0), [l, c2] = useState([]), g2 = useRef(null), h2 = useRef(/* @__PURE__ */ new Map()).current, T2 = (t3) => -1 !== l.indexOf(t3), C2 = useRef({ toastKey: 1, displayedToast: 0, count: 0, queue: [], props: t2, containerId: null, isToastActive: T2, getToast: (t3) => h2.get(t3) }).current;
  function b2(t3) {
    let { containerId: e } = t3;
    const { limit: n } = C2.props;
    !n || e && C2.containerId !== e || (C2.count -= C2.queue.length, C2.queue = []);
  }
  function I2(t3) {
    c2((e) => null == t3 ? [] : e.filter((e2) => e2 !== t3));
  }
  function _2() {
    const { toastContent: t3, toastProps: e, staleId: n } = C2.queue.shift();
    O2(t3, e, n);
  }
  function L2(t3, n) {
    let { delay: s, staleId: r, ...i } = n;
    if (!f(t3) || function(t4) {
      return !g2.current || C2.props.enableMultiContainer && t4.containerId !== C2.props.containerId || h2.has(t4.toastId) && null == t4.updateId;
    }(i)) return;
    const { toastId: l2, updateId: c3, data: T3 } = i, { props: b3 } = C2, L3 = () => I2(l2), N2 = null == c3;
    N2 && C2.count++;
    const M2 = { ...b3, style: b3.toastStyle, key: C2.toastKey++, ...Object.fromEntries(Object.entries(i).filter((t4) => {
      let [e, n2] = t4;
      return null != n2;
    })), toastId: l2, updateId: c3, data: T3, closeToast: L3, isIn: false, className: m(i.className || b3.toastClassName), bodyClassName: m(i.bodyClassName || b3.bodyClassName), progressClassName: m(i.progressClassName || b3.progressClassName), autoClose: !i.isLoading && (R2 = i.autoClose, w2 = b3.autoClose, false === R2 || u(R2) && R2 > 0 ? R2 : w2), deleteToast() {
      const t4 = y(h2.get(l2), "removed");
      h2.delete(l2), v.emit(4, t4);
      const e = C2.queue.length;
      if (C2.count = null == l2 ? C2.count - C2.displayedToast : C2.count - 1, C2.count < 0 && (C2.count = 0), e > 0) {
        const t5 = null == l2 ? C2.props.limit : 1;
        if (1 === e || 1 === t5) C2.displayedToast++, _2();
        else {
          const n2 = t5 > e ? e : t5;
          C2.displayedToast = n2;
          for (let t6 = 0; t6 < n2; t6++) _2();
        }
      } else o();
    } };
    var R2, w2;
    M2.iconOut = function(t4) {
      let { theme: n2, type: o2, isLoading: s2, icon: r2 } = t4, i2 = null;
      const l3 = { theme: n2, type: o2 };
      return false === r2 || (p(r2) ? i2 = r2(l3) : isValidElement(r2) ? i2 = cloneElement(r2, l3) : d(r2) || u(r2) ? i2 = r2 : s2 ? i2 = E.spinner() : ((t5) => t5 in E)(o2) && (i2 = E[o2](l3))), i2;
    }(M2), p(i.onOpen) && (M2.onOpen = i.onOpen), p(i.onClose) && (M2.onClose = i.onClose), M2.closeButton = b3.closeButton, false === i.closeButton || f(i.closeButton) ? M2.closeButton = i.closeButton : true === i.closeButton && (M2.closeButton = !f(b3.closeButton) || b3.closeButton);
    let x = t3;
    isValidElement(t3) && !d(t3.type) ? x = cloneElement(t3, { closeToast: L3, toastProps: M2, data: T3 }) : p(t3) && (x = t3({ closeToast: L3, toastProps: M2, data: T3 })), b3.limit && b3.limit > 0 && C2.count > b3.limit && N2 ? C2.queue.push({ toastContent: x, toastProps: M2, staleId: r }) : u(s) ? setTimeout(() => {
      O2(x, M2, r);
    }, s) : O2(x, M2, r);
  }
  function O2(t3, e, n) {
    const { toastId: o2 } = e;
    n && h2.delete(n);
    const s = { content: t3, props: e };
    h2.set(o2, s), c2((t4) => [...t4, o2].filter((t5) => t5 !== n)), v.emit(4, y(s, null == s.props.updateId ? "added" : "updated"));
  }
  return useEffect(() => (C2.containerId = t2.containerId, v.cancelEmit(3).on(0, L2).on(1, (t3) => g2.current && I2(t3)).on(5, b2).emit(2, C2), () => {
    h2.clear(), v.emit(3, C2);
  }), []), useEffect(() => {
    C2.props = t2, C2.isToastActive = T2, C2.displayedToast = l.length;
  }), { getToastToRender: function(e) {
    const n = /* @__PURE__ */ new Map(), o2 = Array.from(h2.values());
    return t2.newestOnTop && o2.reverse(), o2.forEach((t3) => {
      const { position: e2 } = t3.props;
      n.has(e2) || n.set(e2, []), n.get(e2).push(t3);
    }), Array.from(n, (t3) => e(t3[0], t3[1]));
  }, containerRef: g2, isToastActive: T2 };
}
function b(t2) {
  return t2.targetTouches && t2.targetTouches.length >= 1 ? t2.targetTouches[0].clientX : t2.clientX;
}
function I(t2) {
  return t2.targetTouches && t2.targetTouches.length >= 1 ? t2.targetTouches[0].clientY : t2.clientY;
}
function _(t2) {
  const [o, a] = useState(false), [r, l] = useState(false), c2 = useRef(null), u2 = useRef({ start: 0, x: 0, y: 0, delta: 0, removalDistance: 0, canCloseOnClick: true, canDrag: false, boundingRect: null, didMove: false }).current, d2 = useRef(t2), { autoClose: m2, pauseOnHover: f2, closeToast: g2, onClick: h2, closeOnClick: y2 } = t2;
  function v2(e) {
    if (t2.draggable) {
      "touchstart" === e.nativeEvent.type && e.nativeEvent.preventDefault(), u2.didMove = false, document.addEventListener("mousemove", _2), document.addEventListener("mouseup", L2), document.addEventListener("touchmove", _2), document.addEventListener("touchend", L2);
      const n = c2.current;
      u2.canCloseOnClick = true, u2.canDrag = true, u2.boundingRect = n.getBoundingClientRect(), n.style.transition = "", u2.x = b(e.nativeEvent), u2.y = I(e.nativeEvent), "x" === t2.draggableDirection ? (u2.start = u2.x, u2.removalDistance = n.offsetWidth * (t2.draggablePercent / 100)) : (u2.start = u2.y, u2.removalDistance = n.offsetHeight * (80 === t2.draggablePercent ? 1.5 * t2.draggablePercent : t2.draggablePercent / 100));
    }
  }
  function T2(e) {
    if (u2.boundingRect) {
      const { top: n, bottom: o2, left: s, right: a2 } = u2.boundingRect;
      "touchend" !== e.nativeEvent.type && t2.pauseOnHover && u2.x >= s && u2.x <= a2 && u2.y >= n && u2.y <= o2 ? C2() : E2();
    }
  }
  function E2() {
    a(true);
  }
  function C2() {
    a(false);
  }
  function _2(e) {
    const n = c2.current;
    u2.canDrag && n && (u2.didMove = true, o && C2(), u2.x = b(e), u2.y = I(e), u2.delta = "x" === t2.draggableDirection ? u2.x - u2.start : u2.y - u2.start, u2.start !== u2.x && (u2.canCloseOnClick = false), n.style.transform = `translate${t2.draggableDirection}(${u2.delta}px)`, n.style.opacity = "" + (1 - Math.abs(u2.delta / u2.removalDistance)));
  }
  function L2() {
    document.removeEventListener("mousemove", _2), document.removeEventListener("mouseup", L2), document.removeEventListener("touchmove", _2), document.removeEventListener("touchend", L2);
    const e = c2.current;
    if (u2.canDrag && u2.didMove && e) {
      if (u2.canDrag = false, Math.abs(u2.delta) > u2.removalDistance) return l(true), void t2.closeToast();
      e.style.transition = "transform 0.2s, opacity 0.2s", e.style.transform = `translate${t2.draggableDirection}(0)`, e.style.opacity = "1";
    }
  }
  useEffect(() => {
    d2.current = t2;
  }), useEffect(() => (c2.current && c2.current.addEventListener("d", E2, { once: true }), p(t2.onOpen) && t2.onOpen(isValidElement(t2.children) && t2.children.props), () => {
    const t3 = d2.current;
    p(t3.onClose) && t3.onClose(isValidElement(t3.children) && t3.children.props);
  }), []), useEffect(() => (t2.pauseOnFocusLoss && (document.hasFocus() || C2(), window.addEventListener("focus", E2), window.addEventListener("blur", C2)), () => {
    t2.pauseOnFocusLoss && (window.removeEventListener("focus", E2), window.removeEventListener("blur", C2));
  }), [t2.pauseOnFocusLoss]);
  const O2 = { onMouseDown: v2, onTouchStart: v2, onMouseUp: T2, onTouchEnd: T2 };
  return m2 && f2 && (O2.onMouseEnter = C2, O2.onMouseLeave = E2), y2 && (O2.onClick = (t3) => {
    h2 && h2(t3), u2.canCloseOnClick && g2();
  }), { playToast: E2, pauseToast: C2, isRunning: o, preventExitTransition: r, toastRef: c2, eventHandlers: O2 };
}
function L(e) {
  let { closeToast: n, theme: o, ariaLabel: s = "close" } = e;
  return t__default.createElement("button", { className: `Toastify__close-button Toastify__close-button--${o}`, type: "button", onClick: (t2) => {
    t2.stopPropagation(), n(t2);
  }, "aria-label": s }, t__default.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 14 16" }, t__default.createElement("path", { fillRule: "evenodd", d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" })));
}
function O(e) {
  let { delay: n, isRunning: o, closeToast: s, type: a = "default", hide: r, className: i, style: l, controlledProgress: u2, progress: d2, rtl: m2, isIn: f2, theme: g2 } = e;
  const h2 = r || u2 && 0 === d2, y2 = { ...l, animationDuration: `${n}ms`, animationPlayState: o ? "running" : "paused", opacity: h2 ? 0 : 1 };
  u2 && (y2.transform = `scaleX(${d2})`);
  const v2 = c("Toastify__progress-bar", u2 ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g2}`, `Toastify__progress-bar--${a}`, { "Toastify__progress-bar--rtl": m2 }), T2 = p(i) ? i({ rtl: m2, type: a, defaultClassName: v2 }) : c(v2, i);
  return t__default.createElement("div", { role: "progressbar", "aria-hidden": h2 ? "true" : "false", "aria-label": "notification timer", className: T2, style: y2, [u2 && d2 >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: u2 && d2 < 1 ? null : () => {
    f2 && s();
  } });
}
const N = (n) => {
  const { isRunning: o, preventExitTransition: s, toastRef: r, eventHandlers: i } = _(n), { closeButton: l, children: u2, autoClose: d2, onClick: m2, type: f2, hideProgressBar: g2, closeToast: h2, transition: y2, position: v2, className: T2, style: E2, bodyClassName: C2, bodyStyle: b2, progressClassName: I2, progressStyle: N2, updateId: M2, role: R2, progress: w2, rtl: x, toastId: $, deleteToast: k2, isIn: P2, isLoading: B2, iconOut: D2, closeOnClick: A2, theme: z2 } = n, F2 = c("Toastify__toast", `Toastify__toast-theme--${z2}`, `Toastify__toast--${f2}`, { "Toastify__toast--rtl": x }, { "Toastify__toast--close-on-click": A2 }), H2 = p(T2) ? T2({ rtl: x, position: v2, type: f2, defaultClassName: F2 }) : c(F2, T2), S2 = !!w2 || !d2, q2 = { closeToast: h2, type: f2, theme: z2 };
  let Q2 = null;
  return false === l || (Q2 = p(l) ? l(q2) : isValidElement(l) ? cloneElement(l, q2) : L(q2)), t__default.createElement(y2, { isIn: P2, done: k2, position: v2, preventExitTransition: s, nodeRef: r }, t__default.createElement("div", { id: $, onClick: m2, className: H2, ...i, style: E2, ref: r }, t__default.createElement("div", { ...P2 && { role: R2 }, className: p(C2) ? C2({ type: f2 }) : c("Toastify__toast-body", C2), style: b2 }, null != D2 && t__default.createElement("div", { className: c("Toastify__toast-icon", { "Toastify--animate-icon Toastify__zoom-enter": !B2 }) }, D2), t__default.createElement("div", null, u2)), Q2, t__default.createElement(O, { ...M2 && !S2 ? { key: `pb-${M2}` } : {}, rtl: x, theme: z2, delay: d2, isRunning: o, isIn: P2, closeToast: h2, hide: g2, type: f2, style: N2, className: I2, controlledProgress: S2, progress: w2 || 0 })));
}, M = function(t2, e) {
  return void 0 === e && (e = false), { enter: `Toastify--animate Toastify__${t2}-enter`, exit: `Toastify--animate Toastify__${t2}-exit`, appendPosition: e };
}, R = h(M("bounce", true)), w = h(M("slide", true));
h(M("zoom"));
h(M("flip"));
const k = forwardRef((e, n) => {
  const { getToastToRender: o, containerRef: a, isToastActive: r } = C(e), { className: i, style: l, rtl: u2, containerId: d2 } = e;
  function f2(t2) {
    const e2 = c("Toastify__toast-container", `Toastify__toast-container--${t2}`, { "Toastify__toast-container--rtl": u2 });
    return p(i) ? i({ position: t2, rtl: u2, defaultClassName: e2 }) : c(e2, m(i));
  }
  return useEffect(() => {
    n && (n.current = a.current);
  }, []), t__default.createElement("div", { ref: a, className: "Toastify", id: d2 }, o((e2, n2) => {
    const o2 = n2.length ? { ...l } : { ...l, pointerEvents: "none" };
    return t__default.createElement("div", { className: f2(e2), style: o2, key: `container-${e2}` }, n2.map((e3, o3) => {
      let { content: s, props: a2 } = e3;
      return t__default.createElement(N, { ...a2, isIn: r(a2.toastId), style: { ...a2.style, "--nth": o3 + 1, "--len": n2.length }, key: `toast-${a2.key}` }, s);
    }));
  }));
});
k.displayName = "ToastContainer", k.defaultProps = { position: "top-right", transition: R, autoClose: 5e3, closeButton: L, pauseOnHover: true, pauseOnFocusLoss: true, closeOnClick: true, draggable: true, draggablePercent: 80, draggableDirection: "x", role: "alert", theme: "light" };
let P, B = /* @__PURE__ */ new Map(), D = [], A = 1;
function z() {
  return "" + A++;
}
function F(t2) {
  return t2 && (d(t2.toastId) || u(t2.toastId)) ? t2.toastId : z();
}
function H(t2, e) {
  return B.size > 0 ? v.emit(0, t2, e) : D.push({ content: t2, options: e }), e.toastId;
}
function S(t2, e) {
  return { ...e, type: e && e.type || t2, toastId: F(e) };
}
function q(t2) {
  return (e, n) => H(e, S(t2, n));
}
function Q(t2, e) {
  return H(t2, S("default", e));
}
Q.loading = (t2, e) => H(t2, S("default", { isLoading: true, autoClose: false, closeOnClick: false, closeButton: false, draggable: false, ...e })), Q.promise = function(t2, e, n) {
  let o, { pending: s, error: a, success: r } = e;
  s && (o = d(s) ? Q.loading(s, n) : Q.loading(s.render, { ...n, ...s }));
  const i = { isLoading: null, autoClose: null, closeOnClick: null, closeButton: null, draggable: null }, l = (t3, e2, s2) => {
    if (null == e2) return void Q.dismiss(o);
    const a2 = { type: t3, ...i, ...n, data: s2 }, r2 = d(e2) ? { render: e2 } : e2;
    return o ? Q.update(o, { ...a2, ...r2 }) : Q(r2.render, { ...a2, ...r2 }), s2;
  }, c2 = p(t2) ? t2() : t2;
  return c2.then((t3) => l("success", r, t3)).catch((t3) => l("error", a, t3)), c2;
}, Q.success = q("success"), Q.info = q("info"), Q.error = q("error"), Q.warning = q("warning"), Q.warn = Q.warning, Q.dark = (t2, e) => H(t2, S("default", { theme: "dark", ...e })), Q.dismiss = (t2) => {
  B.size > 0 ? v.emit(1, t2) : D = D.filter((e) => null != t2 && e.options.toastId !== t2);
}, Q.clearWaitingQueue = function(t2) {
  return void 0 === t2 && (t2 = {}), v.emit(5, t2);
}, Q.isActive = (t2) => {
  let e = false;
  return B.forEach((n) => {
    n.isToastActive && n.isToastActive(t2) && (e = true);
  }), e;
}, Q.update = function(t2, e) {
  void 0 === e && (e = {}), setTimeout(() => {
    const n = function(t3, e2) {
      let { containerId: n2 } = e2;
      const o = B.get(n2 || P);
      return o && o.getToast(t3);
    }(t2, e);
    if (n) {
      const { props: o, content: s } = n, a = { delay: 100, ...o, ...e, toastId: e.toastId || t2, updateId: z() };
      a.toastId !== t2 && (a.staleId = t2);
      const r = a.render || s;
      delete a.render, H(r, a);
    }
  }, 0);
}, Q.done = (t2) => {
  Q.update(t2, { progress: 1 });
}, Q.onChange = (t2) => (v.on(4, t2), () => {
  v.off(4, t2);
}), Q.POSITION = { TOP_LEFT: "top-left", TOP_RIGHT: "top-right", TOP_CENTER: "top-center", BOTTOM_LEFT: "bottom-left", BOTTOM_RIGHT: "bottom-right", BOTTOM_CENTER: "bottom-center" }, Q.TYPE = { INFO: "info", SUCCESS: "success", WARNING: "warning", ERROR: "error", DEFAULT: "default" }, v.on(2, (t2) => {
  P = t2.containerId || t2, B.set(P, t2), D.forEach((t3) => {
    v.emit(0, t3.content, t3.options);
  }), D = [];
}).on(3, (t2) => {
  B.delete(t2.containerId || t2), 0 === B.size && v.off(0).off(1).off(5);
});
const Logo = "/assets/Logo_AtypikHouse-DIBUtg9f.png";
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue2) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue2;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (FormData$1 || FormData)();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams = url.URLSearchParams;
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  const randomValues = new Uint32Array(size);
  crypto.randomFillSync(randomValues);
  for (let i = 0; i < size; i++) {
    str += alphabet[randomValues[i] % length];
  }
  return str;
};
const platform$1 = {
  isNode: true,
  classes: {
    URLSearchParams,
    FormData: FormData$1,
    Blob: typeof Blob !== "undefined" && Blob || null
  },
  ALPHABET,
  generateString,
  protocols: ["http", "https", "file", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format2) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format2 ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const VERSION$1 = "1.10.0";
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}
const DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function fromDataURI(uri, asBlob, options) {
  const _Blob = options && options.Blob || platform.classes.Blob;
  const protocol = parseProtocol(uri);
  if (asBlob === void 0 && _Blob) {
    asBlob = true;
  }
  if (protocol === "data") {
    uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
    const match = DATA_URL_PATTERN.exec(uri);
    if (!match) {
      throw new AxiosError$1("Invalid URL", AxiosError$1.ERR_INVALID_URL);
    }
    const mime = match[1];
    const isBase64 = match[2];
    const body = match[3];
    const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? "base64" : "utf8");
    if (asBlob) {
      if (!_Blob) {
        throw new AxiosError$1("Blob is not supported", AxiosError$1.ERR_NOT_SUPPORT);
      }
      return new _Blob([buffer], { type: mime });
    }
    return buffer;
  }
  throw new AxiosError$1("Unsupported protocol " + protocol, AxiosError$1.ERR_NOT_SUPPORT);
}
const kInternals = Symbol("internals");
class AxiosTransformStream extends stream.Transform {
  constructor(options) {
    options = utils$1.toFlatObject(options, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (prop, source) => {
      return !utils$1.isUndefined(source[prop]);
    });
    super({
      readableHighWaterMark: options.chunkSize
    });
    const internals = this[kInternals] = {
      timeWindow: options.timeWindow,
      chunkSize: options.chunkSize,
      maxRate: options.maxRate,
      minChunkSize: options.minChunkSize,
      bytesSeen: 0,
      isCaptured: false,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (event) => {
      if (event === "progress") {
        if (!internals.isCaptured) {
          internals.isCaptured = true;
        }
      }
    });
  }
  _read(size) {
    const internals = this[kInternals];
    if (internals.onReadCallback) {
      internals.onReadCallback();
    }
    return super._read(size);
  }
  _transform(chunk, encoding, callback) {
    const internals = this[kInternals];
    const maxRate = internals.maxRate;
    const readableHighWaterMark = this.readableHighWaterMark;
    const timeWindow = internals.timeWindow;
    const divider = 1e3 / timeWindow;
    const bytesThreshold = maxRate / divider;
    const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;
    const pushChunk = (_chunk, _callback) => {
      const bytes = Buffer.byteLength(_chunk);
      internals.bytesSeen += bytes;
      internals.bytes += bytes;
      internals.isCaptured && this.emit("progress", internals.bytesSeen);
      if (this.push(_chunk)) {
        process.nextTick(_callback);
      } else {
        internals.onReadCallback = () => {
          internals.onReadCallback = null;
          process.nextTick(_callback);
        };
      }
    };
    const transformChunk = (_chunk, _callback) => {
      const chunkSize = Buffer.byteLength(_chunk);
      let chunkRemainder = null;
      let maxChunkSize = readableHighWaterMark;
      let bytesLeft;
      let passed = 0;
      if (maxRate) {
        const now = Date.now();
        if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
          internals.ts = now;
          bytesLeft = bytesThreshold - internals.bytes;
          internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
          passed = 0;
        }
        bytesLeft = bytesThreshold - internals.bytes;
      }
      if (maxRate) {
        if (bytesLeft <= 0) {
          return setTimeout(() => {
            _callback(null, _chunk);
          }, timeWindow - passed);
        }
        if (bytesLeft < maxChunkSize) {
          maxChunkSize = bytesLeft;
        }
      }
      if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
        chunkRemainder = _chunk.subarray(maxChunkSize);
        _chunk = _chunk.subarray(0, maxChunkSize);
      }
      pushChunk(_chunk, chunkRemainder ? () => {
        process.nextTick(_callback, null, chunkRemainder);
      } : _callback);
    };
    transformChunk(chunk, function transformNextChunk(err, _chunk) {
      if (err) {
        return callback(err);
      }
      if (_chunk) {
        transformChunk(_chunk, transformNextChunk);
      } else {
        callback(null);
      }
    });
  }
}
const { asyncIterator } = Symbol;
const readBlob = async function* (blob) {
  if (blob.stream) {
    yield* blob.stream();
  } else if (blob.arrayBuffer) {
    yield await blob.arrayBuffer();
  } else if (blob[asyncIterator]) {
    yield* blob[asyncIterator]();
  } else {
    yield blob;
  }
};
const BOUNDARY_ALPHABET = platform.ALPHABET.ALPHA_DIGIT + "-_";
const textEncoder = typeof TextEncoder === "function" ? new TextEncoder() : new util.TextEncoder();
const CRLF = "\r\n";
const CRLF_BYTES = textEncoder.encode(CRLF);
const CRLF_BYTES_COUNT = 2;
class FormDataPart {
  constructor(name, value) {
    const { escapeName } = this.constructor;
    const isStringValue = utils$1.isString(value);
    let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
    if (isStringValue) {
      value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
    } else {
      headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
    }
    this.headers = textEncoder.encode(headers + CRLF);
    this.contentLength = isStringValue ? value.byteLength : value.size;
    this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
    this.name = name;
    this.value = value;
  }
  async *encode() {
    yield this.headers;
    const { value } = this;
    if (utils$1.isTypedArray(value)) {
      yield value;
    } else {
      yield* readBlob(value);
    }
    yield CRLF_BYTES;
  }
  static escapeName(name) {
    return String(name).replace(/[\r\n"]/g, (match) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[match]);
  }
}
const formDataToStream = (form, headersHandler, options) => {
  const {
    tag = "form-data-boundary",
    size = 25,
    boundary = tag + "-" + platform.generateString(size, BOUNDARY_ALPHABET)
  } = options || {};
  if (!utils$1.isFormData(form)) {
    throw TypeError("FormData instance required");
  }
  if (boundary.length < 1 || boundary.length > 70) {
    throw Error("boundary must be 10-70 characters long");
  }
  const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
  const footerBytes = textEncoder.encode("--" + boundary + "--" + CRLF);
  let contentLength = footerBytes.byteLength;
  const parts = Array.from(form.entries()).map(([name, value]) => {
    const part = new FormDataPart(name, value);
    contentLength += part.size;
    return part;
  });
  contentLength += boundaryBytes.byteLength * parts.length;
  contentLength = utils$1.toFiniteNumber(contentLength);
  const computedHeaders = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`
  };
  if (Number.isFinite(contentLength)) {
    computedHeaders["Content-Length"] = contentLength;
  }
  headersHandler && headersHandler(computedHeaders);
  return Readable.from(async function* () {
    for (const part of parts) {
      yield boundaryBytes;
      yield* part.encode();
    }
    yield footerBytes;
  }());
};
class ZlibHeaderTransformStream extends stream.Transform {
  __transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
  _transform(chunk, encoding, callback) {
    if (chunk.length !== 0) {
      this._transform = this.__transform;
      if (chunk[0] !== 120) {
        const header = Buffer.alloc(2);
        header[0] = 120;
        header[1] = 156;
        this.push(header, encoding);
      }
    }
    this.__transform(chunk, encoding, callback);
  }
}
const callbackify = (fn, reducer) => {
  return utils$1.isAsyncFn(fn) ? function(...args) {
    const cb = args.pop();
    fn.apply(this, args).then((value) => {
      try {
        reducer ? cb(null, ...reducer(value)) : cb(null, value);
      } catch (err) {
        cb(err);
      }
    }, cb);
  } : fn;
};
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const zlibOptions = {
  flush: zlib.constants.Z_SYNC_FLUSH,
  finishFlush: zlib.constants.Z_SYNC_FLUSH
};
const brotliOptions = {
  flush: zlib.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
};
const isBrotliSupported = utils$1.isFunction(zlib.createBrotliDecompress);
const { http: httpFollow, https: httpsFollow } = followRedirects;
const isHttps = /https:?/;
const supportedProtocols = platform.protocols.map((protocol) => {
  return protocol + ":";
});
const flushOnFinish = (stream2, [throttled, flush]) => {
  stream2.on("end", flush).on("error", flush);
  return throttled;
};
function dispatchBeforeRedirect(options, responseDetails) {
  if (options.beforeRedirects.proxy) {
    options.beforeRedirects.proxy(options);
  }
  if (options.beforeRedirects.config) {
    options.beforeRedirects.config(options, responseDetails);
  }
}
function setProxy(options, configProxy, location) {
  let proxy = configProxy;
  if (!proxy && proxy !== false) {
    const proxyUrl = proxyFromEnv.getProxyForUrl(location);
    if (proxyUrl) {
      proxy = new URL(proxyUrl);
    }
  }
  if (proxy) {
    if (proxy.username) {
      proxy.auth = (proxy.username || "") + ":" + (proxy.password || "");
    }
    if (proxy.auth) {
      if (proxy.auth.username || proxy.auth.password) {
        proxy.auth = (proxy.auth.username || "") + ":" + (proxy.auth.password || "");
      }
      const base64 = Buffer.from(proxy.auth, "utf8").toString("base64");
      options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
    const proxyHost = proxy.hostname || proxy.host;
    options.hostname = proxyHost;
    options.host = proxyHost;
    options.port = proxy.port;
    options.path = location;
    if (proxy.protocol) {
      options.protocol = proxy.protocol.includes(":") ? proxy.protocol : `${proxy.protocol}:`;
    }
  }
  options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
    setProxy(redirectOptions, configProxy, redirectOptions.href);
  };
}
const isHttpAdapterSupported = typeof process !== "undefined" && utils$1.kindOf(process) === "process";
const wrapAsync = (asyncExecutor) => {
  return new Promise((resolve, reject) => {
    let onDone;
    let isDone;
    const done = (value, isRejected) => {
      if (isDone) return;
      isDone = true;
      onDone && onDone(value, isRejected);
    };
    const _resolve = (value) => {
      done(value);
      resolve(value);
    };
    const _reject = (reason) => {
      done(reason, true);
      reject(reason);
    };
    asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
  });
};
const resolveFamily = ({ address, family }) => {
  if (!utils$1.isString(address)) {
    throw TypeError("address must be a string");
  }
  return {
    address,
    family: family || (address.indexOf(".") < 0 ? 6 : 4)
  };
};
const buildAddressEntry = (address, family) => resolveFamily(utils$1.isObject(address) ? address : { address, family });
const httpAdapter = isHttpAdapterSupported && function httpAdapter2(config) {
  return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
    let { data, lookup, family } = config;
    const { responseType, responseEncoding } = config;
    const method = config.method.toUpperCase();
    let isDone;
    let rejected = false;
    let req;
    if (lookup) {
      const _lookup = callbackify(lookup, (value) => utils$1.isArray(value) ? value : [value]);
      lookup = (hostname, opt, cb) => {
        _lookup(hostname, opt, (err, arg0, arg1) => {
          if (err) {
            return cb(err);
          }
          const addresses = utils$1.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
          opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
        });
      };
    }
    const emitter = new EventEmitter();
    const onFinished = () => {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(abort);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", abort);
      }
      emitter.removeAllListeners();
    };
    onDone((value, isRejected) => {
      isDone = true;
      if (isRejected) {
        rejected = true;
        onFinished();
      }
    });
    function abort(reason) {
      emitter.emit("abort", !reason || reason.type ? new CanceledError$1(null, config, req) : reason);
    }
    emitter.once("abort", reject);
    if (config.cancelToken || config.signal) {
      config.cancelToken && config.cancelToken.subscribe(abort);
      if (config.signal) {
        config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
      }
    }
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    const parsed = new URL(fullPath, platform.hasBrowserEnv ? platform.origin : void 0);
    const protocol = parsed.protocol || supportedProtocols[0];
    if (protocol === "data:") {
      let convertedData;
      if (method !== "GET") {
        return settle(resolve, reject, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config
        });
      }
      try {
        convertedData = fromDataURI(config.url, responseType === "blob", {
          Blob: config.env && config.env.Blob
        });
      } catch (err) {
        throw AxiosError$1.from(err, AxiosError$1.ERR_BAD_REQUEST, config);
      }
      if (responseType === "text") {
        convertedData = convertedData.toString(responseEncoding);
        if (!responseEncoding || responseEncoding === "utf8") {
          convertedData = utils$1.stripBOM(convertedData);
        }
      } else if (responseType === "stream") {
        convertedData = stream.Readable.from(convertedData);
      }
      return settle(resolve, reject, {
        data: convertedData,
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders$1(),
        config
      });
    }
    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(new AxiosError$1(
        "Unsupported protocol " + protocol,
        AxiosError$1.ERR_BAD_REQUEST,
        config
      ));
    }
    const headers = AxiosHeaders$1.from(config.headers).normalize();
    headers.set("User-Agent", "axios/" + VERSION$1, false);
    const { onUploadProgress, onDownloadProgress } = config;
    const maxRate = config.maxRate;
    let maxUploadRate = void 0;
    let maxDownloadRate = void 0;
    if (utils$1.isSpecCompliantForm(data)) {
      const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
      data = formDataToStream(data, (formHeaders) => {
        headers.set(formHeaders);
      }, {
        tag: `axios-${VERSION$1}-boundary`,
        boundary: userBoundary && userBoundary[1] || void 0
      });
    } else if (utils$1.isFormData(data) && utils$1.isFunction(data.getHeaders)) {
      headers.set(data.getHeaders());
      if (!headers.hasContentLength()) {
        try {
          const knownLength = await util.promisify(data.getLength).call(data);
          Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
        } catch (e) {
        }
      }
    } else if (utils$1.isBlob(data) || utils$1.isFile(data)) {
      data.size && headers.setContentType(data.type || "application/octet-stream");
      headers.setContentLength(data.size || 0);
      data = stream.Readable.from(readBlob(data));
    } else if (data && !utils$1.isStream(data)) {
      if (Buffer.isBuffer(data)) ;
      else if (utils$1.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils$1.isString(data)) {
        data = Buffer.from(data, "utf-8");
      } else {
        return reject(new AxiosError$1(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        ));
      }
      headers.setContentLength(data.length, false);
      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(new AxiosError$1(
          "Request body larger than maxBodyLength limit",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        ));
      }
    }
    const contentLength = utils$1.toFiniteNumber(headers.getContentLength());
    if (utils$1.isArray(maxRate)) {
      maxUploadRate = maxRate[0];
      maxDownloadRate = maxRate[1];
    } else {
      maxUploadRate = maxDownloadRate = maxRate;
    }
    if (data && (onUploadProgress || maxUploadRate)) {
      if (!utils$1.isStream(data)) {
        data = stream.Readable.from(data, { objectMode: false });
      }
      data = stream.pipeline([data, new AxiosTransformStream({
        maxRate: utils$1.toFiniteNumber(maxUploadRate)
      })], utils$1.noop);
      onUploadProgress && data.on("progress", flushOnFinish(
        data,
        progressEventDecorator(
          contentLength,
          progressEventReducer(asyncDecorator(onUploadProgress), false, 3)
        )
      ));
    }
    let auth = void 0;
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password || "";
      auth = username + ":" + password;
    }
    if (!auth && parsed.username) {
      const urlUsername = parsed.username;
      const urlPassword = parsed.password;
      auth = urlUsername + ":" + urlPassword;
    }
    auth && headers.delete("authorization");
    let path;
    try {
      path = buildURL(
        parsed.pathname + parsed.search,
        config.params,
        config.paramsSerializer
      ).replace(/^\?/, "");
    } catch (err) {
      const customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      return reject(customErr);
    }
    headers.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (isBrotliSupported ? ", br" : ""),
      false
    );
    const options = {
      path,
      method,
      headers: headers.toJSON(),
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth,
      protocol,
      family,
      beforeRedirect: dispatchBeforeRedirect,
      beforeRedirects: {}
    };
    !utils$1.isUndefined(lookup) && (options.lookup = lookup);
    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
      options.port = parsed.port;
      setProxy(options, config.proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
    }
    let transport;
    const isHttpsRequest = isHttps.test(options.protocol);
    options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsRequest ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      if (config.beforeRedirect) {
        options.beforeRedirects.config = config.beforeRedirect;
      }
      transport = isHttpsRequest ? httpsFollow : httpFollow;
    }
    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } else {
      options.maxBodyLength = Infinity;
    }
    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }
    req = transport.request(options, function handleResponse(res) {
      if (req.destroyed) return;
      const streams = [res];
      const responseLength = +res.headers["content-length"];
      if (onDownloadProgress || maxDownloadRate) {
        const transformStream = new AxiosTransformStream({
          maxRate: utils$1.toFiniteNumber(maxDownloadRate)
        });
        onDownloadProgress && transformStream.on("progress", flushOnFinish(
          transformStream,
          progressEventDecorator(
            responseLength,
            progressEventReducer(asyncDecorator(onDownloadProgress), true, 3)
          )
        ));
        streams.push(transformStream);
      }
      let responseStream = res;
      const lastRequest = res.req || req;
      if (config.decompress !== false && res.headers["content-encoding"]) {
        if (method === "HEAD" || res.statusCode === 204) {
          delete res.headers["content-encoding"];
        }
        switch ((res.headers["content-encoding"] || "").toLowerCase()) {
          /*eslint default-case:0*/
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            streams.push(zlib.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "deflate":
            streams.push(new ZlibHeaderTransformStream());
            streams.push(zlib.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "br":
            if (isBrotliSupported) {
              streams.push(zlib.createBrotliDecompress(brotliOptions));
              delete res.headers["content-encoding"];
            }
        }
      }
      responseStream = streams.length > 1 ? stream.pipeline(streams, utils$1.noop) : streams[0];
      const offListeners = stream.finished(responseStream, () => {
        offListeners();
        onFinished();
      });
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: new AxiosHeaders$1(res.headers),
        config,
        request: lastRequest
      };
      if (responseType === "stream") {
        response.data = responseStream;
        settle(resolve, reject, response);
      } else {
        const responseBuffer = [];
        let totalResponseBytes = 0;
        responseStream.on("data", function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            rejected = true;
            responseStream.destroy();
            reject(new AxiosError$1(
              "maxContentLength size of " + config.maxContentLength + " exceeded",
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              lastRequest
            ));
          }
        });
        responseStream.on("aborted", function handlerStreamAborted() {
          if (rejected) {
            return;
          }
          const err = new AxiosError$1(
            "stream has been aborted",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            lastRequest
          );
          responseStream.destroy(err);
          reject(err);
        });
        responseStream.on("error", function handleStreamError(err) {
          if (req.destroyed) return;
          reject(AxiosError$1.from(err, null, config, lastRequest));
        });
        responseStream.on("end", function handleStreamEnd() {
          try {
            let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (responseType !== "arraybuffer") {
              responseData = responseData.toString(responseEncoding);
              if (!responseEncoding || responseEncoding === "utf8") {
                responseData = utils$1.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            return reject(AxiosError$1.from(err, null, config, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }
      emitter.once("abort", (err) => {
        if (!responseStream.destroyed) {
          responseStream.emit("error", err);
          responseStream.destroy();
        }
      });
    });
    emitter.once("abort", (err) => {
      reject(err);
      req.destroy(err);
    });
    req.on("error", function handleRequestError(err) {
      reject(AxiosError$1.from(err, null, config, req));
    });
    req.on("socket", function handleRequestSocket(socket) {
      socket.setKeepAlive(true, 1e3 * 60);
    });
    if (config.timeout) {
      const timeout = parseInt(config.timeout, 10);
      if (Number.isNaN(timeout)) {
        reject(new AxiosError$1(
          "error trying to parse `config.timeout` to int",
          AxiosError$1.ERR_BAD_OPTION_VALUE,
          config,
          req
        ));
        return;
      }
      req.setTimeout(timeout, function handleRequestTimeout() {
        if (isDone) return;
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = config.transitional || transitionalDefaults;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError$1(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          req
        ));
        abort();
      });
    }
    if (utils$1.isStream(data)) {
      let ended = false;
      let errored = false;
      data.on("end", () => {
        ended = true;
      });
      data.once("error", (err) => {
        errored = true;
        req.destroy(err);
      });
      data.on("close", () => {
        if (!ended && !errored) {
          abort(new CanceledError$1("Request stream has been aborted", config, req));
        }
      });
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url2) => {
  url2 = new URL(url2, platform.origin);
  return origin2.protocol === url2.protocol && origin2.host === url2.host && (isMSIE || origin2.port === url2.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b2, prop, caseless) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(a, b2, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b2, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b2), prop, true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream2) {
  if (stream2[Symbol.asyncIterator]) {
    yield* stream2;
    return;
  }
  const reader = stream2.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream2, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream2, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_2, config) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url: url2,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url2, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url2, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request, fetchOptions);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url2, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const axiosInstance = axios.create({
  baseURL: "https://atypikhouse-api.onrender.com",
  withCredentials: true
});
const initialState$1 = {
  user: null,
  register: () => {
  },
  login: () => {
  },
  googleLogin: () => {
  },
  logout: () => {
  },
  loading: true
};
const UserContext = createContext(initialState$1);
const UserProvider = ({ children }) => {
  const auth = useProvideAuth();
  return /* @__PURE__ */ jsx(UserContext.Provider, { value: auth, children });
};
const initialState = {
  places: [],
  loading: true,
  setPlaces: () => {
  },
  setLoading: () => {
  }
};
const PlaceContext = createContext(initialState);
const PlaceProvider = ({ children, initialPlaces = [] }) => {
  const allPlaces = useProvidePlaces(initialPlaces);
  return /* @__PURE__ */ jsx(PlaceContext.Provider, { value: allPlaces, children });
};
const setItemsInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Cannot store in LS");
  }
  const valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};
const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot get value from LS`);
  }
  return localStorage.getItem(key);
};
const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot remove item from LS`);
  }
  localStorage.removeItem(key);
};
const useAuth = () => useContext(UserContext);
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = getItemFromLocalStorage("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const saveSession = ({ user: user2, token }) => {
    setUser(user2);
    setItemsInLocalStorage("user", user2);
    setItemsInLocalStorage("token", token);
  };
  const register = async ({ name, email, password }) => {
    var _a2, _b2;
    try {
      const { data } = await axiosInstance.post("/user/register", {
        name,
        email,
        password
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: "Inscription réussie" };
    } catch (err) {
      return {
        success: false,
        message: ((_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || "Erreur serveur"
      };
    }
  };
  const login = async ({ email, password }) => {
    var _a2, _b2;
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: "Connexion réussie" };
    } catch (err) {
      return {
        success: false,
        message: ((_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || "Erreur serveur"
      };
    }
  };
  const googleLogin = async (credential) => {
    const decoded = jwt_decode(credential);
    try {
      const { data } = await axiosInstance.post("/user/google/login", {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: "Connexion Google réussie" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };
  const logout = async () => {
    try {
      await axiosInstance.get("/user/logout");
    } catch {
    } finally {
      setUser(null);
      removeItemFromLocalStorage("user");
      removeItemFromLocalStorage("token");
      return { success: true, message: "Déconnexion réussie" };
    }
  };
  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      const { data } = await axiosInstance.post("/user/upload-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const updateUser = async ({ name, password, picture }) => {
    const email = JSON.parse(getItemFromLocalStorage("user") || "{}").email;
    try {
      const { data } = await axiosInstance.put("/user/update-user", {
        name,
        password,
        email,
        picture
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  return {
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
    loading,
    uploadPicture,
    updateUser
  };
};
const usePlaces = () => useContext(PlaceContext);
const useProvidePlaces = (prefetched = []) => {
  const [places, setPlaces] = useState(prefetched);
  const [loading, setLoading] = useState(prefetched.length === 0);
  useEffect(() => {
    if (prefetched.length > 0) return;
    const fetchPlaces = async () => {
      try {
        const { data } = await axiosInstance.get("/api/places");
        setPlaces(data.places);
      } catch (err) {
        console.error("Erreur chargement places :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [prefetched.length]);
  return { places, setPlaces, loading, setLoading };
};
const SearchBar = () => {
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    if (searchText.trimStart() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosInstance.get(
            `/places/search/${searchText.trimStart()}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex w-4/6 overflow-hidden rounded-full border border-gray-400 bg-gray-300 shadow-sm hover:shadow-lg md:w-1/2", children: [
    /* @__PURE__ */ jsx("div", { className: "grow", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        placeholder: "Where do you want to go?",
        className: "h-full w-full border-none px-4 py-2 text-sm  focus:outline-none md:text-lg",
        onChange: (e) => handleSearch(e),
        value: searchText
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue flex cursor-pointer  items-center bg-primary text-white", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex rounded-r-full bg-primary px-4 py-2 md:p-2",
        onClick: handleSearch,
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 3,
              stroke: "currentColor",
              className: "mt-1 h-4 w-4",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-1 hidden md:block", children: "Search" })
        ]
      }
    ) })
  ] }) });
};
const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const { user } = auth;
  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (location.pathname === "/") {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed top-0 z-10 flex w-screen justify-center bg-white py-4 ${hasShadow ? "shadow-md" : ""}`,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex ${showSearchBar ? "justify-around" : "justify-between px-10"} w-screen max-w-screen-xl`,
            children: [
              /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "h-12 w-24 md:h-16 md:w-32",
                  src: Logo,
                  alt: "AtypikHouse Logo"
                }
              ) }),
              showSearchBar && /* @__PURE__ */ jsx(SearchBar, {}),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: user ? "/account" : "/login",
                  "data-testid": "login-link",
                  className: "w-50 flex h-full items-center gap-2 rounded-full border-gray-300 px-2 py-1 md:border",
                  children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        className: "hidden h-6 w-6 md:block",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "z-10 h-[35px] w-[35px] overflow-hidden rounded-full", children: user ? /* @__PURE__ */ jsx(Avatar$1, { children: (user == null ? void 0 : user.picture) ? /* @__PURE__ */ jsx(AvatarImage$1, { src: user.picture, className: "h-full w-full" }) : /* @__PURE__ */ jsx(
                      AvatarImage$1,
                      {
                        src: "https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png",
                        className: "h-full w-full"
                      }
                    ) }) : /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        fill: "#858080",
                        version: "1.1",
                        id: "Layer_1",
                        xmlns: "http://www.w3.org/2000/svg",
                        xmlnsXlink: "http://www.w3.org/1999/xlink",
                        viewBox: "796 796 200 200",
                        enableBackground: "new 796 796 200 200",
                        xmlSpace: "preserve",
                        stroke: "#858080",
                        className: "h-8 w-8",
                        children: [
                          /* @__PURE__ */ jsx("g", { id: "SVGRepo_bgCarrier", strokeWidth: "0" }),
                          /* @__PURE__ */ jsx(
                            "g",
                            {
                              id: "SVGRepo_tracerCarrier",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          ),
                          /* @__PURE__ */ jsxs("g", { id: "SVGRepo_iconCarrier", children: [
                            /* @__PURE__ */ jsx("path", { d: "M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z" }),
                            " "
                          ] })
                        ]
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("br", { className: "border border-gray-600" })
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 py-10 px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-screen-xl mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 w-full text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium text-gray-900", children: "Support" }),
        [
          "Help Center",
          "Get help with a safety issue",
          "Air cover",
          "Anti-discrimination",
          "Disability support",
          "Cancellation options",
          "Report neighbourhood concern"
        ].map((item, i) => /* @__PURE__ */ jsx("p", { className: "text-gray-700 hover:underline cursor-pointer", children: item }, i))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium text-gray-900", children: "Hosting" }),
        [
          "AtypikHouse your home",
          "AirCover for Hosts",
          "Hosting resources",
          "Community forum",
          "Hosting responsibly"
        ].map((item, i) => /* @__PURE__ */ jsx("p", { className: "text-gray-700 hover:underline cursor-pointer", children: item }, i))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium text-gray-900", children: "AtypikHouse" }),
        [
          "Newsroom",
          "New features",
          "Careers",
          "Investors",
          "AtypikHouse.org emergency stays"
        ].map((item, i) => /* @__PURE__ */ jsx("p", { className: "text-gray-700 hover:underline cursor-pointer", children: item }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full border-t border-gray-200 my-6" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-6 md:flex-row md:justify-between md:items-center text-sm text-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          "🌍 English (ENG) ",
          /* @__PURE__ */ jsx("span", { className: "ml-4", children: "€ EUR" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 cursor-pointer", viewBox: "0 0 50 50", children: /* @__PURE__ */ jsx("path", { d: "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z" }) }),
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 cursor-pointer", viewBox: "0 0 50 50", children: /* @__PURE__ */ jsx("path", { d: "M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" }) }),
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 cursor-pointer", viewBox: "0 0 50 50", children: /* @__PURE__ */ jsx("path", { d: "M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-3 md:gap-6", children: [
        /* @__PURE__ */ jsx("p", { children: "© 2025 AtypikHouse. Tous droits réservés." }),
        /* @__PURE__ */ jsxs("ul", { className: "flex flex-col md:flex-row gap-2 md:gap-6", children: [
          /* @__PURE__ */ jsx("li", { className: "hover:underline", children: /* @__PURE__ */ jsx(Link, { to: "/legal", children: "Mentions légales" }) }),
          /* @__PURE__ */ jsx("li", { className: "hover:underline cursor-pointer", children: "Confidentialité" }),
          /* @__PURE__ */ jsx("li", { className: "hover:underline cursor-pointer", children: "Conditions" }),
          /* @__PURE__ */ jsx("li", { className: "hover:underline cursor-pointer", children: "Plan du site" })
        ] })
      ] })
    ] })
  ] }) });
};
const Layout = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "mx-auto flex min-h-screen max-w-screen-xl flex-col", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Spinner = () => {
  return /* @__PURE__ */ jsxs("div", { className: "absolute inset-1/2 flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#f5385d]",
        role: "status",
        "aria-label": "Chargement"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm text-gray-500", children: "Chargement..." })
  ] });
};
const isServer = typeof window === "undefined";
const Wrapper = isServer ? "div" : motion.div;
const WrapperLink = ({ to, children, ...props }) => isServer ? /* @__PURE__ */ jsx("a", { href: to, ...props, children }) : /* @__PURE__ */ jsx(Link, { to, ...props, children });
const PlaceCard = ({ place }) => {
  const {
    _id: placeId,
    photos = [],
    address = "Adresse non disponible",
    title = "Titre non disponible",
    price = "N/A"
  } = place;
  return /* @__PURE__ */ jsx(
    Wrapper,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      whileHover: { scale: 1.02 },
      className: "w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform",
      children: /* @__PURE__ */ jsxs(WrapperLink, { to: `/place/${placeId}`, className: "block", children: [
        /* @__PURE__ */ jsx("div", { className: "h-48 w-full overflow-hidden rounded-t-xl", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: photos[0] || "/default.jpg",
            alt: `Photo de ${title}`,
            className: "h-full w-full object-cover",
            ...!isServer && { loading: "lazy" }
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 truncate", children: address }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-500 truncate", children: title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-primary font-semibold", children: [
              price,
              "€"
            ] }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "/ nuit" })
          ] })
        ] })
      ] })
    }
  );
};
const IndexPage = () => {
  const { places = [], loading = false } = usePlaces() || {};
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  const visiblePlaces = places;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "AtypikHouse - Découvrez des habitats uniques" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Découvrez des lieux uniques comme des cabanes dans les arbres, yourtes, et autres hébergements atypiques disponibles à la location." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "locations, habitats atypiques, cabanes, yourtes, voyage, hébergements" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "AtypikHouse - Habitats uniques" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Réservez des habitats atypiques uniques : cabanes, yourtes, et bien plus encore !" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "hero", className: "h-screen flex items-center justify-center bg-gray-100 shadow-inner rounded-xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl font-extrabold text-gray-800 mb-4", children: [
        "Bienvenue sur ",
        /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "AtypikHouse" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-700", children: [
        "Cabanes dans les arbres, yourtes, logements insolites… ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-800", children: "Découvrez des lieux inoubliables" }),
        " pour vos prochaines escapades."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-gray-500 mt-3", children: "Cette page présente nos services ainsi qu’une vue d’ensemble des biens disponibles à la location." }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "#places",
          className: "inline-block cursor-pointer rounded-full bg-red-500 px-6 py-3 text-white font-semibold shadow hover:bg-red-600 transition duration-300",
          children: "Explorer les hébergements"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "places", className: "py-20 px-6 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-10", children: "Nos hébergements atypiques" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3", children: visiblePlaces.length > 0 ? visiblePlaces.map((place) => /* @__PURE__ */ jsx(PlaceCard, { place }, place._id)) : /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Aucun hébergement trouvé." }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-6 bg-gradient-to-b from-red-50 to-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Louez votre hébergement atypique" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Rejoignez AtypikHouse et touchez des voyageurs à la recherche d’expériences uniques." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/OwnerBenefitsPage",
          className: "inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-red-600 transition",
          children: "En savoir plus"
        }
      )
    ] }) })
  ] });
};
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.register(formData);
    if (response.success) {
      Q.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setRedirect(true);
    } else {
      Q.error(response.message || "Erreur lors de l'inscription.");
    }
  };
  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      Q.success("Connexion avec Google réussie.");
      setRedirect(true);
    } else {
      Q.error("Échec de la connexion avec Google.");
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Inscription - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Créez un compte sur AtypikHouse pour réserver des hébergements uniques et gérer vos annonces."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Inscription - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Rejoignez la communauté AtypikHouse et accédez à des hébergements uniques à louer ou à proposer."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/register" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex grow items-center justify-around p-4 md:p-0", children: /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-center text-4xl", children: "Inscription" }),
      /* @__PURE__ */ jsxs("form", { className: "mx-auto max-w-md", onSubmit: handleFormSubmit, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "name",
            type: "text",
            placeholder: "Nom complet",
            value: formData.name,
            onChange: handleFormData,
            required: true,
            "aria-label": "Nom complet"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "email",
            type: "email",
            placeholder: "votre@email.com",
            value: formData.email,
            onChange: handleFormData,
            required: true,
            "aria-label": "Adresse email"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "password",
            type: "password",
            placeholder: "Mot de passe",
            value: formData.password,
            onChange: handleFormData,
            required: true,
            "aria-label": "Mot de passe"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "primary my-2", type: "submit", children: "S'inscrire" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" }),
        /* @__PURE__ */ jsx("p", { className: "small -mt-1", children: "ou" }),
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex h-[50px] justify-center", children: /* @__PURE__ */ jsx(
        GoogleLogin,
        {
          onSuccess: (credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          },
          onError: () => {
            Q.error("Échec de la connexion avec Google.");
          },
          text: "continue_with",
          width: "350"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "py-2 text-center text-gray-500", children: [
        "Déjà membre ?",
        " ",
        /* @__PURE__ */ jsx(Link, { className: "text-black underline", to: "/login", children: "Connectez-vous ici" })
      ] })
    ] }) })
  ] });
};
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode2 = true) => {
  if (encode2 === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode2) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode2
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode2
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode2 = true) => tags.reduce((str, t2) => {
  const tag = t2;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode2)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [t__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return t__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode2 = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode2)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode2)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode: encode2 }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode2)} ${getMethodsForTag(
        "link",
        link.priority,
        encode2
      )} ${getMethodsForTag("script", script.priority, encode2)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode: encode2 = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode2),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode2),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode2),
    link: getMethodsForTag("link", linkTags, encode2),
    meta: getMethodsForTag("meta", metaTags, encode2),
    noscript: getMethodsForTag("noscript", noscriptTags, encode2),
    script: getMethodsForTag("script", scriptTags, encode2),
    style: getMethodsForTag("style", styleTags, encode2),
    title: getMethodsForTag("title", { title, titleAttributes }, encode2)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = t__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ t__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    t__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ t__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ t__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ t__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const OwnerBenefitsPage = () => {
  const { user } = useContext(UserContext);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Devenez propriétaire sur AtypikBookings | Louez votre bien" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Générez des revenus en louant votre logement atypique sur AtypikBookings. Grande visibilité, paiements sécurisés et assistance 24/7."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "location saisonnière, hébergement atypique, louer bien immobilier, propriétaires, Airbnb alternatif"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://atypikbookings.com/OwnerBenefits" })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "🎉 Devenez propriétaire sur AtypikBookings" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl", children: "Rentabilisez votre hébergement atypique en le louant sur AtypikBookings. Cabanes, yourtes, igloos, maisons flottantes... Notre plateforme vous permet de trouver des locataires en toute simplicité et sécurité." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "📈 Augmentez vos revenus" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Publiez votre bien et commencez à percevoir des revenus en accueillant des voyageurs du monde entier." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "🔍 Grande visibilité" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Votre logement sera mis en avant auprès de milliers d'utilisateurs chaque mois." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "💰 Paiements sécurisés" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Recevez vos paiements rapidement et en toute sécurité grâce à notre système intégré." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "📞 Assistance 24/7" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Une équipe dédiée est disponible à tout moment pour vous accompagner et répondre à vos questions." })
      ] })
    ] }),
    !user && /* @__PURE__ */ jsxs("div", { className: "mt-10 text-center text-red-500", children: [
      "Connectez-vous pour publier un logement. ",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "underline text-primary", children: "Se connecter" })
    ] }),
    user && /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/account/places/new",
        className: "bg-primary text-white px-6 py-3 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-primary-dark transition",
        "aria-label": "Ajouter un logement",
        children: "➕ Ajouter un logement"
      }
    ) })
  ] });
};
const AccountNav = () => {
  var _a2;
  const { pathname } = useLocation();
  let subpage = (_a2 = pathname.split("/")) == null ? void 0 : _a2[2];
  const { user } = useContext(UserContext);
  if (subpage === void 0) {
    subpage = "profile";
  }
  const linkClases = (type = null) => {
    let classes = "flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  };
  return /* @__PURE__ */ jsxs("nav", { className: "mb-8 mt-24 flex w-full flex-col justify-center gap-2 p-8 md:flex-row md:p-0", children: [
    /* @__PURE__ */ jsxs(Link, { className: linkClases("profile"), to: "/account", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            }
          )
        }
      ),
      "My Profile"
    ] }),
    /* @__PURE__ */ jsxs(Link, { className: linkClases("bookings"), to: `/account/bookings`, children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            }
          )
        }
      ),
      "My bookings"
    ] }),
    /* @__PURE__ */ jsxs(Link, { className: linkClases("places"), to: "/account/places", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            }
          )
        }
      ),
      "My accommodations"
    ] }),
    (user == null ? void 0 : user.isAdmin) && /* @__PURE__ */ jsxs(Link, { className: linkClases("dashboard"), to: "/admin/dashboard", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3 3h18M3 8h18M3 13h18M3 18h18"
            }
          )
        }
      ),
      "Admin Dashboard"
    ] }),
    (user == null ? void 0 : user.role) === "modérateur" && /* @__PURE__ */ jsxs(Link, { className: linkClases("comments"), to: "/admin/comments", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3 3h18M3 8h18M3 13h18M3 18h18"
            }
          )
        }
      ),
      "Moderator Dashboard"
    ] })
  ] });
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Avatar = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-full w-full shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-9xl",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = t.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const PlaceImg = ({ place, index = 0, className = null }) => {
  var _a2;
  if (!((_a2 = place.photos) == null ? void 0 : _a2.length)) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return /* @__PURE__ */ jsx("img", { src: place.photos[index], alt: "", className });
};
const InfoCard = ({ place }) => {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/account/places/${place._id}`,
      className: "my-3 flex cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-4 transition-all hover:bg-gray-300 md:flex-row",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full shrink-0 bg-gray-300 sm:h-32 sm:w-32 ", children: /* @__PURE__ */ jsx(PlaceImg, { place }) }),
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-xl", children: place.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-sm", children: place.description })
        ] })
      ]
    },
    place._id
  );
};
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const { data } = await axiosInstance.get("places/user-places");
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des lieux :", error);
        setLoading(false);
      }
    };
    getPlaces();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Mes lieux - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez vos lieux et propriétés ajoutées à AtypikHouse. Ajoutez, modifiez ou supprimez vos annonces facilement."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Mes lieux - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Accédez à vos lieux ajoutés sur AtypikHouse et gérez vos annonces en toute simplicité."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/account/places" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs(
        Link,
        {
          className: "inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white",
          to: "/account/places/new",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-6 w-6",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 4.5v15m7.5-7.5h-15"
                  }
                )
              }
            ),
            "Ajouter un nouveau lieu"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mx-4 mt-4", children: places.length > 0 ? places.map((place) => /* @__PURE__ */ jsx(InfoCard, { place }, place._id)) : /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-500", children: [
        /* @__PURE__ */ jsx("p", { children: "Aucun lieu ajouté pour l'instant." }),
        /* @__PURE__ */ jsx("p", { children: "Cliquez sur le bouton ci-dessus pour ajouter votre premier lieu !" })
      ] }) })
    ] })
  ] });
};
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = ({ className, ...props }) => /* @__PURE__ */ jsx(DialogPrimitive.Portal, { className: cn(className), ...props });
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
const DialogOverlay = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = t.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] })
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Input = t.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = t.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const EditProfileDialog = () => {
  const { user, setUser, uploadPicture, updateUser } = useAuth();
  const uploadRef = useRef(null);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    password: "",
    confirm_password: ""
  });
  const handleImageClick = () => {
    uploadRef.current.click();
  };
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSaveChanges = async () => {
    setLoading(true);
    const { name, password, confirm_password } = userData;
    if (name.trim() === "") {
      setLoading(false);
      return Q.error("Name Can't be empty");
    } else if (password !== confirm_password) {
      setLoading(false);
      return Q.error("Passwords don't match");
    }
    try {
      let pictureUrl = "";
      if (picture) {
        pictureUrl = await uploadPicture(picture);
      }
      const userDetails = {
        name: userData.name,
        password: userData.password,
        picture: pictureUrl
      };
      const res = await updateUser(userDetails);
      if (res.success) {
        setUser(res.user);
        setLoading(false);
        return Q.success("Updated successfully!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Q.error("Something went wrong!");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-blue-600 hover:bg-blue-600 ", children: [
      /* @__PURE__ */ jsx(PenSquare, { className: "mr-2 h-4 w-4" }),
      "Edit Profile"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative h-40 w-40 cursor-pointer overflow-hidden rounded-full bg-gray-200", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute flex h-full w-full items-center justify-center bg-gray-200 hover:z-10",
            onClick: handleImageClick,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  className: "hidden",
                  ref: uploadRef,
                  onChange: handlePictureChange
                }
              ),
              /* @__PURE__ */ jsx(Upload, { height: 50, width: 50, color: "#4e4646" })
            ]
          }
        ),
        picture ? /* @__PURE__ */ jsx(Avatar, { className: "transition-all ease-in-out hover:z-0 hover:hidden ", children: /* @__PURE__ */ jsx(AvatarImage, { src: URL.createObjectURL(picture) }) }) : /* @__PURE__ */ jsx(Avatar, { className: "transition-all ease-in-out hover:z-0 hover:hidden ", children: /* @__PURE__ */ jsx(AvatarImage, { src: user.picture }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-right", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              name: "name",
              value: userData.name,
              className: "col-span-3",
              onChange: handleUserData
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-right", children: "New Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              name: "password",
              value: userData.password,
              className: "col-span-3",
              type: "password",
              onChange: handleUserData
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "confirm_Password", className: "text-right", children: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "confirm_password",
              name: "confirm_password",
              value: userData.confirm_password,
              className: "col-span-3",
              type: "password",
              onChange: handleUserData
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(
        Button,
        {
          disabled: loading,
          type: "submit",
          className: "w-full",
          onClick: handleSaveChanges,
          children: [
            loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Save changes"
          ]
        }
      ) })
    ] })
  ] });
};
const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      Q.success("Déconnexion réussie.");
      setRedirect("/");
    } else {
      Q.error("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };
  if (!user && !redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  }
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirect });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Profil - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez votre profil utilisateur sur AtypikHouse. Consultez vos informations personnelles et vos annonces."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Profil - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Accédez à votre espace personnel pour gérer vos informations et vos lieux sur AtypikHouse."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/account/profile" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      subpage === "profile" && /* @__PURE__ */ jsxs("div", { className: "m-4 flex flex-col items-center gap-8 rounded-[10px] p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4 sm:h-72 sm:w-72 md:h-96 md:w-96", children: /* @__PURE__ */ jsxs(Avatar, { children: [
          user.picture ? /* @__PURE__ */ jsx(AvatarImage, { src: user.picture }) : /* @__PURE__ */ jsx(
            AvatarImage,
            {
              src: "https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png",
              className: "object-cover"
            }
          ),
          /* @__PURE__ */ jsx(AvatarFallback, { children: user.name.slice(0, 1) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Text, { height: "18", width: "18" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
                /* @__PURE__ */ jsx("span", { children: "Nom : " }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: user.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Mail, { height: "18", width: "18" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
                /* @__PURE__ */ jsx("span", { children: "Email : " }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: user.email })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10", children: [
            /* @__PURE__ */ jsx(EditProfileDialog, {}),
            /* @__PURE__ */ jsxs(Button, { variant: "secondary", onClick: handleLogout, children: [
              /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
              "Déconnexion"
            ] })
          ] })
        ] })
      ] }),
      subpage === "places" && /* @__PURE__ */ jsx(PlacesPage, {})
    ] })
  ] });
};
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.login(formData);
    if (response.success) {
      Q.success(response.message);
      setRedirect(true);
    } else {
      Q.error(response.message || "Échec de la connexion. Veuillez réessayer.");
    }
  };
  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      Q.success(response.message);
      setRedirect(true);
    } else {
      Q.error(response.message || "Échec de la connexion avec Google.");
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  }
  if (auth.user) {
    return /* @__PURE__ */ jsx(ProfilePage, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Connexion - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Connectez-vous à votre compte AtypikHouse pour gérer vos réservations et vos propriétés."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Connexion - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Rejoignez la communauté AtypikHouse et accédez à votre espace personnel."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/login" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex grow items-center justify-around p-4 md:p-0", children: /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-center text-4xl", children: "Connexion" }),
      /* @__PURE__ */ jsxs("form", { className: "mx-auto max-w-md", onSubmit: handleFormSubmit, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "email",
            type: "email",
            placeholder: "Votre email",
            value: formData.email,
            onChange: handleFormData,
            required: true,
            "aria-label": "Email"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "password",
            type: "password",
            placeholder: "Mot de passe",
            value: formData.password,
            onChange: handleFormData,
            required: true,
            "aria-label": "Mot de passe"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "primary my-4", type: "submit", children: "Se connecter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" }),
        /* @__PURE__ */ jsx("p", { className: "small -mt-1", children: "ou" }),
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex h-[50px] justify-center", children: /* @__PURE__ */ jsx(
        GoogleLogin,
        {
          onSuccess: (credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          },
          onError: () => {
            Q.error("Échec de la connexion avec Google.");
          },
          text: "continue_with",
          width: "350"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "py-2 text-center text-gray-500", children: [
        "Pas encore de compte ?",
        " ",
        /* @__PURE__ */ jsx(Link, { className: "text-black underline", to: "/register", children: "Inscrivez-vous maintenant" })
      ] })
    ] }) })
  ] });
};
const BookingDates = ({ booking, className }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 " + className, children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          }
        )
      }
    ),
    differenceInCalendarDays(
      new Date(booking.checkOut),
      new Date(booking.checkIn)
    ),
    "nights:",
    /* @__PURE__ */ jsxs("div", { className: "ml-2 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            }
          )
        }
      ),
      format(new Date(booking.checkIn), "dd-MM-yyyy"),
      " →",
      " "
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "items- flex gap-1", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            }
          )
        }
      ),
      format(new Date(booking.checkOut), "dd-MM-yyyy")
    ] })
  ] });
};
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axiosInstance.get("/bookings");
        setBookings(data.booking);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        setLoading(false);
      }
    };
    getBookings();
  }, []);
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Mes Réservations - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Consultez vos réservations effectuées sur AtypikHouse. Gérez vos séjours et découvrez vos prochaines aventures."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Mes Réservations - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Accédez à toutes vos réservations sur AtypikHouse et planifiez votre prochain séjour."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/account/bookings" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      /* @__PURE__ */ jsx("div", { className: "w-full px-4", children: (bookings == null ? void 0 : bookings.length) > 0 ? bookings.map((booking) => {
        var _a2, _b2;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/account/bookings/${booking._id}`,
            className: "my-8 flex h-28 gap-4 overflow-hidden rounded-2xl bg-gray-200 md:h-40",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-2/6 md:w-1/6", children: ((_a2 = booking == null ? void 0 : booking.place) == null ? void 0 : _a2.photos[0]) && /* @__PURE__ */ jsx(
                PlaceImg,
                {
                  place: booking == null ? void 0 : booking.place,
                  className: "h-full w-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "grow py-3 pr-3", children: [
                /* @__PURE__ */ jsx("h2", { className: "md:text-2xl", children: (_b2 = booking == null ? void 0 : booking.place) == null ? void 0 : _b2.title }),
                /* @__PURE__ */ jsxs("div", { className: "md:text-xl", children: [
                  /* @__PURE__ */ jsx(
                    BookingDates,
                    {
                      booking,
                      className: "mb-2 mt-4 hidden items-center text-gray-600 md:flex"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "my-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        className: "h-7 w-7",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xl md:text-2xl", children: [
                      "Prix total : ",
                      booking.price,
                      "€"
                    ] })
                  ] })
                ] })
              ] })
            ]
          },
          booking._id
        );
      }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "my-6 text-3xl font-semibold", children: "Mes Voyages" }),
        /* @__PURE__ */ jsx("hr", { className: "border border-gray-300" }),
        /* @__PURE__ */ jsx("h3", { className: "pt-6 text-2xl font-semibold", children: "Vous n'avez encore réservé aucun voyage." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Commencez à explorer des hébergements uniques et planifiez votre prochaine aventure !" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "my-4", children: /* @__PURE__ */ jsx("button", { className: "flex w-40 justify-center rounded-lg border border-black p-3 text-lg font-semibold hover:bg-gray-50", children: "Explorer" }) })
      ] }) })
    ] })
  ] });
};
const Perks = ({ selected, handleFormData }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6", children: [
    /* @__PURE__ */ jsxs(
      "label",
      {
        className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selected.includes("wifi"),
              name: "wifi",
              onChange: handleFormData
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { children: "Wifi" })
        ]
      },
      "perks"
    ),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("parking"),
          name: "parking",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Free parking spot" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("tv"),
          name: "tv",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "TV" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("radio"),
          name: "radio",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Radio" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("pets"),
          name: "pets",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Pets" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("enterence"),
          name: "enterence",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Private Enterence" })
    ] })
  ] });
};
const Image = ({ src, ...rest }) => {
  return /* @__PURE__ */ jsx("img", { src, ...rest, alt: "", className: "rounded-xl" });
};
const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setphotoLink] = useState("");
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axiosInstance.post("/upload-by-link", {
      link: photoLink
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setphotoLink("");
  };
  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axiosInstance.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" }
    });
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };
  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };
  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename)
    ]);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: photoLink,
          onChange: (e) => setphotoLink(e.target.value),
          type: "text",
          placeholder: "Add using a link ...jpg"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-2xl bg-gray-200 px-4",
          onClick: addPhotoByLink,
          children: "Add photo"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 ", children: [
      (addedPhotos == null ? void 0 : addedPhotos.length) > 0 && addedPhotos.map((link) => /* @__PURE__ */ jsxs("div", { className: "relative flex h-32", children: [
        /* @__PURE__ */ jsx(
          Image,
          {
            className: "w-full rounded-2xl object-cover",
            src: link,
            alt: ""
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => removePhoto(link),
            className: "absolute bottom-1 right-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-6 w-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => selectAsMainPhoto(e, link),
            className: "absolute bottom-1 left-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70",
            children: [
              link === addedPhotos[0] && /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  className: "h-6 w-6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                      clipRule: "evenodd"
                    }
                  )
                }
              ),
              link !== addedPhotos[0] && /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-6 w-6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    }
                  )
                }
              )
            ]
          }
        )
      ] }, link)),
      /* @__PURE__ */ jsxs("label", { className: "flex h-32 cursor-pointer items-center justify-center gap-1 rounded-2xl border bg-transparent p-2 text-2xl text-gray-600", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            multiple: true,
            className: "hidden",
            onChange: uploadPhoto
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-8 w-8",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              }
            )
          }
        ),
        "Upload"
      ] })
    ] })
  ] });
};
const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 10,
    price: 500,
    type: ""
  });
  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    maxGuests,
    price,
    type
  } = formData;
  const isValidPlaceData = () => {
    if (title.trim() === "") {
      Q.error("Le titre ne peut pas être vide.");
      return false;
    } else if (address.trim() === "") {
      Q.error("L'adresse ne peut pas être vide.");
      return false;
    } else if (addedPhotos.length < 5) {
      Q.error("Veuillez ajouter au moins 5 photos.");
      return false;
    } else if (description.trim() === "") {
      Q.error("La description ne peut pas être vide.");
      return false;
    } else if (maxGuests < 1) {
      Q.error("Le nombre minimum de personnes doit être au moins de 1.");
      return false;
    }
    return true;
  };
  const handleFormData = (e) => {
    const { name, value, type: type2 } = e.target;
    if (type2 !== "checkbox") {
      setFormData({ ...formData, [name]: value });
      return;
    }
    if (type2 === "checkbox") {
      const currentPerks = [...perks];
      let updatedPerks = [];
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key]
          }));
        }
      }
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);
  const preInput = (header, description2) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl", children: header }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: description2 })
  ] });
  const savePlace = async (e) => {
    e.preventDefault();
    if (!isValidPlaceData()) return;
    const placeData = { ...formData, addedPhotos };
    if (id) {
      await axiosInstance.put("/places/update-place", { id, ...placeData });
    } else {
      await axiosInstance.post("/places/add-places", placeData);
    }
    Q.success("Le lieu a été enregistré avec succès.");
    setRedirect(true);
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/account/places" });
  }
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        id ? "Modifier le lieu" : "Ajouter un nouveau lieu",
        " - AtypikHouse"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `${id ? "Modifier les détails du lieu." : "Ajouter un nouveau lieu à votre compte."}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      /* @__PURE__ */ jsxs("form", { onSubmit: savePlace, children: [
        preInput("Titre", "Un titre accrocheur pour votre lieu."),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "title",
            value: title,
            onChange: handleFormData,
            placeholder: "Titre, par exemple : Mon charmant appartement"
          }
        ),
        preInput("Adresse", "L'adresse de ce lieu"),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "address",
            value: address,
            onChange: handleFormData,
            placeholder: "Adresse"
          }
        ),
        preInput("Photos", "Ajoutez plusieurs photos pour mieux présenter votre lieu."),
        /* @__PURE__ */ jsx(PhotosUploader, { addedPhotos, setAddedPhotos }),
        preInput("Description", "Une description détaillée du lieu."),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: description,
            name: "description",
            onChange: handleFormData
          }
        ),
        preInput("Équipements", "Sélectionnez tous les équipements disponibles."),
        /* @__PURE__ */ jsx(Perks, { selected: perks, handleFormData }),
        preInput("Informations supplémentaires", "Règles de la maison, etc."),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: extraInfo,
            name: "extraInfo",
            onChange: handleFormData
          }
        ),
        preInput("Type de lieu", "Sélectionnez le type de votre lieu."),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "type",
            value: type,
            onChange: handleFormData,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionner un type" }),
              /* @__PURE__ */ jsx("option", { value: "Treehouse", children: "Cabane dans les arbres" }),
              /* @__PURE__ */ jsx("option", { value: "Yurt", children: "Yourte" }),
              /* @__PURE__ */ jsx("option", { value: "Boat", children: "Bateau" }),
              /* @__PURE__ */ jsx("option", { value: "Cave", children: "Grotte" }),
              /* @__PURE__ */ jsx("option", { value: "Igloo", children: "Igloo" }),
              /* @__PURE__ */ jsx("option", { value: "Other", children: "Autre" })
            ]
          }
        ),
        preInput(
          "Capacité et Prix",
          "Spécifiez la capacité maximale et le prix par nuit."
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2 md:grid-cols-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "-mb-1 mt-2", children: "Capacité maximale" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "maxGuests",
                value: maxGuests,
                onChange: handleFormData,
                placeholder: "1",
                min: "1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "-mb-1 mt-2", children: "Prix par nuit (€)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "price",
                value: price,
                onChange: handleFormData,
                placeholder: "500",
                min: "1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "mx-auto my-4 flex rounded-full bg-primary px-20 py-3 text-xl font-semibold text-white",
            children: "Enregistrer"
          }
        )
      ] })
    ] })
  ] });
};
const AddressLink = ({ placeAddress, className = null }) => {
  if (!className) {
    className = "my-3 block";
  }
  className += " flex gap-1 font-semibold underline";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className,
      href: `https://maps.google.com/?q=${placeAddress}`,
      target: "blank",
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                }
              )
            ]
          }
        ),
        placeAddress
      ]
    }
  );
};
function Calendar({ className, classNames, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props,
      required: true
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = t.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) })
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function DatePickerWithRange({ className, setDateRange }) {
  const [date, setDate] = t.useState({
    from: /* @__PURE__ */ new Date(),
    to: addDays(Date.now(), 5)
  });
  const today = /* @__PURE__ */ new Date();
  const yesterday = /* @__PURE__ */ new Date();
  yesterday.setDate(today.getDate() - 1);
  t.useEffect(() => {
    if (!date) {
      setDate({ from: /* @__PURE__ */ new Date(), to: /* @__PURE__ */ new Date() });
    } else {
      setDateRange(date);
    }
  }, [date]);
  return /* @__PURE__ */ jsx("div", { className: cn("grid gap-2", className), children: /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(
      PopoverTrigger,
      {
        asChild: true,
        className: "border-none text-black hover:bg-transparent",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            id: "date",
            variant: "outline",
            className: cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(Calendar$1, { className: "mr-2 h-4 w-4" }),
              (date == null ? void 0 : date.from) ? date.to ? /* @__PURE__ */ jsxs(Fragment, { children: [
                format(date.from, "LLL dd, y"),
                " -",
                ">",
                " ",
                format(date.to, "LLL dd, y")
              ] }) : format(date.from, "LLL dd, y") : /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: "Pick a date" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        initialFocus: true,
        mode: "range",
        defaultMonth: date == null ? void 0 : date.from,
        selected: date,
        onSelect: setDate,
        numberOfMonths: 1,
        disabled: (date2) => date2 < (/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1)
      }
    ) })
  ] }) });
}
const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: "",
    phone: ""
  });
  const [redirect, setRedirect] = useState("");
  const { user } = useAuth();
  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;
  useEffect(() => {
    if (user) {
      setBookingData({ ...bookingData, name: user.name });
    }
  }, [user]);
  const numberOfNights = dateRange.from && dateRange.to ? differenceInDays(
    new Date(dateRange.to).setHours(0, 0, 0, 0),
    new Date(dateRange.from).setHours(0, 0, 0, 0)
  ) : 0;
  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };
  const handleBooking = async () => {
    if (!user) {
      return setRedirect(`/login`);
    }
    if (numberOfNights < 1) {
      return Q.error("Please select valid dates");
    } else if (noOfGuests < 1) {
      return Q.error("No. of guests can't be less than 1");
    } else if (noOfGuests > place.maxGuests) {
      return Q.error(`Allowed max. no. of guests: ${place.maxGuests}`);
    } else if (name.trim() === "") {
      return Q.error("Name can't be empty");
    } else if (phone.trim() === "") {
      return Q.error("Phone can't be empty");
    }
    try {
      const response = await axiosInstance.post("/bookings", {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        noOfGuests,
        name,
        phone,
        place: id,
        price: numberOfNights * price
      });
      const bookingId = response.data.booking._id;
      setRedirect(`/account/bookings/${bookingId}`);
      Q("Congratulations! Enjoy your trip.");
    } catch (error) {
      Q.error("Something went wrong!");
      console.log("Error: ", error);
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirect });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center text-xl", children: [
      "Price: ",
      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        place.price,
        "€"
      ] }),
      " / per night"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border", children: [
      /* @__PURE__ */ jsx("div", { className: "flex w-full ", children: /* @__PURE__ */ jsx(DatePickerWithRange, { setDateRange }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-3", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "noOfGuests", children: "Number of guests: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            id: "noOfGuests",
            name: "noOfGuests",
            placeholder: `Max. guests: ${place.maxGuests}`,
            min: 1,
            max: place.maxGuests,
            value: noOfGuests,
            onChange: handleBookingData
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-3", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Your full name: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            value: name,
            onChange: handleBookingData
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "phone", children: "Phone number: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "phone",
            name: "phone",
            value: phone,
            onChange: handleBookingData
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: handleBooking, className: "primary mt-4", children: [
      "Book this place",
      numberOfNights > 0 && /* @__PURE__ */ jsxs("span", { children: [
        " ",
        numberOfNights * place.price,
        "€"
      ] })
    ] })
  ] });
};
const PlaceGallery = ({ place }) => {
  var _a2, _b2, _c, _d, _e, _f, _g;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-20 overflow-auto bg-white text-white", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 bg-white px-2 py-20 md:p-8", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: "fixed right-2 top-8 flex gap-1 rounded-2xl bg-white px-4 py-2 text-black shadow-sm shadow-gray-500 md:right-12",
          onClick: () => setShowAllPhotos(false),
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "h-6 w-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",
                    clipRule: "evenodd"
                  }
                )
              }
            ),
            "Close photos"
          ]
        }
      ) }),
      ((_a2 = place == null ? void 0 : place.photos) == null ? void 0 : _a2.length) > 0 && place.photos.map((photo, index) => /* @__PURE__ */ jsx("div", { className: "max-w-full", children: /* @__PURE__ */ jsx("img", { src: photo, alt: "" }) }, index))
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden h-[400px] max-h-[450px] grid-cols-4 gap-2 overflow-hidden rounded-[12px] md:grid", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-2 overflow-hidden", children: ((_b2 = place.photos) == null ? void 0 : _b2[0]) && /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden bg-red-200", children: /* @__PURE__ */ jsx(
        "img",
        {
          onClick: () => setShowAllPhotos(true),
          className: "h-full w-full cursor-pointer object-cover",
          src: place.photos[0],
          alt: ""
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full grid-rows-2 gap-2", children: [
        ((_c = place.photos) == null ? void 0 : _c[1]) && // row 1
        /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[1],
            alt: ""
          }
        ) }),
        ((_d = place.photos) == null ? void 0 : _d[2]) && // row 2
        /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[2],
            alt: ""
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full grid-rows-2 gap-2", children: [
        ((_e = place.photos) == null ? void 0 : _e[3]) && // row 1
        /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[3],
            alt: ""
          }
        ) }),
        ((_f = place.photos) == null ? void 0 : _f[4]) && // row 2
        /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[4],
            alt: ""
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden rounded-[12px] md:hidden", children: ((_g = place.photos) == null ? void 0 : _g[0]) && /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(
      "img",
      {
        onClick: () => setShowAllPhotos(true),
        className: "h-full cursor-pointer object-cover",
        src: place.photos[0],
        alt: ""
      }
    ) }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "absolute bottom-2 right-2 flex gap-1 rounded-xl bg-white px-4 py-2 shadow-md shadow-gray-500 ",
        onClick: () => setShowAllPhotos(true),
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          "Show all photos"
        ]
      }
    )
  ] });
};
const PerksWidget = ({ perks }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("hr", { className: "mb-5 border" }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold", children: "What this place offers" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid flex-col gap-4 lg:grid-cols-2 lg:justify-items-stretch lg:gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("wifi")) ? "" : "line-through"}`, children: "Wifi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("tv")) ? "" : "line-through"}`, children: "TV" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${(perks == null ? void 0 : perks.includes("parking")) ? "" : "line-through"}`,
            children: "Free parking spot"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("radio")) ? "" : "line-through"}`, children: "Radio" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("pets")) ? "" : "line-through"}`, children: "Pets" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${(perks == null ? void 0 : perks.includes("enterence")) ? "" : "line-through"}`,
            children: "Private enterence"
          }
        )
      ] })
    ] })
  ] });
};
const isBrowser = typeof window !== "undefined";
const API_BASE_URL = "https://atypikhouse-api.onrender.com";
function PlacePage() {
  var _a2;
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [replyVisible, setReplyVisible] = useState({});
  const storedUser = isBrowser ? JSON.parse(window.localStorage.getItem("user") || "null") : null;
  const userName = (storedUser == null ? void 0 : storedUser.name) || "Utilisateur inconnu";
  const hasToken = isBrowser && window.localStorage.getItem("token");
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const { data } = await axiosInstance.get(`${API_BASE_URL}/api/places/${id}`);
        setPlace(data.place);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!hasToken) return;
    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${hasToken}` } }
      );
      setPlace((prev) => ({
        ...prev,
        reviews: [...prev.reviews, data.data.at(-1)]
      }));
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleReplySubmit = async (reviewId) => {
    if (!hasToken) return;
    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews/${reviewId}/reply`,
        { comment: reply[reviewId], userName },
        { headers: { Authorization: `Bearer ${hasToken}` } }
      );
      setPlace((prev) => ({
        ...prev,
        reviews: prev.reviews.map((r) => r._id === reviewId ? data.data : r)
      }));
      setReply((p2) => ({ ...p2, [reviewId]: "" }));
      setReplyVisible((p2) => ({ ...p2, [reviewId]: false }));
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  if (!place) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        place.title,
        " - AtypikHouse"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Découvrez ${place.title}, situé à ${place.address}. Hébergement unique pour un séjour inoubliable.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: place.title }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: `Réservez ${place.title} sur AtypikHouse. Parfait pour ${place.maxGuests} invités.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://votre-domaine.com/places/${id}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 overflow-x-hidden px-8 pt-20", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: place.title }),
      /* @__PURE__ */ jsx(AddressLink, { placeAddress: place.address }),
      /* @__PURE__ */ jsx(PlaceGallery, { place }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "my-4 text-2xl font-semibold", children: "Description" }),
          /* @__PURE__ */ jsx("p", { children: place.description }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
            "Capacité max : ",
            place.maxGuests,
            " personnes"
          ] }),
          /* @__PURE__ */ jsx(PerksWidget, { perks: place.perks })
        ] }),
        /* @__PURE__ */ jsx(BookingWidget, { place })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "-mx-8 border-t bg-white px-8 py-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-semibold", children: "Informations supplémentaires" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 mt-2 text-sm leading-5 text-gray-700", children: place.extraInfo })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Avis" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: ((_a2 = place.reviews) == null ? void 0 : _a2.length) ? place.reviews.map((review) => {
          var _a3, _b2;
          return /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded border p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a3 = review.user) == null ? void 0 : _a3.name) || userName }),
              /* @__PURE__ */ jsxs("span", { className: "ml-4", children: [
                "Note : ",
                review.rating,
                " / 5"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { children: review.comment }),
            (_b2 = review.replies) == null ? void 0 : _b2.map((rep) => {
              var _a4;
              return /* @__PURE__ */ jsxs("div", { className: "mt-4 ml-4 border-l-2 pl-4", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: (_a4 = rep.user) == null ? void 0 : _a4.name }),
                " : ",
                rep.comment
              ] }, rep._id);
            }),
            hasToken && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700",
                  onClick: () => setReplyVisible((p2) => ({ ...p2, [review._id]: !p2[review._id] })),
                  children: "Répondre"
                }
              ),
              replyVisible[review._id] && /* @__PURE__ */ jsxs(
                "form",
                {
                  className: "mt-4",
                  onSubmit: (e) => {
                    e.preventDefault();
                    handleReplySubmit(review._id);
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: 2,
                        className: "w-full rounded border p-2",
                        placeholder: "Répondre à cet avis",
                        value: reply[review._id] || "",
                        onChange: (e) => setReply((p2) => ({ ...p2, [review._id]: e.target.value }))
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700",
                        children: "Envoyer"
                      }
                    )
                  ]
                }
              )
            ] })
          ] }, review._id);
        }) : /* @__PURE__ */ jsx("p", { children: "Aucun avis pour l’instant." }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-8 text-2xl font-semibold", children: "Laisser un avis" }),
        hasToken ? /* @__PURE__ */ jsxs("form", { onSubmit: handleReviewSubmit, children: [
          /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
            "Note",
            /* @__PURE__ */ jsxs(
              "select",
              {
                required: true,
                value: rating,
                onChange: (e) => setRating(e.target.value),
                className: "mt-1 block w-full rounded border p-2",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionnez une note" }),
                  [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxs("option", { value: n, children: [
                    n,
                    " étoile",
                    n > 1 && "s"
                  ] }, n))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "mt-4 block font-semibold", children: [
            "Commentaire",
            /* @__PURE__ */ jsx(
              "textarea",
              {
                required: true,
                rows: 4,
                value: comment,
                onChange: (e) => setComment(e.target.value),
                className: "mt-1 block w-full rounded border p-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700",
              children: "Envoyer"
            }
          )
        ] }) : /* @__PURE__ */ jsx("p", { className: "italic", children: "Veuillez vous connecter pour laisser un avis." })
      ] })
    ] })
  ] });
}
const SingleBookedPlace = () => {
  var _a2, _b2, _c;
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/bookings");
      const filteredBooking = data.booking.filter(
        (booking2) => booking2._id === id
      );
      setBooking(filteredBooking[0]);
    } catch (error) {
      console.error("Erreur : ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, [id]);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        ((_a2 = booking == null ? void 0 : booking.place) == null ? void 0 : _a2.title) ? `Réservation - ${booking.place.title}` : "Détails de la réservation",
        " - AtypikHouse"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Consultez les détails de votre réservation pour ${((_b2 = booking == null ? void 0 : booking.place) == null ? void 0 : _b2.title) || "un lieu unique"}.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Détails de la réservation - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Consultez vos informations de réservation sur AtypikHouse."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://votre-domaine.com/bookings/${id}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      (booking == null ? void 0 : booking.place) ? /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: booking.place.title }),
        /* @__PURE__ */ jsx(
          AddressLink,
          {
            className: "my-2 block",
            placeAddress: (_c = booking.place) == null ? void 0 : _c.address
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl md:text-2xl", children: "Informations sur votre réservation" }),
            /* @__PURE__ */ jsx(BookingDates, { booking })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: "Prix total" }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center text-3xl", children: /* @__PURE__ */ jsxs("span", { children: [
              booking.price,
              "€"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PlaceGallery, { place: booking.place })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Aucune donnée disponible" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nous n'avons pas pu trouver les détails de cette réservation." })
      ] })
    ] })
  ] });
};
const NotFoundPage = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "404 - Page non trouvée | AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre exploration."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "404 - Page non trouvée" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Erreur 404 - La page demandée n'existe pas ou a été déplacée. Cliquez pour retourner à l'accueil."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/404" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-2 pt-40", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-base font-semibold text-black",
          role: "alert",
          "aria-label": "Erreur 404",
          children: "404"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-semibold tracking-tight text-black sm:text-5xl", children: "Oups ! Nous ne trouvons pas la page que vous recherchez." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-600", children: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée." }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-center gap-x-3", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-[10px] bg-gray-900 p-2 px-20 hover:bg-gray-700",
          "aria-label": "Retour à l'accueil",
          children: /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: "Accueil" })
        }
      ) }) })
    ] }) })
  ] });
};
const LegalPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Mentions légales & Politique de confidentialité | AtypikBookings" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Mentions légales, conditions générales d'utilisation et politique de confidentialité d'AtypikBookings." }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://atypikbookings.com/legal" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-primary mb-4", children: "Mentions légales & Confidentialité" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "Transparence, sécurité et confiance : tout ce que vous devez savoir sur l'utilisation de notre plateforme." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("section", { className: "bg-white shadow-lg rounded-xl p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-3", children: "1. Éditeur du site" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
          "Ce site est édité par la société ",
          /* @__PURE__ */ jsx("strong", { children: "AtypikBookings" }),
          ", SARL au capital de 5 000 €, immatriculée au RCS de Paris sous le numéro 123 456 789."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Adresse : 123 rue de l'Aventure, 75000 Paris" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
          "Email : ",
          /* @__PURE__ */ jsx("a", { href: "mailto:contact@atypikbookings.com", className: "text-primary underline", children: "contact@atypikbookings.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white shadow-lg rounded-xl p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-3", children: "2. Hébergeur" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
          "Le site est hébergé par ",
          /* @__PURE__ */ jsx("strong", { children: "Vercel, Inc." }),
          /* @__PURE__ */ jsx("br", {}),
          "Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white shadow-lg rounded-xl p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-3", children: "3. Conditions Générales d’Utilisation (CGU)" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "L’utilisation du site AtypikBookings implique l’acceptation pleine et entière des conditions générales d’utilisation. Ces dernières peuvent être modifiées à tout moment." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white shadow-lg rounded-xl p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-3", children: "4. Propriété intellectuelle" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Tous les éléments du site (textes, images, logos, etc.) sont la propriété exclusive d’AtypikBookings, sauf indication contraire." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-white shadow-lg rounded-xl p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-3", children: "5. Politique de confidentialité" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Les données personnelles collectées via le site sont utilisées uniquement pour améliorer l’expérience utilisateur. Elles sont traitées dans le respect du RGPD." }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mt-2", children: [
          "Vous disposez d’un droit d’accès, de rectification ou de suppression de vos données. Contactez-nous à : ",
          /* @__PURE__ */ jsx("a", { href: "mailto:contact@atypikbookings.com", className: "text-primary underline", children: "contact@atypikbookings.com" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "text-sm text-gray-500 text-center mt-16", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " AtypikBookings. Tous droits réservés."
    ] })
  ] });
};
const AdminDashboard = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Tableau de Bord Administrateur - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez les utilisateurs, équipements, propriétés et commentaires depuis le tableau de bord administrateur."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-center text-gray-800 mb-12", children: "Tableau de Bord Administrateur" }),
      /* @__PURE__ */ jsxs("nav", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/users",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-blue-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2.25c-2.762 0-7.5 1.44-7.5 4.25v.75h15v-.75c0-2.81-4.738-4.25-7.5-4.25z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Gérer les utilisateurs" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/equipments",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-green-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M6 18.75V5.25c0-1.35 1.125-2.25 2.25-2.25h7.5c1.125 0 2.25.9 2.25 2.25v13.5"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Gérer les équipements" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/properties",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-yellow-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M19.5 15v4.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-4.5M4.5 10.5L12 4.5l7.5 6M12 4.5v10.5"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Gérer les propriétés" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/comments",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-red-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3 8.25h18M3 12h18M3 15.75h18M5.25 8.25v10.5M18.75 8.25v10.5"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Modérer les commentaires" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const API_BASE_URL2 = "https://atypikhouse-api.onrender.com";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL2}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => setUsers(response.data.data)).catch((error) => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, [API_BASE_URL2]);
  const handleDelete = (userId) => {
    const adminUser = users.find((user) => user._id === userId && user.isAdmin);
    if (adminUser) {
      alert("Vous ne pouvez pas supprimer l'utilisateur administrateur principal.");
      return;
    }
    const token = localStorage.getItem("token");
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`${API_BASE_URL2}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => setUsers(users.filter((user) => user._id !== userId))).catch((error) => console.error("Erreur lors de la suppression :", error));
    }
  };
  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Êtes-vous sûr de vouloir changer le rôle de cet utilisateur ?")) {
      axios.put(
        `${API_BASE_URL2}/api/admin/update-user-role/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((response) => {
        setUsers(
          users.map(
            (user) => user._id === userId ? { ...user, role: response.data.data.role } : user
          )
        );
      }).catch((error) => console.error("Erreur lors du changement de rôle :", error));
    }
  };
  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };
  const handleSave = (userId) => {
    const token = localStorage.getItem("token");
    axios.put(
      `${API_BASE_URL2}/api/admin/update-user/${userId}`,
      { name: editedName, email: editedEmail },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      setUsers(
        users.map(
          (user) => user._id === userId ? { ...user, name: editedName, email: editedEmail } : user
        )
      );
      setEditingUserId(null);
    }).catch((error) => console.error("Erreur lors de la mise à jour :", error));
  };
  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) && (roleFilter ? user.role === roleFilter : true)
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Gestion des Utilisateurs - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez les utilisateurs inscrits sur AtypikHouse. Modifiez leurs informations ou supprimez leurs comptes."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Utilisateurs" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-2 md:flex-row md:gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher par nom...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "p-2 border rounded w-full md:w-1/3"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: roleFilter,
            onChange: (e) => setRoleFilter(e.target.value),
            className: "p-2 border rounded w-full md:w-1/3",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Tous les rôles" }),
              /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
              /* @__PURE__ */ jsx("option", { value: "modérateur", children: "Modérateur" }),
              /* @__PURE__ */ jsx("option", { value: "utilisateur", children: "Utilisateur" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Nom" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Rôle" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: filteredUsers.length > 0 ? filteredUsers.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: editedName,
              onChange: (e) => setEditedName(e.target.value),
              className: "p-1 border rounded"
            }
          ) : user.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: editedEmail,
              onChange: (e) => setEditedEmail(e.target.value),
              className: "p-1 border rounded"
            }
          ) : user.email }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: user.role,
              onChange: (e) => handleRoleChange(user._id, e.target.value),
              className: "p-1 border rounded",
              disabled: user.isAdmin,
              children: [
                /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
                /* @__PURE__ */ jsx("option", { value: "modérateur", children: "Modérateur" }),
                /* @__PURE__ */ jsx("option", { value: "utilisateur", children: "Utilisateur" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 mr-2",
                onClick: () => handleSave(user._id),
                children: "Enregistrer"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700",
                onClick: () => setEditingUserId(null),
                children: "Annuler"
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2",
                onClick: () => handleEdit(user),
                children: "Modifier"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700",
                onClick: () => handleDelete(user._id),
                children: "Supprimer"
              }
            )
          ] }) })
        ] }, user._id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-4 py-2 text-center", children: "Aucun utilisateur trouvé." }) }) })
      ] })
    ] })
  ] });
};
const basePerks = [
  // Base perks avec icônes déjà configurées
  {
    name: "wifi",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-wifi" })
    // Exemple avec Font Awesome
  },
  {
    name: "parking",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-parking" })
  },
  {
    name: "tv",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-tv" })
  },
  {
    name: "pets",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-paw" })
  }
];
const AdminPerks = () => {
  const [perks, setPerks] = useState([]);
  const [newPerk, setNewPerk] = useState("");
  const API_BASE_URL2 = "https://atypikhouse-api.onrender.com";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL2}/api/admin/perks`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      const fetchedPerks = response.data.data;
      const perksWithIcons = fetchedPerks.map((perk) => {
        const foundPerk = basePerks.find((p2) => p2.name === perk.name);
        return foundPerk ? { ...perk, icon: foundPerk.icon } : perk;
      });
      setPerks(perksWithIcons);
    }).catch((error) => console.error("Erreur lors de la récupération des perks :", error));
  }, [API_BASE_URL2]);
  const handleAddPerk = () => {
    if (!newPerk.trim()) {
      alert("Le nom du perk est obligatoire.");
      return;
    }
    const token = localStorage.getItem("token");
    axios.post(
      `${API_BASE_URL2}/api/admin/perks`,
      { name: newPerk },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((response) => {
      setPerks([...perks, { name: newPerk, icon: null }]);
      setNewPerk("");
    }).catch((error) => console.error("Erreur lors de l’ajout du perk :", error));
  };
  const handleDeletePerk = (perkName) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce perk ?")) {
      return;
    }
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL2}/api/admin/perks/${perkName}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setPerks(perks.filter((perk) => perk.name !== perkName));
    }).catch((error) => console.error("Erreur lors de la suppression du perk :", error));
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Perks" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Nom du perk...",
          value: newPerk,
          onChange: (e) => setNewPerk(e.target.value),
          className: "p-2 border rounded mr-2"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleAddPerk,
          className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700",
          children: "Ajouter"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Nom" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: perks.length > 0 ? perks.map((perk) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-2 text-center flex items-center justify-center", children: [
          perk.icon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: perk.icon }),
          /* @__PURE__ */ jsx("span", { children: perk.name })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDeletePerk(perk.name),
            className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
            children: "Supprimer"
          }
        ) })
      ] }, perk.name)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-4 py-2 text-center", children: "Aucun perk disponible." }) }) })
    ] })
  ] });
};
const AdminProperties = () => {
  const [places, setPlaces] = useState([]);
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [editedPlace, setEditedPlace] = useState({});
  const API_BASE_URL2 = "https://atypikhouse-api.onrender.com";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL2}/api/admin/places`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => setPlaces(response.data.data)).catch((error) => console.error("Erreur lors de la récupération des propriétés :", error));
  }, [API_BASE_URL2]);
  const handleEditPlace = (place) => {
    setEditingPlaceId(place._id);
    setEditedPlace({ ...place });
  };
  const handleSavePlace = (placeId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir sauvegarder les modifications ?")) return;
    const token = localStorage.getItem("token");
    axios.put(`${API_BASE_URL2}/api/admin/places/${placeId}`, editedPlace, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setPlaces(
        (prevPlaces) => prevPlaces.map(
          (place) => place._id === placeId ? response.data.data : place
        )
      );
      setEditingPlaceId(null);
    }).catch((error) => console.error("Erreur lors de la sauvegarde :", error));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prevPlace) => ({ ...prevPlace, [name]: value }));
  };
  const handleDeletePlace = (placeId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) return;
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL2}/api/admin/places/${placeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
    }).catch((error) => console.error("Erreur lors de la suppression :", error));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet$1, { children: [
      /* @__PURE__ */ jsx("title", { children: "Gestion des Propriétés - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez les propriétés disponibles sur AtypikHouse. Modifiez, ajoutez ou supprimez les propriétés facilement."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Propriétés" }),
      places.length > 0 ? places.map((place) => /* @__PURE__ */ jsx("div", { className: "mb-8 p-4 border rounded", children: editingPlaceId === place._id ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "title",
            value: editedPlace.title,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Titre"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "address",
            value: editedPlace.address,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Adresse"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "description",
            value: editedPlace.description,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Description"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "price",
            value: editedPlace.price,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Prix par nuit (€)"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "maxGuests",
            value: editedPlace.maxGuests,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Nombre maximum d'invités"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleSavePlace(place._id),
            className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2",
            children: "Enregistrer"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setEditingPlaceId(null),
            className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700",
            children: "Annuler"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: place.title }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Adresse : ",
          place.address
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Description : ",
          place.description
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Prix : ",
          place.price,
          " € par nuit"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Nombre maximum d'invités : ",
          place.maxGuests
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleEditPlace(place),
            className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2",
            children: "Modifier"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDeletePlace(place._id),
            className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
            children: "Supprimer"
          }
        )
      ] }) }, place._id)) : /* @__PURE__ */ jsx("p", { className: "text-center", children: "Aucune propriété disponible." })
    ] })
  ] });
};
const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL2 = "https://atypikhouse-api.onrender.com";
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `${API_BASE_URL2}/api/admin/places/reviews`
        );
        setComments(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [API_BASE_URL2]);
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) return;
    try {
      await axiosInstance.delete(`${API_BASE_URL2}/api/admin/reviews/${commentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };
  const handleDeleteReply = async (reviewId, replyId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) return;
    try {
      await axiosInstance.delete(
        `${API_BASE_URL2}/api/admin/reviews/${reviewId}/replies/${replyId}`
      );
      setComments(
        (prevComments) => prevComments.map(
          (comment) => comment._id === reviewId ? {
            ...comment,
            replies: comment.replies.filter((reply) => reply._id !== replyId)
          } : comment
        )
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la réponse :", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 px-8 pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold", children: "Modération des Commentaires" }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: comments.length > 0 ? comments.map((comment) => {
      var _a2, _b2;
      return /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 border rounded", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a2 = comment.user) == null ? void 0 : _a2.name) || "Utilisateur inconnu" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-4 text-gray-500", children: [
              "Note : ",
              comment.rating,
              " / 5"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteComment(comment._id),
              className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
              children: "Supprimer"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", children: comment.comment }),
        ((_b2 = comment.replies) == null ? void 0 : _b2.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 ml-4 border-l-2 pl-4", children: comment.replies.map((reply) => {
          var _a3;
          return /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a3 = reply.user) == null ? void 0 : _a3.name) || "Utilisateur inconnu" }),
              ": ",
              reply.comment
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDeleteReply(comment._id, reply._id),
                className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
                children: "Supprimer"
              }
            )
          ] }, reply._id);
        }) })
      ] }, comment._id);
    }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Aucun commentaire pour l'instant." }) })
  ] });
};
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  location.pathname.startsWith("/admin");
  const isCommentsRoute = location.pathname === "/admin/comments";
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  }
  if (user.isAdmin) {
    return children;
  }
  if (user.role === "modérateur" && isCommentsRoute) {
    return children;
  }
  return /* @__PURE__ */ jsx(Navigate, { to: "/not-authorized" });
};
function App({ initialPlaces = [], initialUser = null, initialBookings = [], initialPerks = [] }) {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getItemFromLocalStorage("token")}`;
    }
  }, []);
  return /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: "113386016415-fpi8agr1d3smcvau618ntc8ma25kitbt.apps.googleusercontent.com", children: /* @__PURE__ */ jsx(UserProvider, { initialUser, children: /* @__PURE__ */ jsxs(PlaceProvider, { initialPlaces, children: [
    /* @__PURE__ */ jsx(Routes, { location, children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(IndexPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(RegisterPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account", element: /* @__PURE__ */ jsx(ProfilePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places", element: /* @__PURE__ */ jsx(PlacesPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places/new", element: /* @__PURE__ */ jsx(PlacesFormPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places/:id", element: /* @__PURE__ */ jsx(PlacesFormPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/place/:id", element: /* @__PURE__ */ jsx(PlacePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/bookings", element: /* @__PURE__ */ jsx(BookingsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/OwnerBenefitsPage", element: /* @__PURE__ */ jsx(OwnerBenefitsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/legal", element: /* @__PURE__ */ jsx(LegalPage, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/account/bookings/:id",
          element: /* @__PURE__ */ jsx(SingleBookedPlace, {})
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/admin/dashboard", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminDashboard, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/users", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminUsers, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/equipments", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminPerks, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/properties", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminProperties, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/comments", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminComments, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(k, { autoClose: 2e3, transition: w })
  ] }) }) });
}
async function render(url2, initialData = {}, res) {
  var _a2;
  const helmetContext = {};
  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:4000";
  let initialPlaces = initialData.initialPlaces || [];
  if (url2 === "/") {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/places`);
      initialPlaces = response.data.places || [];
      console.log("✅ SSR: loaded", initialPlaces.length, "places");
    } catch (err) {
      console.error("❌ SSR: error loading places:", err.message);
    }
  }
  const initialUser = initialData.initialUser || null;
  const helmetModules = /* @__PURE__ */ new Set();
  const app = /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: ((_a2 = initialData.env) == null ? void 0 : _a2.VITE_GOOGLE_CLIENT_ID) || "", children: /* @__PURE__ */ jsx(UserProvider, { initialUser, children: /* @__PURE__ */ jsx(PlaceProvider, { initialPlaces, children: /* @__PURE__ */ jsx(StaticRouter, { location: url2, children: /* @__PURE__ */ jsx(
    App,
    {
      initialUser,
      initialPlaces,
      initialBookings: initialData.initialBookings || [],
      initialPerks: initialData.initialPerks || []
    }
  ) }) }) }) }) });
  const appHtml = renderToString(app);
  return {
    appHtml,
    helmet: helmetContext.helmet,
    initialData: {
      ...initialData,
      initialPlaces
    },
    modules: Array.from(helmetModules)
  };
}
export {
  render
};
//# sourceMappingURL=entry-server-BdAPdo4O.js.map
