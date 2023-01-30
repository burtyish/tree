import { GenericNode, NodeType } from '../../types/NodeData';
import { mockData } from '../mock-data/data';

/**
 *
 * @param url example 'api/connections/id=x&id=y
 */
export async function getData(url: URL) {
  const ids = url.searchParams.getAll('id');
  console.log(`fetching ${url}`);
  await delay(1000); // simulate network delay

  // todo: reduce code duplication
  if (url.pathname.endsWith('connections')) {
    return pickNodes(mockData.connections, ids);
  }
  if (url.pathname.endsWith('databases')) {
    return pickNodes(mockData.databases, ids);
  }
  if (url.pathname.endsWith('schemas')) {
    return pickNodes(mockData.schemas, ids);
  }
  if (url.pathname.endsWith('tables')) {
    return pickNodes(mockData.tables, ids);
  }
  if (url.pathname.endsWith('columns')) {
    return pickNodes(mockData.columns, ids);
  }

  throw new Error(`unrecognized api path: '${url}'`);
}

function pickNodes<T extends NodeType>(
  collection: Record<string, GenericNode<T>>,
  ids: string[]
): Record<string, GenericNode<T>> {
  if (ids.length === 0) {
    return collection;
  }
  const result: Record<string, GenericNode<T>> = {};
  ids.forEach((id) => {
    if (collection[id]) {
      result[id] = collection[id];
    }
  });

  return result;
}

function delay(maxTimeMs: number) {
  return new Promise((resolve) => setTimeout(resolve, random(maxTimeMs)));
}

function random(maxLimit = 100) {
  return Math.random() * maxLimit;
}
