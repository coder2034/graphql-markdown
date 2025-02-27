const {
  toArray,
  convertArrayToObject,
} = require("../../../../src/utils/scalars/array");

describe("utils", () => {
  describe("array", () => {
    describe("toArray()", () => {
      test("returns an array of values from a k/v object", () => {
        const input = {
          bool: true,
          string: "test",
          number: 123,
          array: ["one", "two"],
          child: { key: "value" },
        };
        const expected = [true, "test", 123, ["one", "two"], { key: "value" }];
        expect(toArray(input)).toStrictEqual(expected);
      });

      test("returns undefined if not an object", () => {
        expect(toArray("test")).toBeUndefined();
      });
    });

    describe("convertArrayToObject()", () => {
      test("returns a k/v object from an array of objects with name property", () => {
        const input = [
          { name: true },
          { name: "test" },
          { name: 123 },
          { name2: 1234 },
        ];
        const expected = {
          true: { name: true },
          test: { name: "test" },
          123: { name: 123 },
        };
        expect(convertArrayToObject(input)).toStrictEqual(expected);
      });
    });
  });
});
