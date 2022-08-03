import AddTodo from "../addTodo/AddTodo";
import SignInPage from "../../pages/auth/SignInPage";
import { useSelector } from "react-redux";
import { selectUserEmail } from "./../../features/userSlics";
import AllTodos from "./AllTodos";
const Todos = () => {
  console.log('<Todos /> renderd');
  const userEmail = useSelector(selectUserEmail);
  return (
    <>
      {userEmail ? (
        <div className={`container `}>
          <div className="d-flex justify-content-center">
            <AddTodo />
          </div>
          <div className="d-flex  justify-content-evenly ">
            <AllTodos />
          </div>
        </div>
      ) : (
        <SignInPage />
      )}
    </>
  );
};
export default Todos;
