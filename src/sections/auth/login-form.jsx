import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import AuthService from '@/services/auth.service';

import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {  useNavigate } from 'react-router';
import { useBoolean } from 'usehooks-ts';
import { useUser } from '@/context/UserContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const {setUser} = useUser();
    const form = useForm({
      defaultValues: {
        username: "",
        password: ""
      }, 
      resolver: zodResolver(loginSchema)
    })

    const {
      value: isSubmitting,
      setTrue: startSubmitting,
      setFalse: stopSubmitting,
    } = useBoolean()

   
    const onSubmit = async (values) => {
      startSubmitting()
      const response = await AuthService.login(values);
      stopSubmitting()
        if(!response){
          toast.error('Invalid login credentials');
          return;
        }
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
        toast.success('Login successful');
        navigate('/dashboard');
    };
  
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-center">Welcome back to skincare Admin </CardTitle>
        </CardHeader>
        <CardContent>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             
              <Button disabled={form.formState.isSubmitting || isSubmitting}  type="submit" className="w-full" >
               Login
              </Button>
            </form>
         </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          By signing up, you agree to our Terms of Service
        </CardFooter>
      </Card>
    );
  }