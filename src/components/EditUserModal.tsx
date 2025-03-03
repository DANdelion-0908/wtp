import React, { useEffect, useState } from 'react';
import { fetchCountries } from '@/app/functions/country';

interface Country {
    continent: string;
    country_code: string;
    name: string;
    description: string;
    language: string;
    id: number;
}

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (countryId: number, countryName: string) => void; // Devolver el nombre del país
    username: string;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSave, username }) => {
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [countries, setCountries] = useState<Country[] | null>(null);

    useEffect(() => {
        async function gettingCountries() {
            try {
                const fetchedCountries = await fetchCountries();
                console.log("Los países:", fetchedCountries.countries);
                setCountries(fetchedCountries.countries);
            } catch (error) {
                console.error("Error al obtener los países:", error);
            }
        }

        gettingCountries();
    }, []);

    const handleSave = () => {
        if (selectedCountry !== null && countries) {
            const selectedCountryData = countries.find((country) => country.id === selectedCountry);
            if (selectedCountryData) {
                onSave(selectedCountry, selectedCountryData.name); // Devolver el ID y el nombre del país
                onClose();
            }
        } else {
            alert("Por favor, selecciona un país.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[30%]">
                <h2 className="text-xl font-bold mb-4">Editar País</h2>
                <p className="mb-4">Editando el perfil de: <strong>{username}</strong></p> {/* Mostrar el username */}
                <select
                    className="select select-bordered w-full mb-4 text-black"
                    onChange={(e) => setSelectedCountry(Number(e.target.value))}
                    value={selectedCountry || ""}
                >
                    <option value="">Selecciona un país</option>
                    {countries && countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-4">
                    <button
                        className="btn btn-primary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="btn btn-accent"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};