import { FormEvent, useRef, useState } from "react";
import { produce } from 'immer';


const Form = () => {
    // referencing DOM elements means using the useRef hook to attach a special tag to an element in the box, so we can use our magic wand to make things happen to that specific element

    // we use the useRef hook in React to create references to DOM elements, allowing us to access and manipulate them directly as needed.

    // the useRef hook in React provides us with a reference object that can be used to store and access properties related to a specific element or value. it cannot update or change any property or its value.

    // standard practise is to pass null to useRef when initialised
    // HTMLInputElement tells that the reference object is an html input element (in this code)
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);

    const person = { name: '', age: 17 };

    const handleSubmit = (event: FormEvent) => {

        //event.preventDefault() method is used to prevent the default behavior of an event. By preventing the default behavior, you have more control over how the event is handled in your application.

        //event.preventDefault() function is specifically used to prevent the default behavior of HTML form submissions, such as refreshing the page. It does not have any direct effect on preventing page reloads caused by rendering a component using the state hook. 
        // only use it with html forms and useRef
        event.preventDefault();

        // .current property holds the current value of the reference
        if (nameRef.current !== null && ageRef.current !== null) {
            // .current.value = value assign a value to the .current property to update the reference.
            person.name = nameRef.current.value;

            // In TypeScript, the value property of an input element is always a string. Regardless of the input type (e.g., text, number, etc.), the value is treated as a string by default. thas why we used parseInt for conversion here
            person.age = parseInt(ageRef.current.value);


            console.log(person);

        }
        console.log(info);
        console.log(typeof (info.year));
    }

    // doing it with controlled components/inputs
    const [info, setInfo] = useState({
        gender: '',
        year: ''
    });

    const handleInfo = (event: React.ChangeEvent<HTMLInputElement>) => {

        // draft is a refernce copy of info here
        setInfo(produce(draft => {
            /* if (event.target.id === 'gender') {
                draft.gender = event.target.value;
            }
            else if (event.target.id === 'year') {
                draft.year = parseInt(event.target.value);
            } */

            switch (event.target.id) {
                case 'gender':
                    draft.gender = event.target.value;
                    break;
                case 'year':
                    draft.year = (event.target.value);
                    break;
                default:
                    break;
            }

        }))
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input ref={nameRef} id="name" type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input ref={ageRef} id="age" type="number" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                        //each input triggers a render by using onChange in this case
                        onChange={(event) => { handleInfo(event) }}
                        id="gender"
                        type="text"
                        value={info.gender}
                        className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Birth Year</label>
                    <input onChange={(event) => { handleInfo(event) }} id="year" type="number" value={info.year} className="form-control" />
                </div>



                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </>
    )
}

export default Form