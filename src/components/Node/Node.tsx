import { useState } from 'react';
import { useNodesData } from '../../api/hooks/apiHooks';
import { NodeType, TreeNode } from '../../types/NodeData';

export function Node({ node }: { node: TreeNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() {
    setIsExpanded((state) => !state);
  }

  return (
    <li>
      {'children' in node && node.children.length > 0 ? (
        <button onClick={toggleExpand}>{isExpanded ? '[-]' : '[+]'}</button>
      ) : (
        <>[ ]</>
      )}

      {`${node.item.type}: ${node.item.name}`}
      {'children' in node && node.children.length > 0 && isExpanded && (
        <NodeChildren
          ids={node.children.map((child) => child.id)}
          type={node.children[0].type}
        />
      )}
    </li>
  );
}

function NodeChildren({ type, ids }: { type: NodeType; ids: string[] }) {
  const { data, status } = useNodesData(type, ids);

  if (status === 'success') {
    return (
      <ul>
        {Object.entries(data).map(([id, child]) => (
          <Node key={child.item.id} node={child} />
        ))}
      </ul>
    );
  }

  if (status === 'loading') {
    return <>loading children...</>;
  }

  return <>else</>;
}
