import styles from './ListTasks.module.css';
const ListTasks = ({ name, children }) => {
    return (
        <div
            className={styles.blockList}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, board)}
        >
            <div className="px-6 py-1">
                <h2 className="font-bold text-xl my-1">{name}</h2>
            </div>
            {children}
        </div>
    );
};

export default ListTasks;