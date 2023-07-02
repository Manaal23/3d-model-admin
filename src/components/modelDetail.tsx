import React, {ChangeEvent, SetStateAction, useEffect, useState} from 'react'
import axios, { AxiosResponse } from "axios";

import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface IModel {
    id?:string;
    name?: string;
    description?: string;
    features?: string;
    price?: number;
    glbmodel?: string;
    glb_model_id?: number;
}

function ModelDetail() {
    const [form, setForm] = useState<IModel>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDel, setLoadingDel] = useState<boolean>(false);
    const [file, setFile] = useState<string | Blob>('');
    const {id} : {id?:number} = useParams();
    const [isFileChanged, setIsFileChanged] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (id)
      fetchProductDetail(id);
      
      else
      setForm({
        id:'',
        name: '',
        description: '',
        features: '',
        price: 0,
        glbmodel: '',
        glb_model_id: 0,
      })

    },[location])

    const handleSubmit = async () => {

        setLoading(true);
        
        let model_id = form?.['glb_model_id']
        if ((id && isFileChanged) || (!id)){
          model_id = await handleUpload() as any;
        }
        
        if (model_id){

            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_URL}/product/create`,
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {...form, glbmodel:model_id}
              });

              if (res.data.success)
              navigate('/', {replace: true})
        }

        setLoading(false);
    }

    const handleDelete = async () => {
      setLoadingDel(true);

      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/product/delete/${id}`,
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.data.success)
      navigate('/', {replace:true})

      setLoadingDel(false)


    }

    const handleChange = (key: string, val:ChangeEvent<HTMLInputElement>) => {
        
        if (key === 'glbmodel') {
        setIsFileChanged(true);
            const selectedFile = val.target?.files?.[0];
            setFile(selectedFile as SetStateAction<string | Blob>);  
            return;  
        }
        setForm({
            ...form,
            [key]: val.target.value
        })


    };
    

    const handleUpload = async () => {
        return new Promise( async (resolve, reject) => {

            if (!file && !form?.['glbmodel']?.length) {
              alert('Please select a file.');
              return;
            }
        
            const formData = new FormData();
            formData.append('glbmodel', file);
    
            
        const res = await axios({
            method:'post',
            url: `${process.env.REACT_APP_URL}/product/upload`,
            data: formData
        });

        resolve(res.data.data.insertId);
        })
      };

      const fetchProductDetail = async (id?:number) => {
        const res = await axios({
          method:'get',
          url: `${process.env.REACT_APP_URL}/product/get-models/${id}`,
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
      
      
      setForm({
        ...res.data.data[0],
        glbmodel: res.data.data[0]?.path,
        glb_model_id: res.data.data[0]?.glb_model
      })
        
      }


  return (
    <div>
  <div className="form-group model-detail">
    <label>Name</label>
    <input type="text" className="form-control" value={form?.['name']} aria-describedby="emailHelp" placeholder="Enter model name" onChange={(e) => handleChange('name', e as ChangeEvent<HTMLInputElement>)}/>
  </div>
  <div className="form-group model-detail">
    <label>Price</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" value={form?.['price']} placeholder="Enter model price" onChange={(e) => handleChange('price', e as ChangeEvent<HTMLInputElement>)}/>
  </div>

  <div className="form-group model-detail">
    <label className='pb-20'>Upload GLB file</label> <br></br>
    <input type="file" className="form-control-file" name="glbFile" id="glbFile" onChange={(e) => handleChange('glbmodel', e as ChangeEvent<HTMLInputElement>)}/><p>{form?.['glbmodel']}</p>
  </div>

  <div className="form-group model-detail">
    <label >Description</label>
    <input type="text" className="form-control" placeholder="Description" value={form?.['description']} onChange={(e) => handleChange('description', e as ChangeEvent<HTMLInputElement>)}/>
  </div>
  <div className="form-group model-detail">
    <label >Features</label>
    <input type="text" className="form-control" placeholder="Features" value={form?.['features']} onChange={(e) => handleChange('features', e as ChangeEvent<HTMLInputElement>)}/>
  </div>
  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit
  {
    loading ?
    <div className="spinner-border spinner-border-sm text-light" role="status">
    <span className="sr-only"></span>
</div>
     : null
}</button>
<button type="button" className="btn btn-danger" onClick={handleDelete} style={{marginLeft: '10px'}}>delete
{
    loadingDel ?
    <div className="spinner-border spinner-border-sm text-light" role="status">
    <span className="sr-only"></span>
</div>
     : null
}
</button>
</div>
  )
}

export default ModelDetail