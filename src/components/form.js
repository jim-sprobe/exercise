import React, { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../hooks';
import GroupSelectInput from './GroupSelectInput';
import PropTypes  from 'prop-types';
import 'twin.macro'

const Form = (props) => {
    const { dispatch } = useFormContext();
    const { register, control, handleSubmit, reset } = useForm({ defaultValues: props.defaultValues });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "components",
        keyName: "id"
    });

    /**
     * 
     * @param {object} data
     * Creates new item or update item
     * @return void 
     */
    const onClickSubmit = (data) => {
        // check if new item else update item
        if (data.id === "") {
            dispatch({type: 'create', payload: data});
            reset();
        } else {
            dispatch({type: 'update', payload: data});
        }
    }


    /**
     * reset default values when selecting item
     * 
     */
    useEffect(() => {
        reset(props.defaultValues)
    }, [reset, props.defaultValues])

    return (
        <div className="flex flex-0 flex-col z-10 overflow-auto items-center">
            <form onSubmit={handleSubmit(onClickSubmit)} className="flex flex-col gap-y-4">
                <div className="grid gap-x-4 gap-y-4 grid-rows-3 grid-flow-col">
                    <input {...register("id")} name="id" id="id" hidden />
                    <div className="flex flex-col justify-start">
                        <label htmlFor="label" className="text-sm">Range Label: </label>
                        <input {...register("label", { required: "Please enter Label." })} name="label" id="label" type="text" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="width" className="text-sm">Width: </label>
                        <input {...register("width", { valueAsNumber: true })} name="width" id="width" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="height" className="text-sm">Height: </label>
                        <input {...register("height", { valueAsNumber: true })} name="height" id="height" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="xaxis" className="text-sm">X-Axis: </label>
                        <input {...register("xaxis", { valueAsNumber: true })} name="xaxis" id="xaxis" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="yaxis" className="text-sm">Y-Axis: </label>
                        <input {...register("yaxis", { valueAsNumber: true })} name="yaxis" id="yaxis" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="zaxis" className="text-sm">Z-Axis: </label>
                        <input {...register("zaxis", { valueAsNumber: true })} name="zaxis" id="zaxis" type="number" />
                    </div>
                </div>
            
                <div className="flex flex-col gap-y-4">
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-y-4">
                                <div className="grid gap-x-4 gap-y-4 grid-rows-3 grid-flow-col">
                                    <input type="hidden" {...register(`components.${index}.id`)} name={`components.${index}.id`} id={`components.${index}.id`} defaultValue={index} />
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.label`} className="text-sm">Component Label: </label>
                                        <input type="text" {...register(`components.${index}.label`)} name={`components.${index}.label`} 
                                            id={`components.${index}.label`} defaultValue={field.label} />
                                    </div>
                                    <GroupSelectInput register={register} index={ index } selectDefaultValue={props.defaultValues} />
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.width`} className="text-sm">Width: </label>
                                        <input {...register(`components.${index}.width`, { valueAsNumber: true })} name={`components.${index}.width`} id={`components.${index}.width`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.height`} className="text-sm">Height: </label>
                                        <input {...register(`components.${index}.height`, { valueAsNumber: true })} name={`components.${index}.height`} id={`components.${index}.height`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.xaxis`} className="text-sm">X-Axis: </label>
                                        <input {...register(`components.${index}.xaxis`, { valueAsNumber: true })} name={`components.${index}.xaxis`} id={`components.${index}.xaxis`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.yaxis`} className="text-sm">Y-Axis: </label>
                                        <input {...register(`components.${index}.yaxis`, { valueAsNumber: true })} name={`components.${index}.yaxis`} id={`components.${index}.yaxis`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.zaxis`} className="text-sm">Z-Axis: </label>
                                        <input {...register(`components.${index}.zaxis`, { valueAsNumber: true })} name={`components.${index}.zaxis`} id={`components.${index}.zaxis`} type="number" />
                                    </div>
                                </div>
                                <button onClick={() => remove(index)} className="p-2 bg-red-200"> Remove </button>
                            </div>
                        ))
                    }
                </div>
                
                <div className="flex flex-row m-3 gap-x-2">
                    <button type="button" onClick={() => append({label: ""})} className="p-2">Add Component</button>
                    <button type="submit" className="p-2"> 
                        {props.defaultValues ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    )
}

Form.propTypes = { 
    defaultValues: PropTypes.object 
}

export default Form;