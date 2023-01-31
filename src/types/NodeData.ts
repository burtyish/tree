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

/*
  Testing the types for sanity
* */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const connection: GenericNode<'connection'> = {
  item: {
    type: 'connection',
    id: 'barr2r2r3',
    name: 'public',
  },
  children: [{ type: 'database', id: 'sdQWd', name: 'tiger' }],
};

const column: GenericNode<'column'> = {
  item: {
    type: 'column',
    id: 'foo323r23r',
    name: 'foo',
  },
};
