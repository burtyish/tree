export type NodeType =
  | 'connection'
  | 'database'
  | 'schema'
  | 'table'
  | 'column';

type NodeTypesWithChildren = Exclude<NodeType, 'column'>;

interface NodeData<T extends NodeType> {
  type: T;
  id: string;
  name: string;
}

interface NodeWithChildren<NodeType extends NodeTypesWithChildren> {
  item: NodeData<NodeType>;
  children: Array<NodeData<ChildTypeMap[NodeType]>>;
}

interface LeafNode {
  item: NodeData<'column'>;
}

export type GenericNode<T extends NodeType> = T extends NodeTypesWithChildren
  ? NodeWithChildren<T>
  : LeafNode;

export type TreeNode = GenericNode<NodeType>;

type ChildTypeMap = {
  connection: 'database';
  database: 'schema';
  schema: 'table';
  table: 'column';
};

// testing the types for sanity
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x: NodeWithChildren<'connection'> = {
  item: {
    type: 'connection',
    id: 'Sdwdq',
    name: 'public',
  },
  children: [{ type: 'database', id: 'sdQWd', name: 'tiger' }],
};
