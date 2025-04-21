'use client';

import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type ChartProps = {
  data: { amount: number, label: string }[];
};

export const MonthExpensesChart = ({ data }: ChartProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.amount),
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
}
