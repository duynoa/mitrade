import React from 'react';
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn('animate-fade-in', className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="mt-2 text-2xl font-bold text-gray-900">{value}</h4>
            
            {trend && (
              <div className="mt-2 flex items-center">
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend.isPositive ? 'text-success-600' : 'text-error-600'
                  )}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="ml-1 text-xs text-gray-500">so với hôm qua</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="p-2 bg-primary-50 rounded-full">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}