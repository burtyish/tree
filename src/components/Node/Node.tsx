import { motion, usePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useNodesData } from '../../api/hooks/apiHooks';
import { NodeType, TreeNode } from '../../types/NodeData';
import { Spinner } from '../Spinner/Spinner';
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
    <>
      <button
        className={styles.toggleButton}
        aria-pressed={isExpanded(id)}
        onClick={() => onToggleExpand(id)}
        disabled={'children' in node && node.children.length > 0 ? false : true}
      >
        <div className={styles.buttonContent}>{'>'}</div>
      </button>
      {`${node.item.type}: ${node.item.name}`}
      {'children' in node && node.children.length > 0 && isExpanded(id) && (
        <NodeChildren
          ids={node.children.map((child) => child.id)}
          type={node.children[0].type}
          onToggleExpand={onToggleExpand}
          isExpanded={isExpanded}
        />
      )}
    </>
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
        {Object.entries(data).map(([id, child], index) => (
          <ListItem key={child.item.id} index={index}>
            <Node
              node={child}
              onToggleExpand={onToggleExpand}
              isExpanded={isExpanded}
            />
          </ListItem>
        ))}
      </motion.ul>
    );
  }

  if (status === 'error') {
    return <>error</>;
  } else {
    return <Spinner className={styles.loader} />;
  }
}

const transition = { type: 'spring', stiffness: 900, damping: 50, mass: 1 };
function ListItem({ children, index }: { children: ReactNode; index: number }) {
  const [isPresent, safeToRemove] = usePresence();

  return (
    <motion.li
      {...{
        layout: true,
        initial: 'out',
        style: {
          position: isPresent ? 'static' : 'absolute',
        },
        animate: isPresent ? 'in' : 'out',
        variants: {
          in: (index) => ({
            scaleY: 1,
            opacity: 1,
            transition: { delay: index * 0.02 },
          }),
          out: { scaleY: 0, opacity: 0 },
        },
        custom: index,
        onAnimationComplete: () => !isPresent && safeToRemove(),
        transition,
      }}
    >
      {children}
    </motion.li>
  );
}
