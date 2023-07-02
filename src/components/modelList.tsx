import axios from 'axios';
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ModelList() {
    const [model, setModel] = useState([]);
    const navigate = useNavigate();

    const fetchModels = async () => {
        const res = await axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}/product/get-models`,
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          });

          setModel(res.data.data)
    }

    useEffect(() => {
        fetchModels();
    }, [])
  return (
    <>
    <h1>Models List</h1>
    <ul className="list-group list-group-flush">
        {
            model?.length ?
            model.map((i:any, index:number) => {
                return <>
          <li className="list-group-item d-flex justify-content-between align-items-center">
           {i.name}
  <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate(`/product-detail/${i.modelId}`) as MouseEventHandler<HTMLButtonElement> | undefined}>View</button>
</li>
                </>
            })

             : <h6>No data!!</h6>
        }
</ul>
    </>
  )
}

export default ModelList