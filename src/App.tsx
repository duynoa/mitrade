import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DashboardLayout } from './components/layouts/dashboard-layout';
import { AnalyzePage } from './pages/analyze';
import { CashierPage } from './pages/cashier';
import { DashboardPage } from './pages/dashboard';
import Login from './pages/Login';
import { MembersPage } from './pages/members';
import { SupportPage } from './pages/support';
import { TransactionsPage } from './pages/transactions';
import LanguageSelection from './pages/LanguageSelection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelection />} />
        <Route path="/login" element={<Login />} />
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