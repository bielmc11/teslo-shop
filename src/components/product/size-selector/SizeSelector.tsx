'use client'
import type { Size } from '@/interfaces/product.interface';
import clsx from 'clsx';
import React from 'react'

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onChangeSize: (size: Size) => void;
}

export const SizeSelector = ({selectedSize, availableSizes, onChangeSize}: Props) => {

  return (
    <div className='my-5'>
      <h3 className='mb-5 font-bold'>Talas disponibles</h3>
      <div className='flex'>
        {
          availableSizes.map((size) => (
            <button
              onClick={() => onChangeSize(size)}
              key={size}
              className={clsx(
                'mx-2 hover:underline text-lg',
                {
                'underline': size === selectedSize
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
