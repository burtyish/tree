import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useNodesData } from '../../api/hooks/apiHooks';
import { Node } from '../Node/Node';

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
      <AnimatePresence>
        <ul>
          {Object.entries(data).map(([_id, connection]) => (
            <Node
              key={connection.item.id}
              node={connection}
              onToggleExpand={toggleExpanded}
              isExpanded={isNodeExpanded}
            />
          ))}
        </ul>
      </AnimatePresence>
    );
  }

  return <>{status === 'loading' ? 'loading...' : 'else'} </>;
}
