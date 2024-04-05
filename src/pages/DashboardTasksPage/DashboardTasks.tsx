import styles from './DashboardTasks.module.css';
import React, {useState} from "react";
import {dummyData} from "../../mock/mock.ts";
import {Card} from "antd";

const DashboardTasks = () => {
    const [data, setData] = React.useState(dummyData);
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    function dragOverHandler(e) {
        e.preventDefault()
        if(e.target.id === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board: object, item: any) {
        e.preventDefault()
        const currentIndex = currentBoard.cards.indexOf(currentItem)
        currentBoard.cards.splice(currentIndex, 1)
        const dropIndex = board.cards.indexOf(item)
        board.cards.splice(dropIndex + 1, 0, currentItem)
        // @ts-ignore
        setData(data.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    function dropCardHandler(e, board: object) {
        board.cards.push(currentItem)
        const currentIndex = currentBoard.cards.indexOf(currentItem)
        currentBoard.cards.splice(currentIndex, 1)
        // @ts-ignore
        setData(data.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    return (
        <div className="p-10 flex flex-col h-screen">
            <h1 className="font-semibold text-3xl py-2">Trello-Style Drag & Drop</h1>
            <p>Let's drag some cards around!</p>
            <div className={styles.blockListsTasks}>
                {data.map((list) => {
                    return (
                        <div
                            className={styles.blockList}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropCardHandler(e, list)}
                        >
                            <div className="px-6 py-1">
                                <h2 className="font-bold text-xl my-1">{list.name}</h2>
                            </div>
                            {list.cards.map(card =>
                                    <Card id={"item"}
                                          key={card.id}
                                          style={{width: 300}}
                                          draggable={true}
                                          onDragOver={(e) => dragOverHandler(e)}
                                          onDragLeave={(e) => dragLeaveHandler(e)}
                                          onDragStart={(e) => dragStartHandler(e, list, card)}
                                          onDragEnd={(e) => dragEndHandler(e)}
                                          onDrop={(e) => dropHandler(e, list, card)}
                                    >
                                        <p>{card.title}</p>
                                    </Card>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardTasks;