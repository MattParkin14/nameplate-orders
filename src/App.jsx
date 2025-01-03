import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import NameplateOrderForm from './components/NameplateOrderForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/order" element={
          <div className="w-full flex items-center justify-center p-6">
            <div className="w-[800px] bg-white rounded-lg shadow-lg p-8">
              <NameplateOrderForm />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App