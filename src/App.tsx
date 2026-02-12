
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { TransactionProvider } from './features/transactions/context/TransactionContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.css'; // Preserving existing CSS import if any

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <AppRoutes />
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
