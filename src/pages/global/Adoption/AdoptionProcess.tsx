
import React, { useState } from 'react';
import { api } from "../../../services/api"; 

const AdoptionProcess = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        catId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData); 
        api.post('/adopt', formData)
            .then(response => {
                console.log('Adopción exitosa', response.data);
                
            })
            .catch(error => {
                console.error('Error en el proceso de adopción', error);
                
            });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Proceso de Adopción</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Tu Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Tu Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    name="catId"
                    placeholder="ID del Gato"
                    value={formData.catId}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
                    Enviar Solicitud de Adopción
                </button>
            </form>
        </div>
    );
};

export default AdoptionProcess;
