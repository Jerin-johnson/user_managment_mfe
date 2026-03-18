import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="border-2 border-blue-500 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 max-w-2xl mx-auto mt-8 shadow-xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
        Auth Micro Frontend
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/user/login"
          className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          👤 User Login
        </Link>
        <Link
          to="/user/register"
          className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          ➕ User Register
        </Link>
        <Link
          to="/admin/login"
          className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          🛡️ Admin Login
        </Link>
        <Link
          to="/admin/register"
          className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          🔧 Admin Register
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/forgot"
          className="block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          🔑 Forgot Password
        </Link>
        <Link
          to="/reset"
          className="block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          🔄 Reset Password
        </Link>
      </div>
    </div>
  );
};

export default App;
