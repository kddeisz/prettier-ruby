const { long } = require("./utils");

describe("return", () => {
  test("bare", () => expect("return").toMatchFormat());

  test("one arg, no parens", () => expect("return 1").toMatchFormat());

  test("one arg, with parens", () =>
    expect("return(1)").toChangeFormat("return 1"));

  test("multiple args", () => expect("return 1, 2").toMatchFormat());

  test("return method call", () => expect("return foo :bar").toMatchFormat());

  test("return with breaking", () =>
    expect(`return ${long}`).toChangeFormat(`return(\n  ${long}\n)`));

  test("returning an array", () =>
    expect("return [1, 2, 3]").toChangeFormat("return 1, 2, 3"));

  test("returning a list that breaks", () =>
    expect(`return ${long}, ${long}`).toChangeFormat(
      `return [\n  ${long},\n  ${long}\n]`
    ));

  test("returning an array within parens", () =>
    expect("return([1, 2, 3])").toChangeFormat("return 1, 2, 3"));

  test("returning a long special array", () =>
    expect(`return %w[${long}]`).toChangeFormat(
      `return(\n  %w[\n    ${long}\n  ]\n)`
    ));

  test("returning two arguments, one that breaks", () =>
    expect(`return foo, ${long}`).toChangeFormat(
      `return [\n  foo,\n  ${long}\n]`
    ));
});
