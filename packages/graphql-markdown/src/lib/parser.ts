import {
  ArgumentNode,
  BooleanValueNode,
  DirectiveDefinitionNode,
  DirectiveNode,
  DocumentNode,
  EnumValueDefinitionNode,
  EnumValueNode,
  FieldDefinitionNode,
  FloatValueNode,
  InputValueDefinitionNode,
  IntValueNode,
  ListTypeNode,
  ListValueNode,
  NameNode,
  NamedTypeNode,
  NonNullTypeNode,
  ObjectFieldNode,
  ObjectValueNode,
  OperationTypeDefinitionNode,
  OperationTypeNode,
  StringValueNode,
  TypeDefinitionNode,
  visit,
} from "graphql";

const visitor = {
  Argument: (node: ArgumentNode) => {
    return node;
  },
  BooleanValue: ({ value }: BooleanValueNode) => {
    return value;
  },
  Directive: (node: DirectiveNode) => {
    return { ...node, name: `@${node.name}` };
  },
  DirectiveDefinition: (node: DirectiveDefinitionNode) => {
    return { ...node, name: `@${node.name}` };
  },
  Document: ({ definitions }: DocumentNode) => {
    return definitions;
  },
  EnumValue: ({ value }: EnumValueNode) => {
    return value;
  },
  EnumValueDefinition: (node: EnumValueDefinitionNode) => {
    return node;
  },
  FieldDefinition: ({
    type,
    name,
    arguments: args,
    directives,
    kind,
    description,
  }: FieldDefinitionNode) => {
    return {
      ...type,
      arguments: args,
      description,
      directives,
      kind,
      name,
    };
  },
  FloatValue: ({ value }: FloatValueNode) => {
    return value;
  },
  InputValueDefinition: ({
    type,
    name,
    directives,
    defaultValue,
    kind,
    description,
  }: InputValueDefinitionNode) => {
    return {
      ...type,
      defaultValue,
      description,
      directives,
      kind,
      name,
    };
  },
  IntValue: ({ value }: IntValueNode) => {
    return value;
  },
  ListType: ({ type }: ListTypeNode) => {
    return {
      ...type,
      isList: true,
    };
  },
  ListValue: ({ values }: ListValueNode) => {
    return values;
  },
  Name: ({ value }: NameNode) => {
    return value;
  },
  NamedType: ({ name }: NamedTypeNode) => {
    return {
      isList: false,
      isNull: true,
      type: name,
    };
  },
  NonNullType: ({ type }: NonNullTypeNode) => {
    return {
      ...type,
      isNull: false,
    };
  },
  NullValue: () => {
    return "null";
  },
  ObjectField: (node: ObjectFieldNode) => {
    return node;
  },
  ObjectValue: ({ fields }: ObjectValueNode) => {
    return fields;
  },
  OperationType: (node: OperationTypeNode) => {
    return node.toString();
  },
  OperationTypeDefinition: (node: OperationTypeDefinitionNode) => {
    return node;
  },
  StringValue: ({ value }: StringValueNode) => {
    return value;
  },
  TypeDefinition: (node: TypeDefinitionNode) => {
    return node;
  },
} as const;

const OperationTypes = ["query", "mutation", "subscription"] as const;

export const parseSchema = (schema: DocumentNode): any[] => {
  const nodes = visit(schema, { leave: visitor });
  return nodes.flatMap((node) => {
    return OperationTypes.includes(node.name.toLowerCase())
      ? node.fields.map((operation) => {
          return {
            ...operation,
            kind: "OperationTypeDefinition",
            operation: node.name.toLowerCase(),
          };
        })
      : node;
  });
};

export const getSimplifiedNodeKind = (node: any): string => {
  switch (node.kind) {
    case "OperationTypeDefinition":
      return node.operation;
    case "DirectiveDefinition":
      return "Directive";
    case "ScalarTypeDefinition":
    case "EnumTypeDefinition":
    case "InputTypeDefinition":
    case "InterfaceTypeDefinition":
    case "ObjectTypeDefinition":
    case "UnionTypeDefinition":
      return node.kind.replace(/^(?<kind>[A-z]+)TypeDefinition$/, "$<kind>");
    case "InputObjectTypeDefinition":
      return "Input";
    default:
      return "Object";
  }
};
