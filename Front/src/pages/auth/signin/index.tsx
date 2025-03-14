import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/input';
import { useAuth } from '../../../context/AuthContext';

const schema = z.object({
  username: z.string().email('Insira um email válido'),
  password: z.string().min(1, 'Insira sua senha'),
});

type SigninData = z.infer<typeof schema>;

export function Signin() {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: SigninData) => {
    const success = login(data.username, data.password);
    if (success) {
      navigate('/');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="flex font-primary items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <div className="flex items-center justify-center mb-6">
              <img className="w-20 mr-4" src="/logo.png" alt="Logo" />
              <div>
                <h2 className="text-2xl font-semibold font-display text-gray-800">Bem-vindo de volta</h2>
                <h3 className="text-lg text-gray-600">Portal do paciente</h3>
              </div>
            </div>
            <Input.Root name="username" label="Email" type="email" placeholder="contato@dominio.com" schema={schema.shape.username} register={methods.register} errors={methods.formState.errors} />
            <Input.Root name="password" label="Senha" type="password" placeholder="********" schema={schema.shape.password} register={methods.register} errors={methods.formState.errors} />
            <button type="submit" className="w-full py-3 mt-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">Logar</button>
          </form>
        </FormProvider>
        <p className="mt-4 text-center text-gray-600">
          Não tem uma conta? <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline">Crie uma conta</button>
        </p>
      </div>
    </div>
  );
}