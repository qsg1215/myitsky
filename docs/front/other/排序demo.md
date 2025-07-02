# 排序demo

```javascript
// 排序demo
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const App = ({ dataSource, renderItem }) => {
    const [items, setItems] = useState(dataSource);

    // 拖拽结束时触发的事件
    const onDragEnd = (result) => {
        const { source, destination } = result;
        // 如果没有目标位置，直接返回
        if (!destination) return;

        // 如果目标位置和起始位置相同，也直接返回
        if (source.index === destination.index) return;

        // 重新排序
        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, removed);
        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            maxHeight: 710, // 限制容器最大高度
                            overflowY: 'auto', // 超出高度时滚动
                        }}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={ String(item.id)} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            marginBottom:12,
                                            background: snapshot.isDragging ? '#d4e6fc' : '#ffffff',
                                            boxShadow: snapshot.isDragging
                                                ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                                                : 'none',
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        {renderItem(item, index)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default App;

```