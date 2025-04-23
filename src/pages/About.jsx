
import { useState, useEffect, useRef, Fragment } from 'react'
import { BranchList } from '../cmps/BranchList.jsx'

export function About(props) {

    const [branches, setBranches] = useState([
        {
            name: "Branch Tel Aviv",
            phone: "03-555-1234",
            hours: "Sun-Thu: 09:00-20:00, Fri: 09:00-14:00",
            address: "Dizengoff Center, Tel Aviv"
        },
        {
            name: "Branch Jerusalem",
            phone: "02-678-4567",
            hours: "Sun-Thu: 10:00-19:00, Fri: 09:00-13:00",
            address: "Malha Mall, Jerusalem"
        },
        {
            name: "Branch Haifa",
            phone: "04-837-1122",
            hours: "Sun-Thu: 09:30-20:30, Fri: 09:00-14:00",
            address: "Grand Canyon Mall, Haifa"
        },
        {
            name: "Branch Be'er Sheva",
            phone: "08-623-7890",
            hours: "Sun-Thu: 10:00-20:00, Fri: 09:00-13:30",
            address: "BIG Beer Sheva, Be'er Sheva"
        },
        {
            name: "Branch Netanya",
            phone: "09-835-6655",
            hours: "Sun-Thu: 09:00-20:00, Fri: 08:30-13:00",
            address: "Ir Yamim Mall, Netanya"
        }
    ])





    return (<section>
        <h2>About</h2>
        <BranchList branches={branches} />
    </section>)
}