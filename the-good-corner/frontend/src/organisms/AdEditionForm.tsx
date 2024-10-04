import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";

type ApiResult = {
    id:number,
    name:string
}
export type AdEditionFormProps={
    id:number,
	title:string,
	picture:string,
	price:number,
	description:string,
	owner:string,
	createdAt:string,
    location:string,
    category:ApiResult,
    tags:ApiResult[]
}
export default function AdEditionForm(props:AdEditionFormProps) {
    const navigate = useNavigate()
    const [categories, setCategories]=useState([])
    const [tags, setTags]=useState([])

      async function fetchCategories() {
        let {data} = await axios.get("http://localhost:3000/categories")
        data = data.map((item:ApiResult)=>({value:item.id, label: item.name}))
        setCategories(data)
    }
    async function fetchTags() {
        let {data} = await axios.get("http://localhost:3000/tags")
        data = data.map((item:ApiResult)=>({value:item.id, label: item.name}))
        setTags(data)
    }
    

    useEffect( ()=>{
        fetchCategories()
        fetchTags()
    }, [] )

    const hSubmit = (evt: FormEvent)=>{
        evt.preventDefault()
        
        const form = evt.target;
        const formData = new FormData(form as HTMLFormElement)
        const formJson = Object.fromEntries(formData.entries())
        
        axios.put(`http://localhost:3000/ads/${props.id}`, formJson)
    }

    const hDelete = async ()=>{
        await axios.delete(`http://localhost:3000/ads/${props.id}`)
        navigate("/")
    }


    return (
        <main className="main-content">
            <form onSubmit={hSubmit}>
                <label>
                    Titre:
                    <input className="text-field" name="title" defaultValue={props.title}/>
                </label>
                <label>
                    Description:
                    <input className="text-field" name="description" defaultValue={props.description} />
                </label>
                <label>
                Owner:
                    <input className="text-field" name="owner"  defaultValue={props.owner}/>
                </label>
                <label>
                Price:
                    <input className="text-field" name="price"  defaultValue={props.price}/>
                </label>
                <label>
                Picture:
                    <input className="text-field" name="picture"  defaultValue={props.picture}/>
                </label>
                <label>
                Location:
                    <input className="text-field" name="location"  defaultValue={props.location}/>
                </label>
                <label>
                    Categorie:
                    <Select options={categories} name="categoryId" defaultValue={{value:props.category.id, label:props.category.name}} />
                </label>
                <label>
                    Tags:
                    <Select options={tags} isMulti name="tagsIds" delimiter="," defaultValue={props.tags.map((apiTag:ApiResult)=>({value:apiTag.id, label: apiTag.name}))} />
                </label>
                <button className="button">Update Ad!</button>
            </form>
            <button onClick={hDelete}>Delete Ad!</button>
        </main>
    )
}