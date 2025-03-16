import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormWrapper = ({
    schema,
    defaultValues,
    isSubmitting,
    isLoading,
    onSubmit,
    onDismiss,
    children
}) => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-h-[80vh] overflow-auto flex flex-col space-y-2 px-2"
            >
                {children(form)}
                <div className="flex justify-end mt-4">
                    <Button
                        type="button"
                        onClick={onDismiss}
                        variant={"ghost"}
                        className="w-full sm:w-auto mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </Form>
    );
};
