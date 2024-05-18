import React, { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '../ui/input'

const MoneyInput = ({ placeholder, register }: any) => {
  return (
    <NumericFormat
      getInputRef={register('price').ref}
      placeholder={placeholder}
      customInput={Input}
      prefix='Rp '
      thousandSeparator={'.'}
      decimalSeparator=','
      allowNegative={false}
      {...register('price')}
    />
  )
}

export default MoneyInput