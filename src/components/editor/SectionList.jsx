import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useResume } from '../../hooks/useResume';
import { SectionEditor } from './SectionEditor';

export function SectionList() {
  const { resume, actions } = useResume();

  function handleDragEnd(result) {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    const newOrder = Array.from(resume.sectionOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    actions.reorderSections(newOrder);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="section-list"
          >
            {resume.sectionOrder.map((sectionKey, index) => (
              <Draggable key={sectionKey} draggableId={sectionKey} index={index}>
                {(provided, snapshot) => (
                  <SectionEditor
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    sectionKey={sectionKey}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
