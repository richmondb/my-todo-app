import Form from 'react-bootstrap/Form';
import './App.css'
import Button from 'react-bootstrap/Button';
import React, {useEffect} from 'react';
import {TodoItem} from "./components/TodoItem.tsx";
import Todo from "./interface/Todo.ts";

function App() {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [todoTitle, setTodoTitle] = React.useState('');
    const [todoBody, setTodoBody] = React.useState('');
    const [isEditing, setEditing] = React.useState(false);
    const [editingIndex, setEditingIndex] = React.useState(0);

    /**
     * Function to add a new todo item.
     *
     * @param {React.FormEvent} e - the form event
     * @return {void} no return value
     */
    const addTodo: (e: React.FormEvent) => void = (e: React.FormEvent): void => {
        e.preventDefault();
        // console.log(todoTitle, todoBody);
        // Reset the form input contents
        setTodos([...todos, {title: todoTitle, body: todoBody, completed: false, date: new Date().toLocaleString()}])
        setTodoTitle('');
        setTodoBody('');
    };

    /**
     * Removes a todo item at the specified index.
     *
     * @param {number} index - The index of the todo item to be removed
     * @return {void}
     */
    const removeTodo: (index: number) => void = (index: number): void => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    /**
     * Toggle the completion status of a todo at the specified index.
     *
     * @param {number} index - The index of the todo to be toggled
     * @return {void}
     */
    const completeTodo: (index: number) => void = (index: number): void => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };
    /**
     * Edit a specific todo item.
     *
     * @param {number} index - The index of the todo item to edit
     * @return {void}
     */
    const editTodo: (index: number) => void = (index: number): void => {
        const newTodos = [...todos];
        setTodoTitle(newTodos[index].title);
        setTodoBody(newTodos[index].body);
        setEditingIndex(index);
        setEditing(true);
    };

    /**
     * Saves the edit for the specified todo item at the given index.
     *
     * @param {number} index - The index of the todo item to be edited
     * @return {void}
     */
    const saveEdit: (index: number) => void = (index: number): void => {
        const newTodos = [...todos];
        newTodos[index].title = todoTitle;
        newTodos[index].body = todoBody;
        setTodos(newTodos);
        setTodoTitle('');
        setTodoBody('');
        setEditingIndex(0);
        setEditing(false);
    };

    const removeCompleted = (): void => setTodos(todos.filter(todo => !todo.completed));

    const markAllComplete = (): void => setTodos(todos.map(todo => ({...todo, completed: true})));

    const markAllIncomplete = (): void => setTodos(todos.map(todo => ({...todo, completed: false})));

    // const removeAll = (): void => {
    //     setTodos([]);
    // }

    /**
     * Executes the specified effect function when the component mounts, retrieving and setting the 'todos' state from localStorage if it exists.
     */
    useEffect(() => {
        if (localStorage.getItem('todos') !== null) {
            setTodos(JSON.parse(localStorage.getItem('todos') || '[]'));
        }
    }, []);

    /**
     * Executes the specified effect function when the 'todos' state changes, storing the data in localStorage if 'todos' is not empty.
     */
    useEffect(() => {
        // Store data only if todos is not empty
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            // Clear localStorage if todos is empty
            localStorage.removeItem('todos');
        }
    }, [todos]);


    return (
        <>
            {/*<div className='d-relative' style={{width: '600px'}}>*/}
            {/*    <div>*/}
            {/*        <h1 className='text-center text-lexorange'>Todo List</h1>*/}
            {/*    </div>*/}
            {/*    <div className='p-3 bg-light rounded-3'>*/}
            {/*        <Form onSubmit={addTodo}>*/}
            {/*            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">*/}
            {/*                <Form.Label className={'text-lexpurple'}>Todo Title</Form.Label>*/}
            {/*                <Form.Control value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} required*/}
            {/*                              type="text" placeholder="My Todo Title"/>*/}
            {/*            </Form.Group>*/}
            {/*            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">*/}
            {/*                <Form.Label className={'text-lexpurple'}>Todo Description</Form.Label>*/}
            {/*                <Form.Control value={todoBody} onChange={(e) => setTodoBody(e.target.value)} as="textarea"*/}
            {/*                              rows={4} placeholder='My Todo Description'/>*/}
            {/*            </Form.Group>*/}
            {/*            <div className='d-flex justify-content-end gap-2'>*/}
            {/*                {isEditing ?*/}
            {/*                    <Button type='button' variant='info' onClick={() => saveEdit(Number(editingIndex))}>Save*/}
            {/*                        Edit</Button> : null}*/}
            {/*                <Button className={'btn-lexorange'} disabled={isEditing} type='submit'>Add Todo</Button>*/}
            {/*            </div>*/}
            {/*        </Form>*/}
            {/*    </div>*/}

            {/*    <div className='pt-2'>*/}
            {/*        <h6 className={'text-lexpurple'}>My Todos</h6>*/}
            {/*    </div>*/}

            {/*    <div className='d-flex flex-column gap-2 p-3 bg-light rounded-3'>*/}

            {/*        {todos.length === 0 ? <h6 className='text-center fs-3 text-lexorange'>No Todos Yet</h6> : null}*/}

            {/*        {todos.map((todo, index) => (*/}
            {/*            <TodoItem key={index} index={index} todo={todo} removeTodo={removeTodo} editTodo={editTodo}*/}
            {/*                      completeTodo={completeTodo} isEditing={isEditing}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={{width: '900px'}}>
                <div className={'p-2'}>
                    <h3 className='text-start text-lexorange'>Todo List</h3>
                </div>
                <div className={'d-flex'}>
                    <div className={'w-50 border border-lexpurple p-2'}>
                        <Form onSubmit={addTodo}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={'text-lexpurple'}>Todo Title</Form.Label>
                                <Form.Control value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} required
                                              type="text" placeholder="My Todo Title"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className={'text-lexpurple'}>Todo Description</Form.Label>
                                <Form.Control value={todoBody} onChange={(e) => setTodoBody(e.target.value)}
                                              as="textarea"
                                              rows={4} placeholder='My Todo Description'/>
                            </Form.Group>
                            <div className='d-flex gap-2'>
                                <Button className={'btn-lexorange w-100'} disabled={isEditing} type='submit'>Add
                                    Todo</Button>
                                {isEditing ?
                                    <Button className={'btn-lexorange w-100'} type='button' variant='info'
                                            onClick={() => saveEdit(Number(editingIndex))}>Save
                                        Edit</Button> : null}
                            </div>
                        </Form>
                        <div className={'d-flex flex-column gap-2 mt-5 pt-5'}>
                            <Button className={'btn-lexorange w-100'} disabled={isEditing} onClick={markAllComplete} variant={'outline-primary'}
                                    type='button'>Mark all as Complete</Button>
                            <Button className={'btn-lexorange w-100'} disabled={isEditing} onClick={markAllIncomplete} variant={'outline-primary'}
                                    type='button'>Mark all as Incomplete</Button>
                            <Button className={'btn-lexorange w-100'} disabled={isEditing} onClick={removeCompleted} variant={'outline-primary'}
                                    type='button'>Remove all Completed</Button>
                            <Button className={'btn-lexorange w-100'} disabled={isEditing} onClick={() => setTodos([])} variant={'outline-danger'}
                                    type='button'>Remove all Todo</Button>
                        </div>
                    </div>
                    <div className={'w-75 border border-lexpurple p-2'}>
                        {todos.length === 0 ? <h6 className='text-center fs-3 text-lexorange'>No Todos Yet</h6> : null}

                        <div className={'d-flex flex-column gap-2'}>
                            {todos.map((todo, index) => (
                                <TodoItem key={index} index={index} todo={todo} removeTodo={removeTodo}
                                          editTodo={editTodo}
                                          completeTodo={completeTodo} isEditing={isEditing}/>
                            ))}
                        </div>


                    </div>
                </div>
            </div>


        </>
    )
}

export default App
