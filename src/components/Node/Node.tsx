import { motion, usePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useNodesData } from '../../api/hooks/apiHooks';
import { NodeType, TreeNode } from '../../types/NodeData';
import styles from './Node.module.css';

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
    <ListItem>
      {'children' in node && node.children.length > 0 ? (
        <button
          className={styles.toggleButton}
          aria-pressed={isExpanded(id)}
          onClick={() => onToggleExpand(id)}
        >
          {'>'}
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
    </ListItem>
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
      <motion.ul layout>
        {Object.entries(data).map(([id, child]) => (
          <Node
            key={child.item.id}
            node={child}
            onToggleExpand={onToggleExpand}
            isExpanded={isExpanded}
          />
        ))}
      </motion.ul>
    );
  }

  if (status === 'loading') {
    return <>loading children...</>;
  }

  return <>else</>;
}

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };
function ListItem({ children }: { children: ReactNode }) {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute',
    },
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  } as const;
  return <motion.li {...animations}>{children}</motion.li>;
}
