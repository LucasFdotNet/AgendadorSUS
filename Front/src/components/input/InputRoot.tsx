import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { InputHTMLAttributes, ReactNode } from 'react';
import { ZodType, ZodTypeDef } from 'zod';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  children?: ReactNode;
  schema: ZodType<any, ZodTypeDef, any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function InputRoot({ name, label, children, schema, register, errors, ...props }: InputProps) {
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-6">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
        {...register(name, {
          validate: (value) => {
            const result = schema.safeParse(value);
            return result.success || result.error.errors[0].message;
          }
        })}
      />
      {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
      {children}
    </div>
  );
}