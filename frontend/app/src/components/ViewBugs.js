import React from 'react';
import {useState} from 'react';
import './ViewBugs.css'
import Bugs from '../jsonFiles/bugs.json'
import { Button,ButtonEdit,ButtonAdd } from './Button';
 


function ViewBugs() {
  

  const [selectedBug,changeBug]=useState({
      id:0,
      title:"Select a bug",
      state:"",
      severity:"",
      description:"This way you will see information about it, such as state,severity,solver and project",
      solver:"",
      project:"",
      reporter:""
  })

  const handleClick = (id,title,state,severity,description,solver,project,reporter) => {
      if(selectedBug.id==id)
      {
        selectedBug=null;
      }
      else changeBug({
        id,
        title,
        state,
        severity,
        description,
        solver,
        project,
        reporter})
      
      console.log(selectedBug);
   };

   function assignToMe(id){
    console.log(id)
   }

  return(
    <div className='viewBugsContainer'>
      <div className='bugContainer-left'>
          {
            Bugs.map(bug =>{
              return(
                
                <div className='onebug' key={bug.id} onClick={()=>handleClick(bug.id,bug.title,bug.state,bug.severity,bug.description,bug.solver,bug.project,bug.reporter)}>
                <div className='leftsidebug'>
                  <h2 className='title'>Title : {bug.title}</h2>
                </div>
                <div className='rightsidebug'>
                  <h3 className='severity'>Severity: {bug.severity}</h3>
                  <h3 className='state'>State: {bug.state}</h3>
                </div>
                </div>             
              )
            })
           
          }
          </div>
          <div className='bugContr'>

          { (
            <div className='bugContainer-right' key={selectedBug.id} >
              <div className='up'>
                <div className='left'><h3 className='state'>State: {selectedBug.state}</h3></div>
                <div className='right'><h3 className='severity'>Severity: {selectedBug.severity}</h3></div>
               
              </div>
              <div className='middle'><h2 className='title'>Title : {selectedBug.title}</h2></div>
              <div className='container-bug'>
              <div className='box'>
                <h2>Description:</h2>
                <p className='description'>{selectedBug.description}</p> 
              </div>
              <div className='box'>
                <h2>Solver:</h2>
                <h3 className='solver'>{selectedBug.solver}</h3>
              </div>
              <div className='box'>
                <h2>Reporter:</h2>
                <h3 className='reporter'>{selectedBug.reporter}</h3>
              </div>
              <div className='box'>
                <h2>Project:</h2>
                <h3 className='project'>{selectedBug.project}</h3>
              </div>
              <div className='boxb'>
                <Button  onClick={assignToMe(selectedBug.id)}>Assign to me</Button>
              </div>
              <div className='boxb'>
                <ButtonEdit  onClick={assignToMe(selectedBug.id)}>Edit bug</ButtonEdit>
              </div>
              </div>

              
           </div>)}

          <div className='buttonBox'>
                <ButtonAdd className="button">Add Bug</ButtonAdd>
          </div>

          </div>
    </div>
  )
    
}

export default ViewBugs;