import React, {useState} from "react";

let formElements = [{
    label:"Agenda",
    key:"agenda"
}]

function Form () {

    const [formData, setFormData] = useState({} as any);

    const handleChange = (value: string, key: string) => {
        setFormData({ ...formData, ...{ [key]: value}})
    }

    const submit = () => {
        if(isFormInValid()){
            return
        }
        alert(JSON.stringify(formData))
    }

    const isFormInValid= () => {
        let returnValue = false;
        formElements.forEach(formElement=>{
            if(formData[formElement.key]===undefined) {
                alert(formElement.label + " is missing");
                returnValue = true
            }
        })

        return returnValue
    }


    



    return(
        <div>
            <form>
                Enter Your Event
                {formElements.map(formElement => {
                return <div>
                    {formElement.label}
                    <input value={formData[formElement.key]}
                    onChange={(e)=>{handleChange(e.target.value, formElement.key )}}/>
                </div>
                })}
                <button onClick={submit}>Submit</button>
            </form>
        </div>

    );
}

export default Form;