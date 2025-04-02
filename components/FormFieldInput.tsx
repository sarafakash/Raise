import { authformSchema } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";


const formSchema = authformSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string
}


const FormFieldInput = ({control, name, label, placeholder} : CustomInput) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
    <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
        <Input placeholder={placeholder} {...field} type={name === "password" ? "password" : "text"} />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
  )
}

export default FormFieldInput