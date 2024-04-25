import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input/Input';
import Button from '../components/Buttons/Button';

function Accebility() {
    const [url, setUrl] = useState('');
    const [results, setResults] = useState(null);

    const audit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/audit', { url });
            setResults(response.data);
        } catch (error) {
            console.error('Erreur lors de l\'audit', error);
            alert('Erreur lors de l\'audit');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-4 mt-10 min-h-80'>
            <h1>Audit d'Accessibilité</h1>
            <div className='flex flex-row gap-1'>
                <div className='w-80'>
                    <Input 
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Entrez l'URL ici"
                    />
                </div>
                <Button onClickFunction={audit} ContentText="Auditer" />
            </div>
            <div>
                {results && (
                    <div>
                        {results.violations.length > 0 ? (
                            <div>
                                <h2>Problèmes détectés :</h2>
                                <ul>
                                {results.violations.map((violation, index) => (
                                    <li key={index}>
                                    <strong>{violation.description}</strong>
                                    <p>Impact: {violation.impact}</p>
                                    <p>Détails: {violation.help}</p>
                                    <p>Catégories: {violation.tags.join(', ')}</p>
                                    <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer">En savoir plus</a>
                                    <h4>Sélecteurs touchés :</h4>
                                    <ul>
                                        {violation.nodes.map((node, nodeIndex) => (
                                        <li key={nodeIndex}>{node.target.join(', ')}</li>
                                        ))}
                                    </ul>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Aucun problème d'accessibilité détecté. Félicitations !</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Accebility;
