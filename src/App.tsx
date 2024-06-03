import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import mainRoutes from './routes/MainRoutes';


function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={mainRoutes}></RouterProvider>
        </>
    );
}

export default App;
