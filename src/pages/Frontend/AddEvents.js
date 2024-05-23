import React, { useContext, useState } from 'react'
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';
import { firestore, storage } from '../../config/firebase';
import { AuthContext } from '../Context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';

const initialState = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: ""
}

export default function AddEvents() {
  const { users } = useContext(AuthContext);
  const user = users.user;

  const [state, setState] = useState(initialState);
  const [imgURL, setImgURL] = useState("");
  const [imgName, setImgName] = useState("");
  const [isProcessing, setisProcessing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleImgChange = async(e) => {
    let file = e.target.files[0];
    setisLoading(true)
    const fileExt = file.name.split('.').pop();
    let randomId = window.getRandomId();
    // console.log(randomId + "." + fileExt)
    // console.log(userAuth.uid + "." + fileExt)
    let imgName = `eventImages/${randomId}.${fileExt}`
    console.log(imgName)
    setImgName(imgName)
    const imageRef = ref(storage, imgName)
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress)
      },
      (err) => {
        console.error(err)
        setisLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let eventImg = downloadURL;
          setImgURL(eventImg)
          setisLoading(false)
        });
      },
      (err) => {
        console.error(err)
      }
    );
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    // let getdate = new Date();
    let { title, date, time, location, description } = state
    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) {
      return window.notify("Title length should be at least 3 characters", "error")
    }
    if (date.length < 3) {
      return window.notify("Please enter correct date", "error")
    }
    if (time.length < 3) {
      return window.notify("Please enter correct time", "error")
    }
    if (location.length < 3) {
      return window.notify("Please enter location", "error")
    }
    if (description.length < 10) {
      return window.notify("Please enter description", "error")
    }
    if (!imgURL) {
      return window.notify("Please select image", "error")
    }

    let formData = { title, date, time, location, description };

    formData.dateCreated = serverTimestamp();
    formData.id = window.getRandomId();
    formData.img = imgURL;
    formData.picName = imgName;
    formData.createdBy = {
      email: user.email,
      uid: user.uid,
    }

    createDocument(formData);
  }

  const createDocument = async (formData) => {
    setisProcessing(true)
    try {
      await setDoc(doc(firestore, "events", formData.id), formData);
      window.notify("Event has been successfully added", "success")
    } catch (error) {
      console.error(error);
      window.notify("Something went wrong, Events isn't added", "error")
    }
    setisProcessing(false)
    setState(initialState)
  }

  return (
    <div className="py-5 addevents">
      <div className='container'>
        <div className="row">
          <div className="col">
            <div className="card p-2 p-md-3 p-lg-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col mb-3">
                    <h1 className='text-center'>Add Event</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" name='title' className='form-control shadow-none' placeholder='Enter Title' value={state.title} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="date" name='date' className='form-control  shadow-none' placeholder='Enter Date' value={state.date} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="time" name='time' className='form-control shadow-none' placeholder='Enter Time' value={state.time} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" name='location' className='form-control shadow-none' placeholder='Enter Location' value={state.location} onChange={handleChange} />
                  </div>
                  <div className="row w-100 m-0 p-0">
                    <div className="col mb-3">
                      <input type="file" accept='image/*' name='title' className='form-control shadow-none' placeholder='Add Image'  onChange={handleImgChange} />
                      {
                        isLoading ? <div className="progress my-1" role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                          <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
                        </div> : ""
                      }
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <textarea name='description' className='form-control shadow-none' rows="5" placeholder='Enter Description' value={state.description} onChange={handleChange} ></textarea>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col text-center">
                    <button className='btn btn-info w-50 text-white' disabled={isProcessing}>
                      {
                        !isProcessing
                          ? "Add Event"
                          : <div className="spinner-border spinner-border-sm"></div>
                      }
                    </button>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col text-center">
                    <button className='btn btn-info w-25 text-white mx-1'>
                      <Link to="/" className='nav-link'>Home</Link>
                    </button>
                    <button className='btn btn-info w-25 text-white mx-1'>
                      <Link to="/events" className='nav-link'>See Events</Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
