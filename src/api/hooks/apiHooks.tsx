import { useQuery } from 'react-query';
import { GenericNode, NodeType } from '../../types/NodeData';
import { getData } from './networkClient';
import { nodeTypePluralMap } from './nodePlurals';

export function useNodesData<T extends NodeType>(type: T, ids: string[] = []) {
  const queryKey = [nodeTypePluralMap[type], ids.sort()];
  const url = new URL(`https://mockserver.fake/api/${nodeTypePluralMap[type]}`);
  ids.forEach((nodeId) => url.searchParams.append('id', nodeId));

  return useQuery<Record<string, GenericNode<T>>>(
    queryKey,
    () => getData(url) as Promise<Record<string, GenericNode<T>>>,
    {
      refetchOnWindowFocus: false,
    }
  );
}
