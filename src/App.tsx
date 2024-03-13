import Form from 'react-bootstrap/Form';
import './App.css'
import Button from 'react-bootstrap/Button';
import React, {useEffect} from 'react';
import TodoItem from "./components/TodoItem.tsx";
import Todo from "./interface/Todo.ts";
import emptyLogo from "./assets/empty-list.svg"

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

    return (<>
        <div className={'border border-lexpurple rounded-2'} style={{width: '900px'}}>
            <div className={'p-2'}>
                <h3 className='text-center text-lexorange'>Todo List</h3>
            </div>
            <div className={'d-flex'}>
                {/* Left Side of the Panel */}
                <div className={'w-50 border-end border-top border-lexpurple p-2'}>
                    <Form onSubmit={addTodo}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Todo Title</Form.Label>
                            <Form.Control className={'border-lexlightorange'} value={todoTitle}
                                          onChange={(e) => setTodoTitle(e.target.value)} required
                                          type="text" placeholder="My Todo Title"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Todo Description</Form.Label>
                            <Form.Control className={'border-lexlightorange'} value={todoBody}
                                          onChange={(e) => setTodoBody(e.target.value)}
                                          as="textarea"
                                          rows={4} placeholder='My Todo Description'/>
                        </Form.Group>
                        <div className='d-flex gap-2'>
                            <Button className={'btn-lexorange w-100'} disabled={isEditing} type='submit'>Add
                                Todo</Button>
                            {isEditing ? <Button className={'btn-lexpurple w-100'} type='button' variant='info'
                                                 onClick={() => saveEdit(Number(editingIndex))}>Save
                                Edit</Button> : null}
                        </div>
                    </Form>
                    <div className={'d-flex flex-column gap-2 mt-5 pt-5'}>
                        <Button className={'btn-outline-lexpurple w-100'} disabled={isEditing}
                                onClick={markAllComplete} variant={'outline-primary'}
                                type='button'>Mark all as Complete</Button>
                        <Button className={'btn-outline-lexpurple w-100'} disabled={isEditing}
                                onClick={markAllIncomplete} variant={'outline-primary'}
                                type='button'>Mark all as Incomplete</Button>
                        <Button className={'btn-outline-lexpurple w-100'} disabled={isEditing}
                                onClick={removeCompleted} variant={'outline-primary'}
                                type='button'>Remove all Completed</Button>
                        <Button className={'w-100'} disabled={isEditing} onClick={() => setTodos([])}
                                variant={'outline-danger'}
                                type='button'>Remove all Todo</Button>
                    </div>
                </div>

                {/* Right Side of the Panel */}
                <div className={'w-75 border-top border-lexpurple p-2'}>
                    {todos.length === 0 ?
                        <div className={'h-100 d-flex justify-content-center align-items-center flex-column'}>
                            <img src={emptyLogo} alt="empty-task"/>
                            <h3 className={'text-lexpurple'}>Empty List</h3>
                        </div> : <div className={'d-flex flex-column gap-1'}>
                            {todos.map((todo, index) => (
                                <TodoItem key={index} index={index} todo={todo} removeTodo={removeTodo}
                                          editTodo={editTodo}
                                          completeTodo={completeTodo} isEditing={isEditing}/>))}
                        </div>}
                </div>
            </div>
        </div>
    </>)
}

export default App
