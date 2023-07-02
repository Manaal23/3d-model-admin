import {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface ISignup {
    email?: string | undefined;
    password?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
}

function Signup(){
    const [form, setForm] = useState<ISignup>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token') ?? null;
      if (token){
        navigate('/', {replace: true})

      }
      // <Navigate to="/" replace={true}/>
    },[])

    const handleChange = (key: string, val:string) => {
      setErrorMsg('')
        setForm({
            ...form,
            [key]: val
        })        
    };

    const handleSubmit = async () => {

        setLoading(true);
        const res = await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/user/signup`,
            data: form
          });
          if (!res.data.success){
            setErrorMsg(res.data.message)
          }

          if (res.data.success)
          navigate('/', {replace: true})

        setLoading(false);
    }

return <>
<section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" className="form-control" onChange={(e) => handleChange('firstname', e.target.value)}/>
                      <label className="form-label" >First Name</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" onChange={(e) => handleChange('lastname', e.target.value)}/>
                      <label className="form-label" >Last Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" onChange={(e) => handleChange('email', e.target.value)}/>
                      <label className="form-label">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" onChange={(e) => handleChange('password', e.target.value)}/>
                      <label className="form-label" >Password</label>
                    </div>
                  </div>
                  {errorMsg ? <p style={{ color: 'red', textAlign:'center'}}>{errorMsg}</p> : null}

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control"/>
                      <label className="form-label">Repeat your password</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Register
                    {
                        loading ?

                    <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="sr-only"></span>
                    </div>
                         : null
                    }
                    </button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
}


export default Signup;