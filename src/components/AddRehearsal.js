import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import members from '../data/members';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";
import { Button, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';


const AddRehearsal = () => {
    const [modalOpen, setModalOpen]=useState(false);
    const [date, setDate]=useState(new Date())
    const [characterList, setCharacterList]=useState([]);

    const [schedule, setSchedule] = useState(JSON.parse(localStorage.getItem('schedule'))||[])
    
    useEffect(() => {
      setCharacterList(members.reduce((acc, cur)=>{
        cur.roles.forEach((role)=>{
            if(!acc.includes(role)){
                acc.push(role);
            }
        })
        return acc;
      },[]))
    }, [])

    const handleSubmit = (values) =>{
        console.log(values.date)
        setSchedule([...schedule, {
          date: date, 
          startTime: values.startTime, 
          endTime: values.endTime, 
          description: values.description,
          location: values.location,
          checked: values.checked, }])
        //create an 'event' 
        setModalOpen(false);
    }
    
  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    console.log(schedule)
}, [schedule])
  return (
    <div>
      <Button onClick={()=>setModalOpen(true)}>Add Rehearsal</Button>
      <Modal isOpen={modalOpen} className='form'>
        <ModalHeader>
          Add Rehearsal
        </ModalHeader>
        <ModalBody>

            <Formik
            initialValues={{
            date: date,
            startTime: '18:00',
            endTime: '18:00',
            description: '',
            location: '',
            checked: [],
          }}
          
          onSubmit={handleSubmit}
        >
          <Form >
            <FormGroup>
              <h5>Rehearsal Date</h5>
              <DatePicker
                selected={date}
                onChange={(date)=>{setDate(date)}}
              />
              <Label>Start Time: {' '}
                <Field as="select" name="startTime">
                  <option value="18:00">6:00</option>
                  <option value="18:30">6:30</option>
                  <option value="19:00">7:00</option>
                  <option value="19:30">7:30</option>
                  <option value="20:00">8:00</option>
                  <option value="20:30">8:30</option>
                  <option value="21:00">9:00</option>
                  <option value="21:30">9:30</option>
                  <option value="22:00">10:00</option>
                  <option value="22:30">10:30</option>
                  <option value="23:00">11:00</option>
                </Field> 
              </Label>
              <br />
              <Label>End Time: {' '}
                <Field as="select" name="endTime">
                  <option value="18:00">6:00</option>
                  <option value="18:30">6:30</option>
                  <option value="19:30">7:30</option>
                  <option value="19:00">7:00</option>
                  <option value="20:00">8:00</option>
                  <option value="20:30">8:30</option>
                  <option value="21:00">9:00</option>
                  <option value="21:30">9:30</option>
                  <option value="22:00">10:00</option>
                  <option value="22:30">10:30</option>
                  <option value="23:00">11:00</option>
                </Field> 
              </Label>
            </FormGroup>
            
              <FormGroup>
                <Label for='description'>
                  <h5>Description</h5>
                  <Field placeholder='Schedule Description' id='description' name='description' className='form-control'/>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for='location'>
                  <h5>Location</h5>
                  <Field placeholder='Location' name='location' id='location' className='form-control'/>
                </Label>
              </FormGroup>
              <FormGroup aria-labelledby="checkbox-group" className='checkbox-group'>
                <h5>Required Cast:</h5>
                {characterList.map((character, index)=>(
                    <Label key={index} className='checkbox'>
                        <Field type="checkbox" name="checked" value={character} />
                        {' '}{character}
                    </Label>
              ))}
            </FormGroup>
            <Button type='cancel' onClick={()=>setModalOpen(false)}>Cancel</Button>{' '}
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Formik>
        </ModalBody>
          
          
      </Modal>
    </div>
  )
}

export default AddRehearsal
/*
  To update:
  -fix times
  -allow user to select people by role or name (if by name store as memberID)
  -allow user to add notes for rehearsal (as an array) : maybe in another form AFTER schedule is made
*/ 