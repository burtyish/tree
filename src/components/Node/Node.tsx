import { useNodesData } from '../../api/hooks/apiHooks';
import { NodeType, TreeNode } from '../../types/NodeData';

export function Node({
  node,
  isExpanded,
  onToggleExpand,
}: {
  node: TreeNode;
  isExpanded: (id: string) => boolean;
  onToggleExpand: (id: string) => void;
}) {
  const id = node.item.id;
  return (
    <li>
      {'children' in node && node.children.length > 0 ? (
        <button onClick={() => onToggleExpand(id)}>
          {isExpanded(id) ? '[-]' : '[+]'}
        </button>
      ) : (
        <>[ ]</>
      )}

      {`${node.item.type}: ${node.item.name}`}
      {'children' in node && node.children.length > 0 && isExpanded(id) && (
        <NodeChildren
          ids={node.children.map((child) => child.id)}
          type={node.children[0].type}
          onToggleExpand={onToggleExpand}
          isExpanded={isExpanded}
        />
      )}
    </li>
  );
}

function NodeChildren({
  type,
  ids,
  isExpanded,
  onToggleExpand,
}: {
  type: NodeType;
  ids: string[];
  isExpanded: (id: string) => boolean;
  onToggleExpand: (id: string) => void;
}) {
  const { data, status } = useNodesData(type, ids);

  if (status === 'success') {
    return (
      <ul>
        {Object.entries(data).map(([id, child]) => (
          <Node
            key={child.item.id}
            node={child}
            onToggleExpand={onToggleExpand}
            isExpanded={isExpanded}
          />
        ))}
      </ul>
    );
  }

  if (status === 'loading') {
    return <>loading children...</>;
  }

  return <>else</>;
}
