import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
// import LoadingSpinner from "./LoadingSpinner";
import "../spinner.css";

export default function Projects() {
    const [isLoading, setLoading] = useState(true);
    const [dataInfo, setDataInfo] = useState([]);
    const [valueState, setValueState] = useState([]);
    const tags = [];
    const [renderDataInfo, setRenderDataInfo] = useState([]);
    const [formState, setFormState] = useState({
      search: "",
    });
    const [buttonState, setButtonState] = useState(true);

    const updateFormField = (e) => {
      setFormState({
          ...formState,
          [e.target.name]: e.target.value,
      })
      if(  (e.target.value).length <= 3){
        setRenderDataInfo(dataInfo)
      }
    };


  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        "https://wavescan-frontend-assessment.saurabhmudgal.repl.co/"
      );
      setDataInfo(response.data)
      setRenderDataInfo(response.data)
    };
    fetchPost();
    setLoading(false)
  }, []);


  useEffect(() => {
    setRenderDataInfo([])
    const filterTag = () => {
        if(valueState.length !== 0){
          setFormState({search:""})
            const filterByTag = ( list, filters ) => {
              return list.filter( item => filters.every( filter => item.tags.includes(filter) ))
            }
            setRenderDataInfo(filterByTag(dataInfo, valueState ))
        }
        else{
          setRenderDataInfo(dataInfo)
        }
    }
    filterTag()
  }, [valueState])

  useEffect(() => {
    setValueState([])
    setFormState({ search: ""})
  }, [buttonState])

  function toTags(){
    for(let t of dataInfo){
        for(let tItem of t.tags){
            if (tags.includes(tItem) === false){
                tags.push(tItem)
            }
        }
    }
  }

  function clickFn(){
    // upon click of the search button, use setValueState to reset all searches
    setRenderDataInfo(dataInfo)
    let arrStore = []
    if ((formState.search).length >= 3){
      for(let t of dataInfo){
        if (((t.title).toLowerCase()).includes((formState.search).toLowerCase()) === true || ((t.description).toLowerCase()).includes((formState.search).toLowerCase()) === true){
          arrStore.push(t)
        }
      }
      setRenderDataInfo(arrStore)
      console.log(renderDataInfo)
    }
  }
  function clickSearch(){
    setButtonState(true)
  }
  function clickFilter(){
    setButtonState(false)
  }

  if(!isLoading){
    toTags()
  }

  return (
    <React.Fragment>
        {isLoading ?    
        <div className="spinner-container">
          <div className="loading-spinner">
        </div>
        </div>  : <div>{null}</div>}

        <div className="container p-4">
        <div className="btn-group nav-pills ">
          <div className="btn nav-link " onClick={clickSearch} >Search</div>
          <div className="btn nav-link" onClick={clickFilter}>Dropdown Filter</div>
        </div>
        {buttonState===true ?
        <div>
              <div className="input-group">
                <input type="search" className="form-control rounded" placeholder="Search Type Here" aria-label="Search" aria-describedby="search-addon" value={formState.search} name="search" onChange={updateFormField}/>
                <button type="button" className="btn searchbtn" onClick={clickFn}>search</button>
              </div>
          </div> : <div>{null}</div>}

          {buttonState===false ?
          <div>
            <Multiselect
            defaultValue={[]}
            data={tags}
            onChange={formState => setValueState(formState)}
            value={valueState}
            placeholder={"Multiselect Filter Click Here"}
            />
          </div> : <div>{null}</div>}

        </div>
        <div className="container">
          <div className="row g-2 p-2">
              {renderDataInfo && renderDataInfo.map((p) => (
                    <div className=" col-md-6 col-lg-4"> 
                      <div className="card p-0 mb-2 mx-auto mx-md-0 nostyle">
                          <div
                              className="image"
                              style={{ backgroundImage: `url(${p.img})` }}
                          ></div>
                          <div className="card-body">
                              <p className="card-title nostyle" style={{height:"45px"}}>
                              {p.title}
                              </p>
                              <p className="card-text" style={{height:"45px"}}>{p.description}</p>
                              <hr/>
                              <p style={{height:"65px"}}>
                              {p.tags && p.tags.map((tag) => (
                                  <span className="badge rounded-pill bg-secondary">{tag}</span>
                              ))}
                              </p>

                          </div>
                          
                      </div>
                    </div>
                  ))}
            </div>
        </div>
     
    </React.Fragment>
  );
}
