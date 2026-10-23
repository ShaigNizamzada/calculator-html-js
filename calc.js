// Kalkulyatorun hesablama məntiqi (DOM-dan asılı deyil, test edilə bilər)
(function (root) {
  function initial() {
    return { current: "0", prev: null, op: null, fresh: false, history: "", error: false };
  }

  function compute(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  function fmt(n) {
    if (!isFinite(n)) return "Xəta";
    return String(parseFloat(n.toPrecision(12)));
  }

  function symbol(op) {
    return { "+": "+", "-": "−", "*": "×", "/": "÷" }[op] || "";
  }

  function digit(s, d) {
    if (s.error) s = initial();
    if (s.fresh) return Object.assign({}, s, { current: d, fresh: false });
    if (s.current.replace(/[-.]/g, "").length >= 12) return s;
    return Object.assign({}, s, { current: s.current === "0" ? d : s.current + d });
  }

  function decimal(s) {
    if (s.error) s = initial();
    if (s.fresh) return Object.assign({}, s, { current: "0.", fresh: false });
    if (s.current.includes(".")) return s;
    return Object.assign({}, s, { current: s.current + "." });
  }

  function operator(s, op) {
    if (s.error) return s;
    let prev = s.prev;
    let current = s.current;
    if (s.op && !s.fresh) {
      const r = compute(parseFloat(s.prev), parseFloat(s.current), s.op);
      if (!isFinite(r)) return Object.assign(initial(), { current: "Xəta", error: true });
      current = fmt(r);
      prev = current;
    } else {
      prev = s.current;
    }
    return { current: current, prev: prev, op: op, fresh: true, history: prev + " " + symbol(op), error: false };
  }

  function equals(s) {
    if (s.error || !s.op || s.prev === null) return s;
    const r = compute(parseFloat(s.prev), parseFloat(s.current), s.op);
    const hist = s.prev + " " + symbol(s.op) + " " + s.current + " =";
    if (!isFinite(r)) return Object.assign(initial(), { current: "Xəta", error: true, history: hist });
    return { current: fmt(r), prev: null, op: null, fresh: true, history: hist, error: false };
  }

  function clear() { return initial(); }

  function back(s) {
    if (s.error || s.fresh) return s;
    const c = s.current.length > 1 && !(s.current.length === 2 && s.current[0] === "-")
      ? s.current.slice(0, -1) : "0";
    return Object.assign({}, s, { current: c });
  }

  function sign(s) {
    if (s.error || s.current === "0") return s;
    const c = s.current[0] === "-" ? s.current.slice(1) : "-" + s.current;
    return Object.assign({}, s, { current: c });
  }

  function percent(s) {
    if (s.error) return s;
    return Object.assign({}, s, { current: fmt(parseFloat(s.current) / 100), fresh: true });
  }

  const api = { initial, digit, decimal, operator, equals, clear, back, sign, percent, compute, fmt, symbol };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Calc = api;
})(typeof window !== "undefined" ? window : globalThis);
