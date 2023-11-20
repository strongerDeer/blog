import styles from './Tab.module.scss';

interface TabProps {
  tabList?: any;
  activeTab?: any;
  onClick?: any;
}

export default function Tab({ tabList, activeTab, onClick }: TabProps) {
  return (
    <div className={styles.tabWrap}>
      {tabList.map((tab: any) => (
        <button
          key={tab.id}
          data-id={tab.id}
          type="button"
          className={tab.id === activeTab ? styles.active : ''}
          onClick={onClick}>
          {tab.text}
        </button>
      ))}
    </div>
  );
}
