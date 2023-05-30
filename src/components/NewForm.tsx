import { FieldValues, useForm } from 'react-hook-form';

interface FormData {
    name: string;
    age: number;
    gender: string;
    year: number;
}

const NewForm = () => {

    // register helps the form remember your inputs
    // handleSubmit checks if everything is perfect before doing something special
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    //console.log(formState.errors);

    // onSubmit tells handleSubmit what to do with your finished form.
    const onSubmit = (data: FieldValues) => console.log(data);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="name"
                        // The register function is used to register form inputs and apply validation rules to them. It creates a reference for the input element, allowing react-hook-form to track its value and validation state.
                        // spread operator ... is used because form instance has a lot of properties, with regitser being one property as an object
                        {...register('name')}
                        type="text"
                        className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        id="age"
                        {...register('age', { required: true, minLength: 2, valueAsNumber: true })}
                        type="number"
                        className="form-control" />
                    {errors.age?.type === 'required' && <span className='text-danger' >age is required</span>}
                    {errors.age?.type === 'minLength' && <span className='text-danger' >Should be at least 18 years old</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                        {...register('gender')}
                        id="gender"
                        type="text"
                        className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Birth Year</label>
                    <input
                        id="year"
                        {...register('year', { minLength: 4, required: true, valueAsNumber: true })}
                        type="number"
                        className="form-control" />
                    {errors.year?.type === 'required' && <span className='text-danger' >enter a valid year</span>}
                    {errors.year?.type === 'minLength' && <span className='text-danger' >not a valid year</span>}
                </div>

                <button type="submit" className="btn btn-primary"  >Submit</button>

            </form>
        </>
    )
}

export default NewForm;