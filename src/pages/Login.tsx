
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Correct admin credentials
const ROOT_ADMIN = {
  username: "admin",
  password: "admin-password",
  role: "admin"
};

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBackOfficeLogin, setIsBackOfficeLogin] = useState(false);

  const handleAdminLogin = (credentials: { email: string; password: string }) => {
    // Ensure that credentials are correctly matched against ROOT_ADMIN
    if (credentials.email === ROOT_ADMIN.username && credentials.password === ROOT_ADMIN.password) {
      // Store user info in localStorage
      localStorage.setItem("ruzizi_user", JSON.stringify({
        username: ROOT_ADMIN.username,
        role: ROOT_ADMIN.role,
        isLoggedIn: true
      }));
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur le tableau de bord administratif.",
      });
      
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Bienvenue chez Ruzizi</h1>
            <p className="text-gray-600">
              Connectez-vous à votre compte ou créez un nouveau compte
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsBackOfficeLogin(!isBackOfficeLogin)}
                className="text-xs"
              >
                {isBackOfficeLogin ? "Connexion client" : "Connexion administrative"}
              </Button>
            </div>
            
            {isBackOfficeLogin ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Connexion administrative</h2>
                <LoginForm onAdminSubmit={handleAdminLogin} isAdmin={true} />
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <LoginForm />
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="w-full">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.22.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .28.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="register">
                  <LoginForm isRegistration={true} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
