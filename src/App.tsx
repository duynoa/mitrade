import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layouts/dashboard-layout';
import { DashboardPage } from './pages/dashboard';
import { CashierPage } from './pages/cashier';
import { MembersPage } from './pages/members';
import { TransactionsPage } from './pages/transactions';
import { SupportPage } from './pages/support';
import { AnalyzePage } from './pages/analyze';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="cashier" element={<CashierPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="analytics" element={<AnalyzePage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;