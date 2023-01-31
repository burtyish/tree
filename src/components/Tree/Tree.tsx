import { useCallback, useState } from 'react';
import { useNodesData } from '../../api/hooks/apiHooks';
import { Node } from '../Node';
import { Spinner } from '../Spinner';
import styles from './Tree.module.css';

export function Tree() {
  const [nodeIdExpanded, setNodeExpanded] = useState<
    Record<string /*id*/, boolean>
  >({});

  const toggleExpanded = useCallback((id: string) => {
    setNodeExpanded((state) => {
      if (!state[id]) {
        return { ...state, [id]: true };
      } else {
        const newState = { ...state };
        delete newState[id];
        return newState;
      }
    });
  }, []);
  const isNodeExpanded = useCallback(
    (id: string) => {
      return !!nodeIdExpanded[id];
    },
    [nodeIdExpanded]
  );
  const { data, status } = useNodesData('connection', []);

  if (status === 'success') {
    return (
      <ul className={styles.root}>
        {Object.entries(data).map(([id, connection]) => (
          <li key={id}>
            <Node
              node={connection}
              onToggleExpand={toggleExpanded}
              isExpanded={isNodeExpanded}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (status === 'error') {
    return <>error</>;
  } else {
    return <Spinner />;
  }
}
