import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './components/layout/MainLayout'; // Import MainLayout
// Placeholder for ViagemDetailPage - will be created later
// import ViagemDetailPage from './pages/ViagemDetailPage'; 

// Placeholder for a ProtectedRoute component
const ProtectedRoute = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    // Use MainLayout for routes that need it
    return (
        <MainLayout>
            <Outlet /> {/* Child routes will render here */}
        </MainLayout>
    );
};

// Placeholder for ViagemDetailPage component for now
const ViagemDetailPagePlaceholder = () => {
    const { useParams } = require('react-router-dom'); // Local require for simplicity
    let { viagemId } = useParams();
    const RelatoriosViagem = require('../components/RelatoriosViagem').default;

    return (
        // MainLayout will be applied by ProtectedRoute
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Detalhes da Viagem ID: {viagemId}</h1>
            <p className="mb-4">Conteúdo da página de detalhes da viagem, formulários de destino/despesa e outras informações irão aqui.</p>
            <div className="my-6 p-4 bg-white shadow-md rounded-lg">
                <h2 class="text-xl font-semibold text-gray-700 mb-3">Componente de Relatórios da Viagem</h2>
                 <RelatoriosViagem viagemId={parseInt(viagemId)} />
            </div>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Routes that use MainLayout via ProtectedRoute */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/viagens/:viagemId" element={<ViagemDetailPagePlaceholder />} />
                        {/* Add other protected routes here that should use MainLayout */}
                    </Route>

                    <Route path="*" element={<Navigate to="/login" />} /> {/* Default redirect to login if not authenticated or no match */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

