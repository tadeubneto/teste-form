"use client";
import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { UserData, FormErrors } from "@/app/types";



const SignupForm = () => {
    const [formData, setFormData] = useState<UserData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        "success" | "error" | null
    >(null);

    // Função de validação
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
        } else if (formData.name.length < 3) {
            newErrors.name = "Nome deve ter pelo menos 3 caracteres";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido";
        }

        if (!formData.password) {
            newErrors.password = "Senha é obrigatória";
        } else if (formData.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Simula persistência de dados
    const saveData = async (data: UserData): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    localStorage.setItem("userData", JSON.stringify(data));
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 3000); // Simula delay de rede
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setSubmitStatus(null);

        try {
            await saveData(formData);
            setSubmitStatus("success");
            // Limpa o formulário após sucesso
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Cadastro de Usuário</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            "Cadastrar"
                        )}
                    </button>

                    {submitStatus === "success" && (
                        <Alert className="bg-green-50 border-green-500">
                            <AlertDescription className="text-green-700">
                                Cadastro realizado com sucesso!
                            </AlertDescription>
                        </Alert>
                    )}

                    {submitStatus === "error" && (
                        <Alert className="bg-red-50 border-red-500">
                            <AlertDescription className="text-red-700">
                                Erro ao realizar cadastro. Tente novamente.
                            </AlertDescription>
                        </Alert>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
