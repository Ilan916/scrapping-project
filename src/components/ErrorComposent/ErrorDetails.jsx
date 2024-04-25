import React from 'react';
import Button from '../Buttons/Button';
import Loader from '../Loader/Loader';

const ErrorDetails = ({ error, fetchElementStructure, isModalLoading }) => {
    if (!error) {
        return (
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Aucune Erreur Sélectionnée</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Sélectionnez une erreur pour voir les détails.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Détails de l'Erreur</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informations détaillées sur l'erreur d'accessibilité sélectionnée.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{error.description}</dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Impact</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{error.impact}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Sélecteurs Affectés</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                            <ul>
                                {error.nodes.map((node, index) => (
                                    <li className='pb-2' key={index}>
                                      <pre><code >{node.target.join(', ')}</code></pre>  
                                        <div className='py-2 border-b'>
                                            <strong>Problèmes à vérifier :</strong>
                                            <ul>
                                                {node.any.map((issue, i) => (
                                                    <li key={i}>{issue.message}</li>
                                                ))}
                                            </ul>
                                            <div className='py-2'>
                                                <Button ContentText="Voir le HTML" onClickFunction={() => fetchElementStructure(node.target.join(', '))} />
                                                {isModalLoading && <Loader />}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aide</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                            <a href={error.helpUrl} target="_blank" rel="noopener noreferrer">{error.help}</a>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Tags</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{error.tags.join(', ')}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default ErrorDetails;
