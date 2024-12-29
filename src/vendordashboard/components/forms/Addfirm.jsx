import React,{useState} from 'react'
import { APIpath } from '../../helpers/Apipath';

function Addfirm({showProductsHandler}) {

      const [firmName,setFirmName] = useState('');
      const [area,setArea] = useState('');
      const [category,setCategory] = useState([]);
      const [region,setRegion] = useState([]);
      const [offer,setOffer] = useState('');
      const [firmImage,setFirmImage] = useState(null);


      const handleimageupload = (e)=>{
        const selecetdimage = e.target.files[0];
        setFirmImage(selecetdimage);
      }
      const handlecategorychnage = (e)=>{
            const value = e.target.value;
            if(category.includes(value)){
                setCategory(category.filter((item)=>item!==value)); 
            }
            else{
                setCategory([...category,value])
            }
      }
      const handleregionchange = (e)=>{
        const value = e.target.value;
        if(region.includes(value)){
            setRegion(region.filter((item)=>item!==value));
        }else{
            setRegion([...region,value])
        }
      }

      const handlesubmit = async (e)=>{
            e.preventDefault();
            try {
                
                const logintoken = localStorage.getItem('logintoken');
                if(!logintoken){
                    console.log('user not logged in');
                }

                const formData = new FormData();
                formData.append('firmname',firmName);
                formData.append('area',area);
                formData.append('offer',offer);
                
            
                formData.append('image',firmImage);
                category.forEach(element => {
                    formData.append('category',element);
                });
                region.forEach(element => {
                    formData.append('region',element);
                });
                alert(formData);
                const response = await fetch(`${APIpath}/firm/add-firm`,{
                    method:'POST',
                    headers:{
                        'token':`${logintoken}`
                    },
                    body:formData
                })
                
                const data = await response.json();
                if(response.ok){
                    console.log(data);
                    alert(data.message);
                    localStorage.setItem("firmid",data.firm_id);
                    showProductsHandler();
                    setFirmName('');
                    setArea('');
                    setCategory([]);
                    setRegion([]);
                    setOffer('');
                    setFirmImage(null);
                    alert('firm added successfully');
                }
                else if (data.message === "You can only add 1 firm"){
                     alert('frim exists can only add 1 firm');
                }
                else{
                    alert('failed to add firm');
                }
                    
            } catch (error) {
                console.log(error);
                    alert(error);
                }
            }

      
     
    
  return (
   <div className="firmSection">

       <form className='tableform' onSubmit={handlesubmit}>
          <h3>Add Firm</h3>
           <label >Firm Name</label>
           <input type='text' placeholder='Enter the Firm Name' name='firmName' value = {firmName}onChange={(e)=>setFirmName(e.target.value)}></input>
           <label >Area</label>
           <input type='text' placeholder='Enter the Area' name='area' value = {area}onChange={(e)=>setArea(e.target.value)}></input>
           {/* <label >category</label>
           <input type='text' placeholder='Enter the category'></input> */}
           <div className="check-inp">
           <label className='header'>category</label>
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                            <label>veg</label>
                            <input type='checkbox' value="veg" checked={category.includes('veg')} onChange={handlecategorychnage} ></input>
                        </div>
                    <div className="checkboxcontainer">
                        <label>Non-veg</label>
                        <input type='checkbox' value="non-veg" checked={category.includes('non-veg')} onChange={handlecategorychnage}></input>
                    </div>
                </div>
            </div>


        <div className="check-inp">
           <label className='header'>Regions</label>
                <div className="inputscontainer">
                    <div className="checkboxcontainer">
                            <label>south-indian</label>
                            <input type='checkbox' value="south-indian" checked={region.includes('south-indian')} onChange={handleregionchange}></input>
                        </div>
                    <div className="checkboxcontainer">
                        <label>north-indian</label>
                        <input type='checkbox' value="north-indian" checked={region.includes('north-indian')} onChange={handleregionchange}></input>
                    </div>

                    <div className="checkboxcontainer">
                        <label>bakery</label>
                        <input type='checkbox' value="bakery" checked={region.includes('bakery')} onChange={handleregionchange}></input>
                    </div>
                    <div className="checkboxcontainer">
                        <label>chinese</label>
                        <input type='checkbox' value="chinese" checked={region.includes('chinese')} onChange={handleregionchange}></input>
                    </div>
                </div>
            </div>


           {/* <label >region</label>
           <input type='text' placeholder='Enter the region'></input> */}
           <label >offer</label>
           <input type='text' placeholder='Enter the offer' name='offer' value = {offer}onChange={(e)=>setOffer(e.target.value)}></input>
           <label >Firm Image</label>
           <input type='file' onChange={handleimageupload} placeholder='image path' name='file'></input>
    
       <div className="btnSubmit">
            <button type='submit'>
                Submit
            </button>
        </div>
       </form>
   </div>
  )
}

export default Addfirm
