import React from 'react'

function Button({ onClickFunction, ContentText }) {
  return (
    <button
    type="button"
    onClick={onClickFunction}
    className="h-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
    {ContentText}
    </button>
  )
}

export default Button