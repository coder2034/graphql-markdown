import { promises as fs } from "fs";

import kebabCase from "kebab-case";

import { renderNode, saveMarkdownFile, slug } from "../src/lib/render";

import kindDirective, {
  directiveDeprecated,
  directiveSpecifiedBy,
} from "./__data__/node/directive";
import kindEnum from "./__data__/node/enum";
import kindInput from "./__data__/node/input";
import kindInterface from "./__data__/node/interface";
import kindMutation from "./__data__/node/mutation";
import kindObject from "./__data__/node/object";
import kindQuery from "./__data__/node/query";
import kindScalar from "./__data__/node/scalar";
import kindSubscription from "./__data__/node/subscription";
import kindUnion from "./__data__/node/union";

// mock config implementation
jest.mock("../src/lib/config", () => {
  return {
    getConfigurationOption: jest.fn((name) => {
      return name === "layouts"
        ? "./layouts"
        : name === "output"
        ? "./output"
        : name;
    }),
  };
});

describe.only("render", () => {
  describe("saveMarkdownFile", () => {
    let spyFsWriteFile: jest.SpyInstance;

    beforeEach(() => {
      spyFsWriteFile = jest
        .spyOn(fs, "writeFile")
        .mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    const nodeKinds: [string, any][] = [
      ["Query", kindQuery],
      ["Mutation", kindMutation],
      ["Subscription", kindSubscription],
      ["Enum", kindEnum],
      ["Object", kindObject],
      ["Input", kindInput],
      ["Scalar", kindScalar],
      ["Interface", kindInterface],
      ["Union", kindUnion],
      ["Directive", kindDirective],
    ];

    describe.each<[string, any]>(nodeKinds)("%s", (kind, node) => {
      it(`should save file in '${kind.toLowerCase()}' folder`, async () => {
        expect.hasAssertions();

        const filepath = await saveMarkdownFile(node);

        const matcher = new RegExp(`.+/${slug(kind)}/${slug(node.name)}.md$`);

        expect(filepath).toEqual(expect.stringMatching(matcher));
        expect(spyFsWriteFile).toHaveBeenCalled();
      });
    });
  });

  describe("renderNode", () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe("Query", () => {
      it("should render Query", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindQuery);

        expect(result).toMatchSnapshot();
      });

      it("should render Query with directive deprecated", async () => {
        expect.hasAssertions();

        const result = await renderNode({
          ...kindQuery,
          directives: [directiveDeprecated],
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe("Mutation", () => {
      it("should render Mutation", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindMutation);

        expect(result).toMatchSnapshot();
      });

      it("should render Mutation with directive deprecated", async () => {
        expect.hasAssertions();

        const result = await renderNode({
          ...kindMutation,
          directives: [directiveDeprecated],
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe("Subscription", () => {
      it("should render Subscription", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindSubscription);

        expect(result).toMatchSnapshot();
      });

      it("should render Subscription with directive deprecated", async () => {
        expect.hasAssertions();

        const result = await renderNode({
          ...kindSubscription,
          directives: [directiveDeprecated],
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe("Enum", () => {
      it("should render Enum", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindEnum);

        expect(result).toMatchSnapshot();
      });
    });

    describe("Object", () => {
      it("should render Object", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindObject);

        expect(result).toMatchSnapshot();
      });
    });

    describe("Input", () => {
      it("should render Input", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindInput);

        expect(result).toMatchSnapshot();
      });
    });

    describe("Scalar", () => {
      it("should render Scalar without description", async () => {
        expect.hasAssertions();

        const result = await renderNode({
          ...kindScalar,
          description: undefined, // eslint-disable-line no-undefined
        });

        expect(result).toMatchSnapshot();
      });

      it("should render Scalar with description supporting Markdown notation", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindScalar);

        expect(result).toMatchSnapshot();
      });

      it("should render Scalar with directive specifiedBy", async () => {
        expect.hasAssertions();

        const result = await renderNode({
          ...kindScalar,
          directives: [directiveSpecifiedBy],
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe("Interface", () => {
      it("should render Interface", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindInterface);

        expect(result).toMatchSnapshot();
      });
    });

    describe("Union", () => {
      it("should render Union", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindUnion);

        expect(result).toMatchSnapshot();
      });
    });

    describe("Directive", () => {
      it("should render Directive", async () => {
        expect.hasAssertions();

        const result = await renderNode(kindDirective);

        expect(result).toMatchSnapshot();
      });
    });
  });
});
