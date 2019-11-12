describe("doctype", () => {
  test("basic", () => {
    expect("!!! Basic").toMatchHamlFormat();
  });

  test("frameset", () => {
    expect("!!! Frameset").toMatchHamlFormat();
  });

  test("mobile", () => {
    expect("!!! Mobile").toMatchHamlFormat();
  });

  test("rdfa", () => {
    expect("!!! RDFa").toMatchHamlFormat();
  });

  test("strict", () => {
    expect("!!! Strict").toMatchHamlFormat();
  });

  test("xml", () => {
    expect("!!! XML").toMatchHamlFormat();
  });

  test("encoding", () => {
    expect("!!! XML iso-8859-1").toMatchHamlFormat();
  });
});
