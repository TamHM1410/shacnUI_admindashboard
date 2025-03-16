import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { FormWrapper } from "@/components/common/form-wrapper";
  import { blogSchema } from "@/lib/schema";
import { Textarea } from "@/components/ui/textarea";
  
  export const BlogForm = (props) => {
    return (
      <FormWrapper schema={blogSchema} {...props}>
        {(form) => (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
           
          </>
        )}
      </FormWrapper>
    );
  };
  