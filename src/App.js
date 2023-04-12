import './App.css';
import React,{useState} from 'react';

function App() {
  const [form,setForm]=useState([]);



  const prevIsValid=()=>{
    if(form.length===0){
      return true;
    }
    
    const someEmpty=form.some(
    (item)=>item.username===''|| item.platform===''  
    );

    if(someEmpty){
      // eslint-disable-next-line
      form.length>0 && form.map((item,index)=>{
       
        const allPrev=[...form];

        if(form[index].platform ===''){
          allPrev[index].errors.platform="platform is required";
        }

        if(form[index].username===''){
          allPrev[index].errors.username="username is required";
        }

        setForm(allPrev);
      


      })
    }


    return !someEmpty;
  }

  const handleButton=(e)=>{
    e.preventDefault();
    const inputState={
      platform:"",
      username:"",


      errors:{
        platform:null,
        username:null,
      }

    };

    if(prevIsValid()){
      setForm((prev)=>[...prev,inputState]);
    }

  }

  const onchange=(index,e)=>{
    e.preventDefault();
    e.persist();

    setForm((prev)=>{
      return prev.map((item,i)=>{
        if(i!==index){
          return item;
        }
        return {
          ...item,
          [e.target.name]:e.target.value,
          errors:{
            ...item.errors,
            [e.target.name]:
            e.target.value.length>0
            ? null 
            : [e.target.name]+ " is required ",
          },
        }
      })
    })
  }

  const handleRemove=(index,e)=>{
    e.preventDefault();
    setForm(prev=>prev.filter((item)=>item!==prev[index]))
  }

  return (
    <>
    <div className="container mt-5 py-5">
      <h1>Build Dynamic Form</h1>
        <h2>Add social link </h2>
        <p>Add links to sites you want to share with your viewers</p>
        {JSON.stringify(form)}
      <form>
        {
          form.map((item,index)=>
          <div className='row mt-3' key={`item-${index}`}>
            <div className='col'>
               <input
               className={item.errors.platform ?'form-control is-invalid':"form-control"}

               type='text' 
               name='platform' 
               placeholder='platform'
               
               value={item.platform} onChange={(e)=>onchange(index,e)}/>
            {item.errors.platform && <div className='invalid-feedback'>{item.errors.platform}</div>}

            </div>

            <div className='col'>
               <input 
               className={item.errors.username ?'form-control is-invalid':"form-control"}
               type='text' 
               name='username' 
               placeholder='username'
               
               value={item.username} onChange={(e)=>onchange(index,e)}/>
            {item.errors.username && <div className='invalid-feedback'>{item.errors.username}</div>}
               
            </div>

            <button className='btn btn-warning' onClick={(e)=>handleRemove(index,e)}>X</button>

          </div>)
        }
         <button className='btn btn-primary mt-2 ' onClick={handleButton}>Add a link</button>
      </form>

    </div>
    </>
  );
}

export default App;




