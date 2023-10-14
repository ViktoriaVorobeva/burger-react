import React, { useState, useCallback } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import constructorIngridient from "./constructor-ingridients.module.css";

  export const ConstructorIngridient = ({ id, index, moveCard, children }) => {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
      accept: 'ingridient',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        moveCard(dragIndex, hoverIndex)
        item.index = hoverIndex
      },
    })

    const [{ isDragging }, drag] = useDrag({
      type: 'ingridient',
      item: () => {
        return { id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    return (
      <div className={constructorIngridient.container} ref={ref} style={{opacity }} data-handler-id={handlerId}>
        {children}
      </div>
    )
  }