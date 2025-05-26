
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdoptButton from '../../components/Buttons/AdoptButton';

const Donaciones = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log(`Donación de: ${amount}`);
    
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Haz una Donación</h1>
      <p className="text-lg text-gray-500 mb-4">
        Tu generosidad ayuda a proporcionar un hogar y atención a nuestros gatos en adopción.
      </p>
      <form onSubmit={handleDonation} className="flex flex-col gap-4">
        <label htmlFor="amount" className="text-lg">
          Monto de la Donación:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Ingresa el monto"
          className="border rounded-lg p-2"
          required
        />
        <AdoptButton label="Donar" variant="primary" />
      </form>
    </div>
  );
};

export default Donaciones;
