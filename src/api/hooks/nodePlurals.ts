import { NodeType } from '../../types/NodeData';

export const nodeTypePluralMap: Record<NodeType, string> = {
  column: 'columns',
  connection: 'connections',
  database: 'databases',
  schema: 'schemas',
  table: 'tables',
};
