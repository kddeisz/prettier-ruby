const { long, ruby } = require("./utils");

describe.each(["while", "until"])("%s", keyword => {
  test("aligns predicates", () =>
    expect(`foo ${keyword} ${long} || ${long}`).toChangeFormat(
      ruby(`
      ${keyword} ${long} ||
          ${Array(keyword.length)
            .fill()
            .join(" ")}${long}
        foo
      end
    `)
    ));

  describe("inlines allowed", () => {
    test("transforms to inline", () =>
      expect(`${keyword} a\n  1\nend`).toChangeFormat(`1 ${keyword} a`));

    test("maintains inlines", () => expect(`1 ${keyword} a`).toMatchFormat());

    test("breaks on large predicates", () =>
      expect(`${keyword} ${long}\n  1\nend`).toMatchFormat());

    test("breaks inlines on large predicates", () =>
      expect(`1 ${keyword} ${long}`).toChangeFormat(
        `${keyword} ${long}\n  1\nend`
      ));

    test("does not break into block when modifying a begin", () => {
      const content = ruby(`
        begin
          foo
        end ${keyword} bar
      `);

      return expect(content).toMatchFormat();
    });

    test("breaks when an assignment is in the predicate", () => {
      const content = ruby(`
        ${keyword} (a = 1)
          a
        end
      `);

      return expect(content).toMatchFormat();
    });

    test("breaks when a multi assignment is in the predicate", () => {
      const content = ruby(`
        ${keyword} (a, b = 1, 2)
          a
        end
      `);

      return expect(content).toMatchFormat();
    });

    test("wraps single lines in parens when assigning", () =>
      expect(
        `hash[:key] = ${keyword} false do break :value end`
      ).toChangeFormat(`hash[:key] = (break :value ${keyword} false)`));
  });

  describe("inlines not allowed", () => {
    test("maintains multiline", () =>
      expect(`${keyword} a\n  1\nend`).toMatchFormat({ inlineLoops: false }));

    test("transforms to multiline", () =>
      expect(`1 ${keyword} a`).toChangeFormat(`${keyword} a\n  1\nend`, {
        inlineLoops: false
      }));

    test("breaks on large predicates", () =>
      expect(`${keyword} ${long}\n  1\nend`).toMatchFormat({
        inlineLoops: false
      }));

    test("breaks inlines on large predicates", () =>
      expect(`1 ${keyword} ${long}`).toChangeFormat(
        `${keyword} ${long}\n  1\nend`,
        { inlineLoops: false }
      ));

    test("does not break into block when modifying a begin", () => {
      const content = ruby(`
        begin
          foo
        end ${keyword} bar
      `);

      return expect(content).toMatchFormat({ inlineLoops: false });
    });
  });
});
