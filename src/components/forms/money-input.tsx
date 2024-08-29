import React from 'react'
import { NumericFormat } from 'react-number-format'
import { Input } from '../ui/input'
import { Control, Controller } from 'react-hook-form'
import { ProductSchema } from '@/lib/joi'

const MoneyInput = ({ controller, defaultValue, className }: { controller: Control<ProductSchema, any>, defaultValue: string, className: string | undefined }) => {
  return (
    <Controller
      name='price'
      control={controller}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref }, fieldState: { error }, formState: { errors } }) => (
        <div>
          <NumericFormat
            className={className}
            customInput={Input}
            value={value}
            onValueChange={(values) => {
              onChange(values.floatValue)
            }}
            prefix='Rp '
            thousandSeparator='.'
            decimalSeparator=','
            allowNegative={false}
            getInputRef={ref}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
        </div>
      )}
    />
  )
}

export default MoneyInput