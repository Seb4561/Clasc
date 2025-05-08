import React, { useState } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { calculateActuarialDebt, validateCalculationInputs } from '../utils/actuarialCalculations';
import { formatCurrency } from '../utils/actuarialData';

interface FormData {
  contributorDocType: string;
  contributorDocNumber: string;
  workerDocType: string;
  workerDocNumber: string;
  gender: string;
  birthDate: string;
  previousWeeks: string;
  startDate: string;
  endDate: string;
  salary: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface CalculationResult {
  baseAmount: number;
  weeksMissing: number;
  weeklyBase: number;
  firstPaymentDate: Date;
  secondPaymentDate: Date;
  firstPaymentAmount: number;
  secondPaymentAmount: number;
}

export default function ActuarialCalculator() {
  const [formData, setFormData] = useState<FormData>({
    contributorDocType: '',
    contributorDocNumber: '',
    workerDocType: '',
    workerDocNumber: '',
    gender: '',
    birthDate: '',
    previousWeeks: '',
    startDate: '',
    endDate: '',
    salary: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const documentTypes = [
    { value: 'cc', label: 'Cédula de Ciudadanía' },
    { value: 'ce', label: 'Cédula de Extranjería' },
    { value: 'nit', label: 'NIT' },
    { value: 'pp', label: 'Pasaporte' }
  ];

  const genderOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields validation
    if (!formData.contributorDocType) newErrors.contributorDocType = 'Seleccione el tipo de documento';
    if (!formData.contributorDocNumber) newErrors.contributorDocNumber = 'Ingrese el número de documento';
    if (!formData.workerDocType) newErrors.workerDocType = 'Seleccione el tipo de documento';
    if (!formData.workerDocNumber) newErrors.workerDocNumber = 'Ingrese el número de documento';
    if (!formData.gender) newErrors.gender = 'Seleccione el género';
    if (!formData.birthDate) newErrors.birthDate = 'Ingrese la fecha de nacimiento';
    if (!formData.previousWeeks) newErrors.previousWeeks = 'Ingrese las semanas cotizadas';
    if (!formData.startDate) newErrors.startDate = 'Ingrese la fecha de inicio';
    if (!formData.endDate) newErrors.endDate = 'Ingrese la fecha final';
    if (!formData.salary) newErrors.salary = 'Ingrese el salario';

    // Additional validations
    const calculationErrors = validateCalculationInputs(
      formData.startDate,
      formData.endDate,
      formData.salary
    );

    calculationErrors.forEach((error, index) => {
      newErrors[`calculation_${index}`] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const calculation = calculateActuarialDebt(
      new Date(formData.startDate),
      new Date(formData.endDate),
      Number(formData.salary)
    );

    setResult(calculation);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-[#1C2732] rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#2A2A2A] dark:text-gray-100">
        Simulador de Cálculo Actuarial
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección 1: Datos del aportante */}
        <div className="bg-gray-50 dark:bg-[#15202B] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
            Datos del Aportante
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Documento
              </label>
              <select
                name="contributorDocType"
                value={formData.contributorDocType}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.contributorDocType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Seleccione...</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.contributorDocType && (
                <p className="mt-1 text-sm text-red-500">{errors.contributorDocType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                name="contributorDocNumber"
                value={formData.contributorDocNumber}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.contributorDocNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.contributorDocNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.contributorDocNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección 2: Datos del trabajador */}
        <div className="bg-gray-50 dark:bg-[#15202B] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
            Datos del Trabajador
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Documento
              </label>
              <select
                name="workerDocType"
                value={formData.workerDocType}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.workerDocType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Seleccione...</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.workerDocType && (
                <p className="mt-1 text-sm text-red-500">{errors.workerDocType}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                name="workerDocNumber"
                value={formData.workerDocNumber}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.workerDocNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.workerDocNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.workerDocNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Género
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.gender ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Seleccione...</option>
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.birthDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Semanas Cotizadas Antes del Periodo de Omisión
              </label>
              <input
                type="number"
                name="previousWeeks"
                value={formData.previousWeeks}
                onChange={handleInputChange}
                min="0"
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.previousWeeks ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.previousWeeks && (
                <p className="mt-1 text-sm text-red-500">{errors.previousWeeks}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección 3: Periodo de omisión */}
        <div className="bg-gray-50 dark:bg-[#15202B] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
            Periodo de Omisión
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha de Inicio
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha Final
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Último Salario Devengado
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                min="0"
                className={`w-full p-2 border rounded-md bg-white dark:bg-[#1C2732] dark:text-gray-100 ${
                  errors.salary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-500">{errors.salary}</p>
              )}
            </div>
          </div>
        </div>

        {/* Errores de cálculo */}
        {Object.entries(errors)
          .filter(([key]) => key.startsWith('calculation_'))
          .map(([key, error]) => (
            <div key={key} className="text-red-500 text-sm">
              {error}
            </div>
          ))}

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="flex items-center bg-[#FF6A00] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#FF8533] hover:shadow-lg transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calcular
          </button>
          
          <a
            href="https://www.mintrabajo.gov.co/atencion-al-ciudadano/tramites-y-servicios/mi-calculadora"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#2A2A2A] dark:bg-[#FF6A00] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#404040] dark:hover:bg-[#FF8533] hover:shadow-lg transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculadora laboral
          </a>
        </div>
      </form>

      {/* Results Section */}
      {showResults && result && (
        <div className="mt-8 bg-gray-50 dark:bg-[#15202B] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
            Resultados del Cálculo
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1C2732] p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-[#2A2A2A] dark:text-gray-100 mb-2">
                Resumen General
              </h4>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Semanas Omitidas: <span className="font-semibold text-[#2A2A2A] dark:text-gray-100">
                    {result.weeksMissing}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Base Semanal: <span className="font-semibold text-[#2A2A2A] dark:text-gray-100">
                    {formatCurrency(result.weeklyBase)}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Monto Base: <span className="font-semibold text-[#2A2A2A] dark:text-gray-100">
                    {formatCurrency(result.baseAmount)}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1C2732] p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-[#2A2A2A] dark:text-gray-100 mb-2">
                Montos a Pagar
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Para pago el {result.firstPaymentDate.toLocaleDateString()}:
                  </p>
                  <p className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                    {formatCurrency(result.firstPaymentAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Para pago el {result.secondPaymentDate.toLocaleDateString()}:
                  </p>
                  <p className="text-xl font-bold text-[#2A2A2A] dark:text-gray-100">
                    {formatCurrency(result.secondPaymentAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Este cálculo es un estimado basado en las tasas históricas de IPC e interés técnico. 
              Para un cálculo oficial, consulte con un asesor autorizado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}