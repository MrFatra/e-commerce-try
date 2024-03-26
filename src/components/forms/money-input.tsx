import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '../ui/input'

const MoneyInput = ({ placeholder }: NumericFormatProps) => {
  return (
    <NumericFormat
      placeholder={placeholder}
      customInput={Input}
      prefix='Rp '
      thousandSeparator={'.'}
      decimalSeparator=','
      allowNegative={false}
    />
  )
}

export default MoneyInput