// UI qatı: düymələr və klaviatura Calc məntiqinə bağlanır
(function () {
  let state = Calc.initial();
  const currentEl = document.getElementById("current");
  const historyEl = document.getElementById("history");

  function render() {
    currentEl.textContent = state.current.replace(".", ",");
    historyEl.textContent = state.history.replace(/\./g, ",");
    document.querySelectorAll(".key.op").forEach(function (b) {
      b.classList.toggle("active", state.fresh && state.op === b.dataset.op);
    });
  }

  function handle(action, data) {
    switch (action) {
      case "digit": state = Calc.digit(state, data.value); break;
      case "decimal": state = Calc.decimal(state); break;
      case "op": state = Calc.operator(state, data.op); break;
      case "equals": state = Calc.equals(state); break;
      case "clear": state = Calc.clear(); break;
      case "back": state = Calc.back(state); break;
      case "sign": state = Calc.sign(state); break;
      case "percent": state = Calc.percent(state); break;
    }
    render();
  }

  document.querySelector(".keys").addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (btn) handle(btn.dataset.action, btn.dataset);
  });

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (/^[0-9]$/.test(k)) handle("digit", { value: k });
    else if (k === "." || k === ",") handle("decimal", {});
    else if ("+-*/".includes(k)) handle("op", { op: k });
    else if (k === "Enter" || k === "=") { e.preventDefault(); handle("equals", {}); }
    else if (k === "Backspace") handle("back", {});
    else if (k === "Escape" || k === "Delete") handle("clear", {});
    else if (k === "%") handle("percent", {});
  });

  render();
})();
