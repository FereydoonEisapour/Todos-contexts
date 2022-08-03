import { useEffect, useState } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import TodoItem from './TodoItem'
import db from '../../data/firebase';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../features/userSlics';
const AllTodos = () => {
    console.log('<AllTodo /> renderd');
    const [todos, setTodos] = useState([]);
    const userEmail = useSelector(selectUserEmail);
    useEffect(() => {
        if (userEmail) {
            db.collection(userEmail).doc(userEmail).collection('todos').orderBy('done', 'asc').onSnapshot(snapshot => {
                setTodos(snapshot.docs.map(doc => ({ id: doc.id, done: doc.data().done, todo: doc.data().todo })));
            })
        }
    }, [userEmail])
    return (
        <ListGroup className={`my-4 rounded-4 `} style={{ width: " 30rem" }} >
            <ListGroup.Item className="
                          w-100 d-flex justify-content-between" >
                <div className="lead " >Tasks</div>
                <div >
                    <Badge variant="light" className='bg-light text-primary '>{todos.length}
                    </Badge> </div>
            </ListGroup.Item>
            {todos.map(todo =>
                <TodoItem
                    key={todo.id} textTodo={todo.todo} id={todo.id} done={todo.done}
                />
            )}
        </ListGroup>
    )
}
export default AllTodos
