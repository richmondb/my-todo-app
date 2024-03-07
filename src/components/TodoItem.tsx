import Todo from "../interface/Todo";
import Button from "react-bootstrap/Button";

export function TodoItem({index, todo, removeTodo, completeTodo, editTodo, isEditing}: {
    index: number,
    isEditing: boolean,
    todo: Todo,
    removeTodo: (index: number) => void,
    completeTodo: (index: number) => void,
    editTodo: (index: number) => void
}) {
    return (
        <div key={index} className='p-2 bg-white border rounded-1' id='card-container'>
            <div className='d-flex justify-content-between align-items-center' id='card-title'>
                <h6 className={'text-lexpurple mb-0'}>{todo.completed ? <del>{todo.title}</del> : todo.title}</h6>
                <div className='d-flex gap-1'>
                    <Button variant='success' size='sm' type='button' onClick={() => completeTodo(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-check-square" viewBox="0 0 16 16">
                            <title>Mark as Complete</title>
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path
                                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </Button>
                    <Button variant='secondary' size='sm' type='button' onClick={() => editTodo(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <title>Edit Todo</title>
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </Button>
                    <Button variant='danger' size='sm' type='button' disabled={isEditing} onClick={() => removeTodo(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-trash3" viewBox="0 0 16 16">
                            <title>Delete Todo</title>
                            <path
                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </Button>
                </div>
            </div>
            <div id='card-body' className={'border-top mt-2'}>
                <p className='w-100 py-1 text-black/. text-break text-pretty mb-0'>
                    {todo.body}
                </p>
            </div>
            <div className={'d-flex justify-content-end'}>
                <p style={{fontSize: '0.8rem'}} className='mb-0 text-lexorange text-opacity-75'>Date
                    Created: {todo.date}</p>
            </div>

        </div>
    );
}