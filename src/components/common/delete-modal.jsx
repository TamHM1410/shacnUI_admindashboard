import { Button } from "@/components/ui/button"

export const DeleteModal = ({ onSubmitting, onDismiss, isSubmitting }) => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2 className="font-bold">Are you sure ?</h2>
                <p>This action can not be undone</p>
            </div>
            <div className="flex w-full mt-4">
                <Button
                    type="button"
                    variant={"secondary"}
                    onClick={onDismiss}
                    className="w-auto md:w-full mr-2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSubmitting}
                    disabled={isSubmitting}
                    className="w-auto md:w-full bg-red-600 hover:bg-red-500"
                >
                    Confirm
                </Button>
            </div>
        </div>
    )
}