import NameplateOrderForm from './components/NameplateOrderForm'
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="w-full flex items-center justify-center p-6">
      <div className="w-[800px] bg-white rounded-lg shadow-lg p-8">
        <NameplateOrderForm />
      </div>
    </div>
  );
}

export default App