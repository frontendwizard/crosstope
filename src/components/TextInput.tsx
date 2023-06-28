import 'filepond/dist/filepond.min.css'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import type { inferProcedureInput } from '@trpc/server'
import type {
  FormState,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import type { AppRouter } from '~/server/routers/_app'

type FormValues = inferProcedureInput<AppRouter['pmhc']['add']>

export type TextInputProps = {
  register: UseFormRegister<FormValues>
  formState: FormState<FormValues>
  fieldKey: keyof FormValues
  label: string
  rules: RegisterOptions<FormValues>
  helperText?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export function TextInput({
  register,
  formState,
  fieldKey,
  label,
  rules,
  helperText,
  inputProps,
}: TextInputProps) {
  return (
    <FormControl
      isInvalid={Boolean(formState.errors[fieldKey])}
      isRequired={Boolean(rules.required)}
    >
      <FormLabel>{label}</FormLabel>
      <Input autoFocus {...register(fieldKey, rules)} {...inputProps} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>
        {formState.errors[fieldKey] && formState.errors[fieldKey]?.message}
      </FormErrorMessage>
    </FormControl>
  )
}
