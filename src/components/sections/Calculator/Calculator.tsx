"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { useCalculator } from "./useCalculator";
import { TbPool } from "react-icons/tb";

export function Calculator() {
    const {
        rooms, setRooms,
        hasPool, setHasPool,
        season, setSeason,
        results, formatCurrency
    } = useCalculator();

    const handleSeasonChange = (s: string) => setSeason(s as any);

    return (
        <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark border-y border-border" id="calculator">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-4">
                        ¿Cuánto Podría Generar Tu Finca?
                    </h2>
                    <p className="text-text-sub dark:text-gray-400 text-lg">
                        Descubre el potencial oculto de tu propiedad con nuestra calculadora basada en datos reales de Villeta.
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-border max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Inputs */}
                        <div className="p-8 bg-surface-light/50 dark:bg-zinc-800/20 space-y-8">
                            {/* Rooms Slider */}
                            <div>
                                <label className="text-sm font-bold text-text-main dark:text-white mb-2 flex justify-between">
                                    Número de Habitaciones
                                    <span className="text-primary text-lg">{rooms}</span>
                                </label>
                                <input
                                    type="range"
                                    min="2"
                                    max="6"
                                    value={rooms}
                                    onChange={(e) => setRooms(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>2</span>
                                    <span>6</span>
                                </div>
                            </div>

                            {/* Season Buttons */}
                            <div>
                                <label className="block text-sm font-bold text-text-main dark:text-white mb-4">Temporada Actual</label>
                                <div className="flex gap-2">
                                    {['Alta', 'Media', 'Baja'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => handleSeasonChange(s)}
                                            className={`
                                        flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all
                                        ${season === s
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'bg-white dark:bg-zinc-800 text-gray-500 border-border hover:border-primary hover:text-primary'}
                                    `}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pool Toggle */}
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-text-main dark:text-white flex items-center gap-2">
                                    ¿Tiene Piscina?
                                    <TbPool className="text-lg text-primary" />
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={hasPool}
                                        onChange={(e) => setHasPool(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>

                        {/* Results UI */}
                        <div className="p-8 bg-primary text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="text-center">
                                    <p className="text-sm text-green-100 mb-1">Ingresos Estimados Mensuales</p>
                                    <p className="text-4xl font-display font-bold">
                                        {formatCurrency(results.monthlyIncome)}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/20">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-green-100">Tu Ganancia Neta (85%)</span>
                                        <span className="font-bold text-xl">{formatCurrency(results.netProfit)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm opacity-80">
                                        <span>Comisión Villeta (15%)</span>
                                        <span>{formatCurrency(results.commission)}</span>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <a href="#audit" className="block">
                                        <button className="w-full py-3 bg-white text-primary font-bold text-center rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                            Solicitar Cálculo Personalizado
                                        </button>
                                    </a>
                                </div>
                                <p className="text-[10px] text-center text-white/60 mt-2">*Estimación basada en ocupación del 65% y tarifa promedio de mercado.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
