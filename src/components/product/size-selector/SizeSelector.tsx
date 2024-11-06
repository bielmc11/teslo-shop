import type { Size } from '@/interfaces/product.interface';
import clsx from 'clsx';
import React from 'react'

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({selectedSize, availableSizes}: Props) => {


  return (
    <div className='my-5'>
      <h3 className='mb-5 font-bold'>Talas disponibles</h3>
      <div className='flex'>
        {
          availableSizes.map((size) => (
            <button
              key={size}
              className={clsx(
                'mx-2 hover:underline text-lg',
                {
                'underline': selectedSize === size
                }
              )}
            >
              {size}
            </button>
          ))
        }
      </div>

    </div>
  )
}
