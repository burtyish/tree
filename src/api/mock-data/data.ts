import { GenericNode } from '@/types/NodeData';

const columns: Record<string, GenericNode<'column'>> = {
  col0: {
    item: { id: 'col0', name: 'layer', type: 'column' },
  },
  col1: {
    item: { id: 'col1', name: 'name', type: 'column' },
  },
  col2: {
    item: { id: 'col2', name: 'topology', type: 'column' },
  },
  col3: {
    item: { id: 'col3', name: 'layer', type: 'column' },
  },
  col4: {
    item: { id: 'col4', name: 'name', type: 'column' },
  },
  col5: {
    item: { id: 'col5', name: 'topology', type: 'column' },
  },
  col6: {
    item: { id: 'col6', name: 'layer', type: 'column' },
  },
  col7: {
    item: { id: 'col7', name: 'name', type: 'column' },
  },
  col8: {
    item: { id: 'col8', name: 'topology', type: 'column' },
  },
} as const;

const tables: Record<string, GenericNode<'table'>> = {
  tab0: {
    item: { id: 'tab0', name: 'clients', type: 'table' },
    children: [
      {
        id: columns['col0'].item.id,
        type: 'column',
        name: columns['col0'].item.name,
      },
      {
        id: columns['col1'].item.id,
        type: 'column',
        name: columns['col1'].item.name,
      },
    ],
  },
  tab1: {
    item: { id: 'tab1', name: 'deals', type: 'table' },
    children: [
      {
        id: columns['col2'].item.id,
        type: 'column',
        name: columns['col2'].item.name,
      },
      {
        id: columns['col3'].item.id,
        type: 'column',
        name: columns['col3'].item.name,
      },
      {
        id: columns['col4'].item.id,
        type: 'column',
        name: columns['col4'].item.name,
      },
      {
        id: columns['col5'].item.id,
        type: 'column',
        name: columns['col5'].item.name,
      },
    ],
  },
  tab2: {
    item: { id: 'tab2', name: 'table2', type: 'table' },
    children: [
      {
        id: columns['col6'].item.id,
        type: 'column',
        name: columns['col6'].item.name,
      },
    ],
  },
};

const schemas: Record<string, GenericNode<'schema'>> = {
  sche0: {
    item: { id: 'sche0', name: 'schema0', type: 'schema' },
    children: [
      {
        id: tables['tab1'].item.id,
        type: 'table',
        name: tables['tab1'].item.name,
      },
    ],
  },
  sche1: {
    item: { id: 'sche1', name: 'schema1', type: 'schema' },
    children: [
      {
        id: tables['tab2'].item.id,
        type: 'table',
        name: tables['tab2'].item.name,
      },
    ],
  },
};

const databases: Record<string, GenericNode<'database'>> = {
  db0: {
    item: { id: 'db0', name: 'playground_temp', type: 'database' },
    children: [
      {
        type: 'schema',
        id: schemas['sche0'].item.id,
        name: schemas['sche0'].item.name,
      },
      {
        type: 'schema',
        id: schemas['sche1'].item.id,
        name: schemas['sche1'].item.name,
      },
    ],
  },
};

const connections: Record<string, GenericNode<'connection'>> = {
  con0: {
    item: { id: 'con0', name: 'postgreSQL prod', type: 'connection' },
    children: [
      {
        type: 'database',
        id: databases['db0'].item.id,
        name: databases['db0'].item.name,
      },
    ],
  },
};

export const mockData = {
  tables,
  columns,
  connections,
  schemas,
  databases,
};
