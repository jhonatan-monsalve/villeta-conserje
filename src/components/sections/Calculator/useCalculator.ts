import { useState, useMemo } from 'react';

type Season = 'Alta' | 'Media' | 'Baja';

const SEASON_MULTIPLIERS = { 'Alta': 1.4, 'Media': 1.0, 'Baja': 0.75 };
const OCCUPANCY_RATES = { 'Alta': 0.80, 'Media': 0.65, 'Baja': 0.45 };

export function useCalculator() {
    const [rooms, setRooms] = useState(3);
    const [hasPool, setHasPool] = useState(true);
    const [season, setSeason] = useState<Season>('Alta');

    const results = useMemo(() => {
        let baseRate = 600000;

        // Logic from original JS
        baseRate += (rooms - 2) * 100000;
        if (hasPool) baseRate += 200000;

        baseRate *= SEASON_MULTIPLIERS[season];
        const daysOccupied = 30 * OCCUPANCY_RATES[season];

        const monthlyIncome = baseRate * daysOccupied;
        const commission = monthlyIncome * 0.15;
        const netProfit = monthlyIncome * 0.85;

        return {
            monthlyIncome,
            commission,
            netProfit
        };
    }, [rooms, hasPool, season]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(value);
    };

    return {
        rooms,
        setRooms,
        hasPool,
        setHasPool,
        season,
        setSeason,
        results,
        formatCurrency
    };
}
