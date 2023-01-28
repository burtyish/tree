import { useNodesData } from '../../api/hooks/apiHooks';
import { Node } from '../Node/Node';

export function Tree({}: {}) {
  const { data, status } = useNodesData('connection');

  if (status === 'success') {
    return (
      <ul>
        {Object.entries(data).map(([_id, connection]) => (
          <Node key={connection.item.id} node={connection} />
        ))}
      </ul>
    );
  }

  return <>{status === 'loading' ? 'loading...' : 'else'} </>;
}
