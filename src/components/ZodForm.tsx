
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FieldValues, useForm } from 'react-hook-form';

const ZodForm = () => {

    // schema is like a description or a set of rules that we define for our data
    // we can specify what kind of data it should be (like a number, string, or an object), any specific conditions it should meet (like being a positive number or having a specific length), and other rules that we want to enforce.
    // handles form validation and catch errors on its own
    const schema = z.object({
        name: z.string().min(3),
        age: z.number().min(18),
        gender: z.string(),
        year: z.number().min(1990)
    })

    // type FormData: We could have used const here, but type is used to define custom types in TypeScript

    // z.infer: It is used to determine the type of a value based on a schema. In our case, we are passing the typeof schema as an argument to z.infer. It will analyze the schema and give us the determined type of the data.

    // typeof schema: we are using it to get the type of the variable schema

    //schema alone refers to the schema object itself, and not its type. If you use z.infer<schema>, it would be interpreted as the literal string "schema" rather than the actual schema object. 
    // So, to correctly capture the type of the schema object and allow z.infer to determine the appropriate type, we use typeof schema. This ensures that the type inference is based on the structure of the schema object rather than a literal string.
    type FormData = z.infer<typeof schema>;


    // resolver: zodResolver(schema) -> The resolver property specifies the form resolver to be used. In this case, it uses the zodResolver function provided by the react-hook-form-resolvers package. form validation is happening here 
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: FieldValues) => console.log(data)

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="name"
                        // The register function is used to register form inputs and apply validation rules to them. It creates a reference for the input element, allowing react-hook-form to track its value and validation state.
                        // spread operator ... is used because form instance has a lot of properties, with regitser being one property as an object
                        {...register('name')}
                        type="text"
                        className="form-control" />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        id="age"
                        {...register('age', { required: true, minLength: 2, valueAsNumber: true })}
                        type="number"
                        className="form-control" />
                    {errors.age && <span className='text-danger' >{errors.age.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                        {...register('gender')}
                        id="gender"
                        type="text"
                        className="form-control" />
                    {errors.gender && <span className='text-danger' >{errors.gender.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Birth Year</label>
                    <input
                        id="year"
                        {...register('year', { minLength: 4, required: true, valueAsNumber: true })}
                        type="number"
                        className="form-control" />
                    {errors.year && <span className='text-danger' >{errors.year.message}</span>}
                </div>

                <button disabled={!isValid} type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </>
    )
}

export default ZodForm