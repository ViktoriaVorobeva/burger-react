import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import React, { useRef } from 'react'
import constructorIngridient from "./constructor-ingridients.module.css";

type TConstructorIng = {
  id: string, 
  index: number, 
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number;
  id: string;
  type: string;
  derp: string;
}

  export const ConstructorIngridient = ({ id, index, moveCard, children }: React.PropsWithChildren<TConstructorIng>) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
      accept: 'ingridient-card',
      hover(item: DragItem, monitor: DropTargetMonitor<DragItem>) {
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
        const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top
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
      type: 'ingridient-card',
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
      <div className={constructorIngridient.container} ref={ref} style={{opacity }}>
        {children}
      </div>
    )
  }