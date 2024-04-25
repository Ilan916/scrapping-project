import React, { useState } from 'react';
import ErrorList from '../ErrorComposent/ErrorList'
import ErrorDetails from '../ErrorComposent/ErrorDetails';
import Input from '../Input/Input';
import Button from '../Buttons/Button'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal'

export default function Example() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedError, setSelectedError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlStructure, setHtmlStructure] = useState('');

const audit = async () => {
  setResults(null);
  setSelectedError(null);
  setIsLoading(true);
  try {
      const response = await axios.post('http://localhost:3000/audit', { url });
      setResults(response.data);
      setIsLoading(false);
  } catch (error) {
      console.error('Erreur lors de l\'audit', error);
      alert('Erreur lors de l\'audit');
      setIsLoading(false);
  }
};

const fetchElementStructure = async (selector) => {
  // setIsLoading(true);
  setModalLoading(true);
  try {
      const response = await axios.post('http://localhost:3000/fetch-element-structure', { url, selector });
      setHtmlStructure(response.data.structure);
      setIsModalOpen(true);
      // setIsLoading(false);
      setModalLoading(false);
  } catch (error) {
      console.error('Erreur lors de la récupération de la structure de l\'élément :', error);
      alert('Erreur lors de la récupération de la structure de l\'élément');
      // setIsLoading(false);
      setModalLoading(false);
  }
};

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
                {isLoading && <Loader />}
            </div>
           <p>Page audité : <span className='font-semibold'>{url}</span></p> 
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-2 py-10 sm:px-6 lg:px-8 flex-wrap">
        <aside className=" sticky top-8 w-50 shrink-0 lg:block border-x border-y p-4 border-gray-200 bg-white rounded-md">
          {/* Left column area */}
          <h2 className='text-base font-semibold leading-6 text-gray-900 px-2'>Liste des erreurs</h2>
          <ErrorList errors={results?.violations} onSelectError={setSelectedError} />
          </aside>

        <main className="flex-1 overflow-scroll">
          {/* Main area */}
          <ErrorDetails isModalLoading={isModalLoading}  error={selectedError} fetchElementStructure={fetchElementStructure} setIsModalOpen={setIsModalOpen} />
          {isModalOpen && (
            <Modal isOpen={isModalOpen} error={selectedError} htmlContent={htmlStructure} onRequestClose={() => setIsModalOpen(false)} />
          )}
          </main>
      </div>
    </div>
  )
}
