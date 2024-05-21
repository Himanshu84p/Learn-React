import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* outlet */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

// VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
// VITE_APPWRITE_PROJECT_ID="6647354300250405e330"
// VITE_APPWRITE_DATABASE_ID="66473646001af25fe7e2"
// VITE_APPWRITE_COLLECTION_ID="66473674002cf58860a1"
// VITE_APPWRITE_BUCKET_ID="664ad918003d7d00b754"
