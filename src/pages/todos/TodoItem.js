import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import db from "../../data/firebase";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/userSlics";

const TodoItem = ({ textTodo, done, id }) => {
  console.log('<TodoItem /> renderd');
  
  const [editModal, setEditModal] = useState(false);

  const [editText, setEditText] = useState("");
  const userEmail = useSelector(selectUserEmail);
  const [checkedInput, setCheckedInput] = useState(done);
  const handleClose = () => setEditModal(false);
  const inputHandler = (event) => setEditText(event.target.value);

  const delTodo = () => db.collection(userEmail).doc(userEmail).collection("todos").doc(id).delete();
  const editTodo = () => setEditModal(true);

  const toggleDone = () => {
    setCheckedInput(!done);  
    setTimeout(() => {

      db.collection(userEmail).doc(userEmail).collection("todos").doc(id).set(
        {
          done: !done,
        },
        { merge: true }
      );
    }, 1200);
  };

  
  const updateTodo = () => {
    db.collection(userEmail).doc(userEmail).collection("todos").doc(id).set(
      {
        todo: editText,
      },
      { merge: true }
    );
    setEditModal(false);
  };

  return (
    <>
      {!editModal ? (
        <>
          <div className="todo-item border border-0 w-100 d-flex justify-content-between   ">
            <div className="col-10 ">
              <svg
                viewBox="0 0 0 0"
                style={{ position: "absolute", zIndex: -1, opacity: 0 }}
              >
                <defs>
                  <linearGradient
                    id="boxGradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="25"
                    y2="25"
                  >
                    <stop offset="0%" stopColor="#27FDC7" />
                    <stop offset="100%" stopColor="#0FC0F5" />
                  </linearGradient>
                  <linearGradient id="lineGradient">
                    <stop offset="0%" stopColor="#0FC0F5" />
                    <stop offset="100%" stopColor="#27FDC7" />
                  </linearGradient>
                  <path
                    id="todo__line"
                    stroke="url(#lineGradient)"
                    d="M21 12.3h168v0.1z"
                  ></path>
                  <path
                    id="todo__box"
                    stroke="url(#boxGradient)"
                    d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
                  ></path>
                  <path
                    id="todo__check"
                    stroke="url(#boxGradient)"
                    d="M10 13l2 2 5-5"
                  ></path>
                </defs>
              </svg>
              <label className="todo " onClick={toggleDone}>
                <input
                  className="todo__state"
                  type="checkbox"
                  checked={checkedInput}
                  readOnly
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 200 25"
                  className="todo__icon"
                >
                  <use xlinkHref="#todo__line" className="todo__line"></use>
                  <use xlinkHref="#todo__box" className="todo__box"></use>
                  <use xlinkHref="#todo__check" className="todo__check"></use>
                  <use xlinkHref="#todo__circle" className="todo__circle"></use>
                </svg>
                <div
                  className="todo__text text-capitalize d-flex"
                  style={{ fontSize: "20px" }}
                >
                  {textTodo}
                </div>
              </label>
            </div>
            <div className=" col-2 d-flex justify-content-evenly ">
              <button className="btn border-0 p-0  " onClick={delTodo}>
                <span className="material-icons btn-todo">delete</span>
              </button>
              <button
                className="btn border-0 p-0 "
                style={{ marginRight: "15px" }}
                onClick={editTodo}
              >
                <span className="material-icons btn-todo ">edit</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-100 d-flex justify-content-between border-1 border todo-item ">
            <div className="col-10">
              <svg
                viewBox="0 0 0 0"
                style={{ position: "absolute", zIndex: -1, opacity: 0 }}
              >
                <defs>
                  <linearGradient
                    id="boxGradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="25"
                    y2="25"
                  >
                    <stop offset="0%" stopColor="#27FDC7" />
                    <stop offset="100%" stopColor="#0FC0F5" />
                  </linearGradient>
                  <linearGradient id="lineGradient">
                    <stop offset="0%" stopColor="#0FC0F5" />
                    <stop offset="100%" stopColor="#27FDC7" />
                  </linearGradient>
                  <path
                    id="todo__line"
                    stroke="url(#lineGradient)"
                    d="M21 12.3h168v0.1z"
                  ></path>
                  <path
                    id="todo__box"
                    stroke="url(#boxGradient)"
                    d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
                  ></path>
                  <path
                    id="todo__check"
                    stroke="url(#boxGradient)"
                    d="M10 13l2 2 5-5"
                  ></path>
                  <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
                </defs>
              </svg>
              <input
                type="text"
                className="w-100 p-2 h5  border border-0 mx-3 "
                placeholder={textTodo}
                value={editText}
                onChange={inputHandler}
              />
            </div>
            <div className=" col-2 d-flex justify-content-evenly ">
              <button className="btn border-0 p-0  " onClick={handleClose}>
                <span className="material-icons btn-todo">cancel</span>
              </button>
              <button className="btn border-0 p-0 " onClick={updateTodo}>
                <span className="material-icons btn-todo">done</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

TodoItem.propTypes = {
  textTodo: PropTypes.string,
  done: PropTypes.bool,
  id: PropTypes.string,
};
export default TodoItem;
