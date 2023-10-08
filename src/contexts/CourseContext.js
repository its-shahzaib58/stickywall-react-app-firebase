import { firestore } from 'config/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
const CourseContext = createContext();
const initialState = { courses: [] }


export default function CourseContextProvider({ children }) {


    const [courses, setCourses] = useState(initialState)
    const getCourse = async () => {
        const querySnapshot = await getDocs(collection(firestore, "courses"));
        querySnapshot.forEach((doc) => {
            const arr = [];
            arr.push(doc.data())
           setCourses(arr);
        });

    }
    useEffect(() => {
        getCourse()
    }, [])
    return (
        <CourseContext.Provider value={{ ...courses, setCourses }}>
            {children}
        </CourseContext.Provider>
    )
}

export const useCourseContext = () => useContext(CourseContext)
