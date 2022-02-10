import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import MyRoutes from "./RoutesMy";

function App() {
  return (
    <div >
      <div>
        
        <MyRoutes />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;



