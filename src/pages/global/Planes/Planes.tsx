  
   import React from 'react';
   import { NavLink } from 'react-router-dom';

   const Planes = () => {
     const donationPlans = [
       {
         id: 1,
         title: 'Plan Básico',
         amount: '$10/mes',
         description: 'Contribuye con el cuidado básico de nuestros gatos.',
       },
       {
         id: 2,
         title: 'Plan Avanzado',
         amount: '$25/mes',
         description: 'Ayuda a proporcionar alimentos y atención veterinaria.',
       },
       {
         id: 3,
         title: 'Plan Premium',
         amount: '$50/mes',
         description: 'Contribuye a la adopción y rescate de gatos.',
       },
     ];

     return (
       <div className="container mx-auto p-6">
         <h1 className="text-4xl font-bold mb-6">Planes de Donación</h1>
         <p className="text-lg text-gray-500 mb-4">
           Elige un plan de donación que se ajuste a tus posibilidades y ayúdanos a cuidar de nuestros gatos.
         </p>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {donationPlans.map((plan) => (
             <div key={plan.id} className="border rounded-lg p-4 shadow-lg">
               <h2 className="text-2xl font-semibold mb-2">{plan.title}</h2>
               <p className="text-xl font-bold mb-2">{plan.amount}</p>
               <p className="text-gray-600 mb-4">{plan.description}</p>
               <NavLink to="/donaciones" className="bg-primary text-white py-2 px-4 rounded-lg text-center block">
                 Donar Ahora
               </NavLink>
             </div>
           ))}
         </div>
       </div>
     );
   };

   export default Planes;
   