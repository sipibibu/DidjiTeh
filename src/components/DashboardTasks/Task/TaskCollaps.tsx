import { Card } from 'antd';
import {useState} from "react";

interface TaskProps {
    item: object;
    data: {id: number, name: string, cards: {id: number, title: string}[]}[];
    setData: React.Dispatch<React.SetStateAction<{id: number, name: string, cards: {id: number, title: string}[]}[]>>;
    currentBoard: null;
    setCurrentBoard: React.Dispatch<React.SetStateAction<null>>;
    board: object;
    title: string;
}

const TaskCollaps = ({item, title, board, data, setData, currentBoard, setCurrentBoard}: TaskProps) => {
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

    return (
        <Card id={"item"}
              style={{width: 300}}
              draggable={true}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
        >
            <p>{title}</p>
        </Card>
    )
};

export default TaskCollaps;