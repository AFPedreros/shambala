import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo válido",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener mínimo 8 caracteres",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    }),
});
