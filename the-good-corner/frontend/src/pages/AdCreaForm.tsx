import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Category } from "../types/Category";

export default function AdCreaForm() {

    const [categories, setCategories]=useState<Category[]>([])

    async function fetchCategories() {
        const {data} = await axios.get<Category[]>("http://localhost:3000/categories")
        setCategories(data)
    }

    useEffect( ()=>{
        fetchCategories()
    }, [] )

    const hSubmit = (evt: FormEvent)=>{
        evt.preventDefault()
        const form = evt.target;
        const formData = new FormData(form as HTMLFormElement)
        const formJson = Object.fromEntries(formData.entries())

        // console.log(form)
        // console.log(formData)
        console.log(formJson)

    }
    return (
    <form onSubmit={hSubmit}>
        <label>
            Titre:
            <input className="text-field" name="title" />
        </label>
        <select name="category">
        {
            categories.map((category)=><option key={category.id} value={category.id}>{category.name}</option>)
        }
        </select>
        <button className="button">Create Ad!</button>
    </form>
    )
}