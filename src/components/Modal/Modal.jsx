import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function SidePanel({ isOpen, onRequestClose, htmlContent, error }) {
  // Utiliser isOpen de props pour contrôler l'état du panneau
  const [open, setOpen] = useState(isOpen);

  // Synchroniser l'état local avec les props
  useState(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const closePanel = () => {
    // Déclencher onRequestClose pour informer le parent
    onRequestClose();
    // Fermer le panneau
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                         Erreur : {error.help}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={closePanel}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            <span className="sr-only">Close panel</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Affichage du contenu HTML dans le panneau */}
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <p>Code actuel</p>
                      <pre className="language-html"><code>{htmlContent}</code></pre>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
