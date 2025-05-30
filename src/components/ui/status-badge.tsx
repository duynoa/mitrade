import React from 'react';
import { Badge } from './badge';

type StatusType = 'pending' | 'processing' | 'completed' | 'failed' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      variant: 'warning' as const,
      label: 'Đợi xử lý',
    },
    processing: {
      variant: 'primary' as const,
      label: 'Đang xử lý',
    },
    completed: {
      variant: 'success' as const,
      label: 'Hoàn thành',
    },
    failed: {
      variant: 'error' as const,
      label: 'Thất bại',
    },
    approved: {
      variant: 'success' as const,
      label: 'Đã duyệt',
    },
    rejected: {
      variant: 'error' as const,
      label: 'Từ chối',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}