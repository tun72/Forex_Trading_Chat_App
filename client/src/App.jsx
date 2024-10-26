import { Toaster } from "react-hot-toast";
import Router from "./router/Router";

function App() {
  

  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 1000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
          },
        }}
      ></Toaster>
      <Router />
    </>
  );
}

export default App;
