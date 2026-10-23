const assert = require("assert");
const C = require("./calc.js");

function run(keys) {
  let s = C.initial();
  for (const k of keys) {
    if (/\d/.test(k)) s = C.digit(s, k);
    else if (k === ".") s = C.decimal(s);
    else if ("+-*/".includes(k)) s = C.operator(s, k);
    else if (k === "=") s = C.equals(s);
    else if (k === "C") s = C.clear();
    else if (k === "B") s = C.back(s);
    else if (k === "S") s = C.sign(s);
    else if (k === "%") s = C.percent(s);
  }
  return s.current;
}

assert.strictEqual(run("12+3="), "15");
assert.strictEqual(run("9-10="), "-1");
assert.strictEqual(run("6*7="), "42");
assert.strictEqual(run("8/4="), "2");
assert.strictEqual(run("1/0="), "Xəta");
assert.strictEqual(run("0.1+0.2="), "0.3");
assert.strictEqual(run("2+3*4="), "20"); // soldan sağa ardıcıl hesablama
assert.strictEqual(run("5+"), "5");
assert.strictEqual(run("123B"), "12");
assert.strictEqual(run("5S"), "-5");
assert.strictEqual(run("50%"), "0.5");
assert.strictEqual(run("1.5.5"), "1.55");
assert.strictEqual(run("1/0=7"), "7");
assert.strictEqual(run("5+3=C"), "0");
assert.strictEqual(run("1234567890123"), "123456789012");
console.log("Bütün testlər keçdi");
