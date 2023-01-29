import classNames from 'classnames';
import styles from './Spinner.module.css';

export function Spinner({ className }: { className?: string }) {
  return <span className={classNames(className, styles.loader)}></span>;
}
