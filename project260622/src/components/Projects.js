import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";


export default function Projects() {
    const [isLoading, setLoading] = useState(true);
    const [dataInfo, setDataInfo] = useState([]);
    const [formState, setFormState] = useState([]);
    const tags = [];
    const [renderDataInfo, setRenderDataInfo] = useState([]);

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
        let storeArray = []
        for(let t of dataInfo){

            // iterating the tags
            for(let tItem of t.tags){
                if (formState.includes(tItem) === true){
                    tags.push(tItem)
                }
            }
        }
        setRenderDataInfo(storeArray)
      }
    filterTag()
    console.log(renderDataInfo)
  }, [formState]);

  function toTags(){
    for(let t of dataInfo){
        for(let tItem of t.tags){
            if (tags.includes(tItem) === false){
                tags.push(tItem)
            }
        }
    }
  }

  if(isLoading){
    console.log("isloading")
    // this is a good place to do the SVG animation for the running wheel
  }
  else{
    toTags()
  }

  return (
    <React.Fragment>
        <div className="container">
            <div>Filter</div>
            <Multiselect
            defaultValue={[]}
            data={tags}
            onChange={formState => setFormState(formState)}
            value={formState}
            />
        </div>
        <div>{console.log(formState)}</div>
        <div className="row g-2 p-2">
            {renderDataInfo && renderDataInfo.map((p) => (
                  <div className="col-md-4"> 
                     <div className="card p-0 mb-2 mx-auto mx-md-0 nostyle">
                        <div
                            className="image"
                            style={{ backgroundImage: `url(${p.img})` }}
                        ></div>
                        <div className="card-body">
                            <p className="card-title nostyle" style={{height:"45px"}}>
                            {p.title}
                            </p>
                            <p className="card-text">{p.description}</p>
                            <hr/>
                            {p.tags && p.tags.map((tag) => (
                                <span className="badge rounded-pill bg-secondary">{tag}</span>
                            ))}
                        </div>
                        
                     </div>
                  </div>
                ))}
            </div>
    </React.Fragment>
  );
}
