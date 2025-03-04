import React, { useEffect, useState } from 'react';
import { fetchCountries } from '@/app/functions/country';
import { changeUserCountry } from '@/app/functions/country';

interface Country {
    continent: string;
    country_code: string;
    name: string;
    description: string;
    language: string;
    id: number;
}

interface EditUserModalProps {
    onSave: (countryId: number, countryName: string) => void;
    username: string;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ onSave, username }) => {
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

    const handleSave = async () => {
        if (selectedCountry !== null && countries) {
            const selectedCountryData = countries.find((country) => country.id === selectedCountry);
            if (selectedCountryData) {

                await changeUserCountry(username, selectedCountryData.name)
                localStorage.setItem('userCountry', JSON.stringify(selectedCountryData))
                onSave(selectedCountry, selectedCountryData.name); // Devolver el ID y el nombre del país
                document.getElementById('userEditModal').close()

            }
        } else {
            alert("Por favor, selecciona un país.");
            return;
        }
    };

    return (
        <dialog id='userEditModal' className='modal'>
            <div className='modal-box h-auto overflow-hidden bg-gray-800'>
                <h2 className="text-xl font-bold mb-4">Editar</h2>
                <p className="mb-4">Editando el perfil de: <strong>{username}</strong></p> {/* Mostrar el username */}
                    <select
                        className="select select-bordered w-full text-white mb-4 text-black"
                        onChange={(e) => setSelectedCountry(Number(e.target.value))}
                        value={selectedCountry || ""}
                        >
                        <option value="">Selecciona un país</option>
                        {countries && countries.map((country, index) => (
                            <option key={`${country.id}-${index}`} value={country.id}>
                                {country.name}
                            </option>
                        ))}

                    </select>
                    <div className="flex justify-end gap-4">
                        <button
                            className="btn btn-ghots"
                            onClick={() => document.getElementById('userEditModal').close()}
                            >
                            Cancelar
                        </button>
                        <button
                        type='submit'
                            className="btn btn-accent"
                            onClick={handleSave}
                            >
                            Guardar
                        </button>
                    </div>
            </div>
        </dialog>
    );
};