import NameplateOrderForm from './components/NameplateOrderForm'
import BaseMaterialSelector from './components/BaseMaterialSelector';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mx-4 sm:mx-60">
        <NameplateOrderForm />
      </div>
    </div>
  );
}

export default App