import React from 'react';
import { cn } from '../../lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string;
  label?: string;
}

export function TextArea({ className, error, label, ...props }: TextAreaProps) {
  const id = props.id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'min-h-[80px]',
          error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error-600 mt-1">{error}</p>}
    </div>
  );
}