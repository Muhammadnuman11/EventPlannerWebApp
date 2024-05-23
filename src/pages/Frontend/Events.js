import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, where, query } from 'firebase/firestore';
import { firestore, storage } from '../../config/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export default function Events() {

  const navigate = useNavigate()
  const { users } = useContext(AuthContext);
  const user = users.user;

  const [myDocuments, setMyDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [joined, setJoined] = useState([]);
  const [event, setEvent] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(true);

  const handleChange = e => {
    setEvent(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const fetchMyDocuments = async () => {
    if (!user) {
      return
    }
    let array = []
    const q = query(collection(firestore, "events"),
      where("createdBy.uid", "==", user.uid)
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setMyDocuments(array)
    setIsLoading(false)
  }

  const fetchAllDocuments = async () => {
    if (!user) {
      return
    }
    let array = []
    const q = query(collection(firestore, "events"),
      // where("createdBy.uid", "!=", user.uid)
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setAllDocuments(array)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMyDocuments()
  })
  useEffect(() => {
    fetchAllDocuments()
  })

  const handleUpdate = async () => {
    let formData = { ...event };
    formData.dateModified = serverTimestamp();
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "events", formData.id), formData, { merge: true });
      window.notify("Event has been successfully Updated", "success")
      let newDocuments = myDocuments.map((doc) => {
        if (doc.id === event.id)
          return event
        return doc
      })
      setMyDocuments(newDocuments)
    } catch (err) {
      console.error(err)
      window.notify("Something went wrong, Event isn't updated", "error")
    }
    setIsProcessing(false)
  }

  const handleDelete = async (event) => {
    try {
      await deleteDoc(doc(firestore, "events", event.id));
      window.notify("Event has been successfully deleted", "success")
      let newDocuments = myDocuments.filter((doc) => {
        return doc.id !== event.id
      })
      setMyDocuments(newDocuments);
    } catch (err) {
      console.error(err)
      window.notify("Something went wrong", "error")
    }
    const desertRef = ref(storage, event.picName);
    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((err) => {
      console.error(err)
    });
  }

  const handleJoin = async (event) => {
    if (!user) {
      return navigate("/auth/login")
    }
    let userEventId = user.uid + event.id;
    try {
      await setDoc(doc(firestore, "joinUser", userEventId), {
        userEmail: user.email,
        userId: user.uid,
        eventId: event.id,
      });
      window.notify("Event has been successfully join", "success")
    }
    catch (err) {
      console.error(err)
      window.notify("Something went wrong", "error")
    }
  }

  const handleJoinedPerson = async (event) => {
    let array = []
    try {
      const q = query(collection(firestore, "joinUser"),
        where("eventId", "==", event.id)
      )
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        array.push(data)
      });
      setJoined(array)
      setIsJoining(false)
    }
    catch (err) {
      console.error(err)
    }

  }

  return (
    <>

      <div className="events">
        <div className='container'>
          <div className="row py-3">
            {
              user ?
                <div className="col mb-1 w-100">

                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item bg-transparent border-0">
                      <h1 className="accordion-header text-center" id="headingOne">
                        <button className="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          My Events
                        </button>
                      </h1>
                      <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">

                          <div className="row d-flex justify-content-between">
                            {!isLoading
                              ?
                              myDocuments.map((event, i) => {
                                return <div className="col-12 col-lg-4 col-md-6 rounded d-flex flex-column align-items-center" key={i}>
                                  <div className="card mb-3 d-flex align-items-center border-0" style={{ width: "300px" }}>
                                    <div className='cardImg'>
                                      <img src={event.img} className="card-img-top w-100 h-100" alt="event" />
                                    </div>
                                    <div className="card-body w-100">
                                      <h5 className="card-title">{event.title}</h5>
                                      <p className="card-text m-0"><b className='text-info'>Time:</b> {event.date}, {event.time}</p>
                                      <p className="card-text m-0"><b className='text-info'>Location:</b> {event.location}</p>
                                      <p className="card-text"><b className='text-info'>Description:</b>{event.description}</p>
                                      <button className='btn btn-info mx-2 text-white' data-bs-toggle="modal" data-bs-target="#editEventModal" onClick={() => { setEvent(event) }}>Edit</button>
                                      <button className='btn btn-info mx-2 text-white' onClick={() => { handleDelete(event) }}>Delete</button>
                                      <button className='btn btn-info mx-2 text-white' data-bs-toggle="modal" data-bs-target="#JoinedModal" onClick={() => { handleJoinedPerson(event) }}>Joined</button>
                                    </div>
                                  </div>
                                </div>
                              })
                              : <div className='text-center'><div className='spinner-grow'></div></div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                :
                ""
            }
          </div>
          {/* </div>
      </div>

      <div className="py-1 events">
        <div className='container'> */}
          <div className="row py-3">
            <div className="col mb-1">

              <div className="accordion" id="accordionExample">
                <div className="accordion-item  bg-transparent border-0">
                  <h1 className="accordion-header text-center" id="headingTwo">
                    <button className="accordion-button shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      All Events
                    </button>
                  </h1>
                  <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">

                      <div className="row d-flex justify-content-between">
                        {!isLoading
                          ?
                          allDocuments.map((event, i) => {
                            return <div className="col-12 col-lg-4 col-md-6 rounded d-flex flex-column align-items-center" key={i}>
                              <div className="card mb-3 d-flex align-items-center border-0" style={{ width: "300px" }}>
                                <div className='cardImg'>
                                  <img src={event.img} className="card-img-top w-100 h-100" alt="event" />
                                </div>
                                <div className="card-body w-100">
                                  <h5 className="card-title">{event.title}</h5>
                                  <p className="card-text m-0"><b className='text-info'>Time:</b> {event.date}, {event.time}</p>
                                  <p className="card-text m-0"><b className='text-info'>Location:</b> {event.location}</p>
                                  <p className="card-text"><b className='text-info'>Description:</b> {event.description}</p>
                                  <button className='btn btn-info text-white' onClick={() => { handleJoin(event) }}>Join Event</button>
                                </div>
                              </div>
                            </div>
                          })
                          : <div className='text-center'><div className='spinner-grow'></div></div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Event Modal */}
      <div className="modal fade" id="editEventModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <input type="text" name='title' className='form-control shadow-none' placeholder='Enter Title' value={event.title} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="date" name='date' className='form-control  shadow-none' placeholder='Enter Date' value={event.date} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="time" name='time' className='form-control shadow-none' placeholder='Enter Time' value={event.time} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="text" name='location' className='form-control shadow-none' placeholder='Enter Location' value={event.location} onChange={handleChange} />
                </div>
                {/* <div className="row w-100 m-0 p-0">
                  <div className="col mb-3">
                    <input type="file" accept='image/*' name='title' className='form-control shadow-none' placeholder='Add Image' onChange={handleImgChange} />
                    {
                      isImgLoading ? <div className="progress my-1" role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
                      </div> : ""
                    }
                  </div>
                </div> */}
              </div>
              <div className="row mb-4">
                <div className="col">
                  <textarea name='description' className='form-control shadow-none' rows="5" placeholder='Enter Description' value={event.description} onChange={handleChange} ></textarea>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col text-end">
                  <button className='btn btn-info text-white mx-2' data-bs-dismiss="modal" onClick={handleUpdate} disabled={isProcessing}>
                    {
                      !isProcessing
                        ? "Update Event"
                        : <div className="spinner-border spinner-border-sm"></div>
                    }
                  </button>
                  <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Joined person Modal */}
      <div className="modal fade" id="JoinedModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Joined Person</h1>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                !isJoining
                  ?
                  joined.map((joinedPerson, i) => {
                    return <div className='border border-info rounded my-1' key={i}>
                      <p className='m-0 p-0 text-center'> <b>Person-{i + 1}</b></p>
                      <p className='text-info m-0 p-0 '> <b>Email:</b> {joinedPerson.userEmail}</p>
                      <p className='text-info m-0 p-0 '> <b>Uid:</b> {joinedPerson.userId}</p>
                    </div>
                  })
                  :
                  <div className='text-center'><div className='spinner-border text-info'></div></div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



