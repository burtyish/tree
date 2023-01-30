import {
  faHelicopter,
  faPlane,
  faSailboat,
  faTrainSubway,
  faTruckMonster,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeType } from '../../../types/NodeData';

export function NodeIcon({
  type,
  className,
}: {
  type: NodeType;
  className?: string;
}) {
  return <FontAwesomeIcon icon={getIcon(type)} />;
}

function getIcon(type: NodeType) {
  switch (type) {
    case 'column':
      return faTruckMonster;
    case 'connection':
      return faPlane;
    case 'database':
      return faSailboat;
    case 'schema':
      return faTrainSubway;
    case 'table':
      return faHelicopter;
  }

  throw new Error(`Unhandled switch case. node type: ${type}`);
}
