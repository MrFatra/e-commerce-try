import React from 'react'
import { NumericFormat } from 'react-number-format'
import { Input } from '../ui/input'
import { Control, Controller } from 'react-hook-form'
import { ProductSchema } from '@/lib/joi'

const MoneyInput = ({ controller, defaultValue }: { controller: Control<ProductSchema, any>, defaultValue: string }) => {
  return (
    <Controller
      name='price'
      control={controller}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref } }) => (
        <NumericFormat
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
      )}
    />
  )
}

export default MoneyInput
