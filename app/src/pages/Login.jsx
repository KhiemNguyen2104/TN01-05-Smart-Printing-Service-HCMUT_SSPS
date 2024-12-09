import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Left Section (Image) */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://hcmut.edu.vn/img/carouselItem/07531069.jpg?t=07531113)' }}></div>

        {/* Right Section (Form) */}
        <div className="w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <img src="hcmut-logo.png" alt="BK Logo" className="w-36 h-auto" />
          </div>
          <h4 className="text-center text-2xl font-semibold mb-2">Welcome back!</h4>
          <h5 className="text-center text-lg text-gray-600 mb-6">Login to your account</h5>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="john@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember Me</label>
            </div>

            {/* Login Button */}
            <button type="submit" className="w-full py-3 mt-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200">Login</button>

            {/* Return Home Link */}
            <div className="text-center mt-4">
              <a href="#" className="text-indigo-600">Return home</a>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification (optional) */}
      <div id="toast" className="fixed top-8 right-8 hidden bg-white shadow-lg p-4 rounded-lg max-w-xs flex items-center space-x-3">
        <i className="fas fa-check-circle text-green-500"></i>
        <div>
          <p className="text-sm font-medium text-gray-700">Success</p>
          <p className="text-xs text-gray-500">Your login was successful!</p>
        </div>
        <button className="text-gray-400 ml-2 text-xl">&times;</button>
      </div>
    </div>
  );
};

export default Login;