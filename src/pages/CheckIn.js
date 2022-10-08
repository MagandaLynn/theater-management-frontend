import { useCallback, useEffect, useState } from "react"
import members from "../data/members"
import schedule from "../data/schedule"

const CheckIn = () => {
    // const [requiredMembers, setRequiredMembers] = useState(JSON.parse(localStorage.getItem('requiredMembersList'))||[...members])
    const [requiredMembers, setRequiredMembers] = useState([])
    const [checkedInMembers, setCheckedInMembers] =useState(JSON.parse(localStorage.getItem('checkedInList'))
    ||[])
    const [schedule, setSchedule]=useState(JSON.parse(localStorage.getItem('schedule'))||[]);
    const todaysDate=new Date();
    

    // const fetchPlayers = useCallback(
    //     () => {
    //         if(requiredMembers===[]){
    //             setRequiredMembers()
    //         }
    //     },
    //     [],
    //   )
      const getRequiredMembers=()=>{
        
      }
        
      useEffect(() => {
        console.log(schedule)
        console.log(todaysDate);
        schedule.reduce((acc, cur)=>{
            console.log(cur);
     
        })
      }, [])
      
      const undoCheckIn =
      (memberToMove)=> {
        
            const confirmBox = window.confirm(`Do you want to undo check-in for ${memberToMove.name}`)
        if(confirmBox===true){
            setCheckedInMembers(checkedInMembers.filter(member=>member.id!==memberToMove.id))
            setRequiredMembers([...requiredMembers, memberToMove])
        }
            
      }
      const checkIn =
      (memberToMove)=> {
          setRequiredMembers(requiredMembers.filter(member=>member.id!==memberToMove.id))
          setCheckedInMembers([...checkedInMembers, memberToMove])
      }
  
    //   useEffect(() => {
    //       fetchPlayers();
    //   }, [fetchPlayers])

      useEffect(() => {
        if(requiredMembers){
            localStorage.setItem('requiredMembersList', JSON.stringify(requiredMembers))
            console.log(requiredMembers)       
        }
        if(checkedInMembers){
            localStorage.setItem('checkedInList', JSON.stringify(checkedInMembers))  
        }
        console.log("local storage")
      }, [requiredMembers, checkedInMembers])
    return (
    <div>
        <div className='check-in'>
            <div className = "required-members">
            <h3>Cast Member</h3>
                {
                    requiredMembers.map((member)=>(
                        <div key = {member.id} className='member-box' onClick={()=>checkIn(member)}>
                            <h5 className="name">{member.name}</h5>
                            <p className="roles">{member.roles}</p>
                        </div>
                    ))
                }
            </div>
            <div className = "checked-in-members">
                <h3>Checked In</h3>
                {
                    checkedInMembers.map((member)=>(
                        <div key = {member.id} className='member-box' onClick={()=>undoCheckIn(member)}>
                            <h5 className="name">{member.name}</h5>
                            <p className="roles">{member.roles}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CheckIn
