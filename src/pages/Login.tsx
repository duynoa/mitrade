import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import logo from '../../favicon.png';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    //check email and password
    if (email !== 'admin@mytrade.com' || password !== '12345') {
      setError('Email hoặc mật khẩu không chính xác.');
      return;
    }
    setError('');
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center"
        autoComplete="on"
      >
        <div className="mb-4 flex flex-col items-center">
          <div className="bg-blue-500 rounded-lg p-3 mb-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-1">mi<span className="text-blue-600">trade</span></h1>
          <p className="text-gray-500 text-sm">Professional transaction management system</p>
        </div>
        <div className="w-full mb-4">
          <Input
            type="email"
            label={undefined}
            placeholder="Username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
            className=""
          />
        </div>
        <div className="w-full mb-4">
          <Input
            type="password"
            label={undefined}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className=""
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
} 