import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/input';
import { useAuth } from '../../../context/AuthContext';

const schemaStep1 = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(11, 'Digite um CPF valido').max(11, 'CPF deve ter 11 caracteres'),
  birthdate: z.string().min(1, 'Data de nascimento é obrigatória'),
  phone: z.string().min(10, 'O número de telefone deve ter pelo menos 10 caracteres'),
});

const schemaStep2 = z.object({
  email: z.string().email('Digite um e-mail valido'),
  password: z.string().min(6, 'A senha deve conter 6 caracteres'),
});

type Step1Data = z.infer<typeof schemaStep1>;
type Step2Data = z.infer<typeof schemaStep2>;

export function Signup() {
  const [step, setStep] = useState(1);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const methodsStep1 = useForm({
    resolver: zodResolver(schemaStep1),
    mode: 'onBlur',
  });

  const methodsStep2 = useForm({
    resolver: zodResolver(schemaStep2),
    mode: 'onBlur',
  });

  const onSubmitStep1 = (data: Step1Data) => {
    console.log(data);
    setStep(2);
  };

  const onSubmitStep2 = (data: Step2Data) => {
    const success = registerUser(data.email, data.password);
    if (success) {
      navigate('/signin');
    } else {
      alert('Usuário já registrado');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {step === 1 && (
          <FormProvider {...methodsStep1}>
            <form onSubmit={methodsStep1.handleSubmit(onSubmitStep1)} noValidate>
              <div className="flex items-center justify-center mb-6">
                <img className="w-20 mr-4" src="/logo.png" alt="Logo" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Registrar</h2>
                  <h3 className="text-lg text-gray-600">Passo 1: Informações pessoais</h3>
                </div>
              </div>
              <Input.Root name="name" label="Nome" type="text" placeholder="Fulano de tal" schema={schemaStep1.shape.name} register={methodsStep1.register} errors={methodsStep1.formState.errors} />
              <Input.Root name="cpf" label="CPF" type="text" placeholder="000.000.000-00" schema={schemaStep1.shape.cpf} register={methodsStep1.register} errors={methodsStep1.formState.errors} />
              <Input.Root name="birthdate" label="Data de aniversário" type="date" placeholder="Enter your birthdate" schema={schemaStep1.shape.birthdate} register={methodsStep1.register} errors={methodsStep1.formState.errors} />
              <Input.Root name="phone" label="Telefone" type="text" placeholder="11 99999-9999" schema={schemaStep1.shape.phone} register={methodsStep1.register} errors={methodsStep1.formState.errors} />
              <button type="submit" className="w-full py-3 mt-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">Próximo</button>
            </form>
          </FormProvider>
        )}
        {step === 2 && (
          <FormProvider {...methodsStep2}>
            <form onSubmit={methodsStep2.handleSubmit(onSubmitStep2)} noValidate>
              <div className="flex items-center justify-center mb-6">
                <img className="w-20 mr-4" src="/logo.png" alt="Logo" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Registrar</h2>
                  <h3 className="text-lg text-gray-600">Passo 2: Informações de acesso</h3>
                </div>
              </div>
              <Input.Root name="email" label="Email" type="email" placeholder="contato@dominio.com" schema={schemaStep2.shape.email} register={methodsStep2.register} errors={methodsStep2.formState.errors} />
              <Input.Root name="password" label="Senha" type="password" placeholder="*******" schema={schemaStep2.shape.password} register={methodsStep2.register} errors={methodsStep2.formState.errors} />
              <button type="submit" className="w-full py-3 mt-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">Registrar</button>
              <button type="button" onClick={() => setStep(1)} className="w-full py-3 mt-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-colors cursor-pointer">Voltar</button>
            </form>
          </FormProvider>
        )}
        <p className="mt-4 text-center text-gray-600">
          Já tem uma conta? <button onClick={() => navigate('/signin')} className="text-blue-600 hover:underline">Faça login</button>
        </p>
      </div>
    </div>
  );
}