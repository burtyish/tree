import { useQuery } from 'react-query';
import { GenericNode, NodeType } from '../../types/NodeData';
import { getNodes } from '../networkClient';
import { nodeTypePluralMap } from './nodePlurals';

export function useNodesData<T extends NodeType>(
  type: T,
  ids: readonly string[] = []
) {
  const queryKey = [nodeTypePluralMap[type], [...ids].sort()];
  const url = new URL(`https://mockserver.fake/api/${nodeTypePluralMap[type]}`);
  ids.forEach((nodeId) => url.searchParams.append('id', nodeId));

  return useQuery<Record<string, GenericNode<T>>>(
    queryKey,
    async () => {
      const data = (await getNodes(url)) as Record<string, GenericNode<T>>;
      console.log(`fetched ${url}: `, JSON.stringify(data, null, 2));
      return data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
}
