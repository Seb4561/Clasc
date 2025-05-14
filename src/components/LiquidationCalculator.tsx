import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface CalculationResults {
  salarioBase: number;
  auxilioTransporte: number;
  diasTrabajados: number;
  cesantias: number;
  interesesCesantias: number;
  primaServicios: number;
  vacaciones: number;
  total: number;
}

class LiquidacionTrabajo {
  private salarioBase: number;
  private auxilioTransporte: number;
  private diasTrabajados: number;

  constructor(salarioBase: number, auxilioTransporte: number, diasTrabajados: number) {
    this.salarioBase = salarioBase;
    this.auxilioTransporte = auxilioTransporte;
    this.diasTrabajados = diasTrabajados;
  }

  calcularCesantias(): number {
    return (this.salarioBase * this.diasTrabajados) / 360;
  }

  calcularInteresesCesantias(): number {
    const cesantias = this.calcularCesantias();
    return (cesantias * this.diasTrabajados * 0.12) / 360;
  }

  calcularPrimaServicios(): number {
    return (this.salarioBase * this.diasTrabajados) / 360;
  }

  calcularVacaciones(): number {
    return (this.salarioBase * this.diasTrabajados) / 720;
  }

  calcularTotalLiquidacion(): number {
    return this.calcularCesantias() +
      this.calcularInteresesCesantias() +
      this.calcularPrimaServicios() +
      this.calcularVacaciones();
  }

  obtenerResultados(): CalculationResults {
    return {
      salarioBase: this.salarioBase,
      auxilioTransporte: this.auxilioTransporte,
      diasTrabajados: this.diasTrabajados,
      cesantias: this.calcularCesantias(),
      interesesCesantias: this.calcularInteresesCesantias(),
      primaServicios: this.calcularPrimaServicios(),
      vacaciones: this.calcularVacaciones(),
      total: this.calcularTotalLiquidacion()
    };
  }
}

export default function LiquidationCalculator() {
  const [formData, setFormData] = useState({
    salarioBase: '',
    auxilioTransporte: '',
    diasTrabajados: ''
  });
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue) {
      return new Intl.NumberFormat('es-CO').format(parseInt(numericValue));
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name !== 'diasTrabajados') {
      formattedValue = formatNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleCalculate = () => {
    const salarioBase = parseInt(formData.salarioBase.replace(/\D/g, '')) || 0;
    const auxilioTransporte = parseInt(formData.auxilioTransporte.replace(/\D/g, '')) || 0;
    const diasTrabajados = parseInt(formData.diasTrabajados) || 0;

    const liquidacion = new LiquidacionTrabajo(salarioBase, auxilioTransporte, diasTrabajados);
    setResults(liquidacion.obtenerResultados());
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-6 bg-white dark:bg-[#1C2732] rounded-xl shadow-sm">
        <div className="bg-gray-50 dark:bg-[#15202B] p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
            Datos de la Liquidación
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salario Base Mensual
              </label>
              <input
                type="text"
                name="salarioBase"
                value={formData.salarioBase}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent"
                placeholder="Ingrese el salario base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Auxilio de Transporte
              </label>
              <input
                type="text"
                name="auxilioTransporte"
                value={formData.auxilioTransporte}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent"
                placeholder="Ingrese el auxilio de transporte"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Días Trabajados
              </label>
              <input
                type="number"
                name="diasTrabajados"
                value={formData.diasTrabajados}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent"
                placeholder="Ingrese los días trabajados"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleCalculate}
            className="flex items-center bg-[#FF6A00] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#FF8533] hover:shadow-lg transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calcular
          </button>
        </div>

        {showResults && results && (
          <div className="bg-gray-50 dark:bg-[#15202B] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
              Resultado de la Liquidación
            </h3>
            <div className="space-y-4">
              <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <span>Salario Base:</span>
                  <span>{formatCurrency(results.salarioBase)}</span>
                </div>
                {results.auxilioTransporte > 0 && (
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span>Auxilio de Transporte:</span>
                    <span>{formatCurrency(results.auxilioTransporte)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Días Trabajados:</span>
                  <span>{results.diasTrabajados}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">Cesantías:</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(results.cesantias)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">Intereses a las Cesantías:</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(results.interesesCesantias)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">Prima de Servicios:</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(results.primaServicios)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">Vacaciones:</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(results.vacaciones)}</span>
                </div>
                <div className="flex justify-between items-center py-2 mt-3 pt-3 border-t border-gray-300 dark:border-gray-700 font-semibold">
                  <span className="text-gray-700 dark:text-gray-300">TOTAL LIQUIDACIÓN:</span>
                  <span className="text-lg text-[#FF6A00]">{formatCurrency(results.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}